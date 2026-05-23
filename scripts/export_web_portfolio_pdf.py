from __future__ import annotations

import math
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "outputs" / "web_export"
PDF_PATH = ROOT / "outputs" / "Gred_Portfolio_李军_网页一致版.pdf"
BASE_URL = "http://127.0.0.1:5175"

# 使用与用户预览接近的 16:9 桌面视口，保证导出视觉与网页截图一致。
VIEWPORT = {"width": 2048, "height": 1152}
ROUTES = [
    ("home", "/"),
    ("reits", "/reits"),
    ("cityvibe", "/cityvibe"),
    ("about", "/about"),
]


def wait_for_assets(page) -> None:
    page.wait_for_load_state("networkidle")
    page.evaluate(
        """async () => {
            await document.fonts.ready;
            const images = Array.from(document.images);
            await Promise.all(images.map((img) => {
                if (img.complete) return Promise.resolve();
                return new Promise((resolve) => {
                    img.addEventListener('load', resolve, { once: true });
                    img.addEventListener('error', resolve, { once: true });
                });
            }));
        }"""
    )


def capture_route(page, name: str, route: str) -> list[Path]:
    page.goto(f"{BASE_URL}{route}", wait_until="networkidle")
    wait_for_assets(page)

    # 用固定视口逐屏捕获，避免 full_page 截图改变 sticky/fixed 元素的呈现。
    height = page.evaluate("Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)")
    viewport_h = VIEWPORT["height"]
    steps = max(1, math.ceil(height / viewport_h))
    paths: list[Path] = []

    for index in range(steps):
        y = min(index * viewport_h, max(0, height - viewport_h))
        page.evaluate("(scrollY) => window.scrollTo(0, scrollY)", y)
        page.wait_for_timeout(250)
        path = OUT_DIR / f"{name}_{index + 1:02d}.png"
        page.screenshot(path=str(path), full_page=False)
        paths.append(path)

    return paths


def images_to_pdf(images: list[Path]) -> None:
    pil_images = [Image.open(path).convert("RGB") for path in images]
    first, rest = pil_images[0], pil_images[1:]
    first.save(PDF_PATH, save_all=True, append_images=rest, resolution=144)
    for image in pil_images:
        image.close()


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for old in OUT_DIR.glob("*.png"):
        old.unlink()

    all_images: list[Path] = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport=VIEWPORT, device_scale_factor=1)
        page = context.new_page()
        for name, route in ROUTES:
            all_images.extend(capture_route(page, name, route))
        browser.close()

    images_to_pdf(all_images)
    print(PDF_PATH)
    print(f"pages={len(all_images)}")


if __name__ == "__main__":
    main()

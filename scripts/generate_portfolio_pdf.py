from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

import fitz
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
OUT_DIR = ROOT / "outputs"
OUT_PDF = OUT_DIR / "Gred_Portfolio_专业作品集.pdf"

PAGE_W = 595.28
PAGE_H = 841.89
MARGIN_X = 48
HEADER_Y = 26
FOOTER_Y = 808

FONT_REG = r"C:\Windows\Fonts\Noto Sans SC (TrueType).otf"
FONT_BOLD = r"C:\Windows\Fonts\Noto Sans SC Bold (TrueType).otf"

COLORS = {
    "ink": (0.03, 0.05, 0.11),
    "muted": (0.36, 0.43, 0.55),
    "line": (0.86, 0.89, 0.94),
    "light": (0.96, 0.97, 0.99),
    "blue": (0.24, 0.32, 0.95),
    "blue_soft": (0.90, 0.93, 1.00),
    "orange": (0.91, 0.34, 0.08),
    "orange_soft": (1.00, 0.94, 0.85),
    "dark": (0.02, 0.03, 0.09),
    "white": (1, 1, 1),
}


@dataclass
class DocState:
    doc: fitz.Document
    page_no: int = 0


def font_len(text: str, size: float, bold: bool = False) -> float:
    font = fitz.Font(fontfile=FONT_BOLD if bold else FONT_REG)
    return font.text_length(text, fontsize=size)


def wrap_text(text: str, width: float, size: float, bold: bool = False) -> list[str]:
    lines: list[str] = []
    for raw in text.split("\n"):
        if not raw:
            lines.append("")
            continue
        current = ""
        for ch in raw:
            trial = current + ch
            if font_len(trial, size, bold) <= width:
                current = trial
            else:
                if current:
                    lines.append(current)
                current = ch
        if current:
            lines.append(current)
    return lines


def add_page(state: DocState, title: str = "") -> fitz.Page:
    page = state.doc.new_page(width=PAGE_W, height=PAGE_H)
    state.page_no += 1
    page.insert_font(fontname="Noto", fontfile=FONT_REG)
    page.insert_font(fontname="NotoBold", fontfile=FONT_BOLD)
    if title:
        page.insert_text((MARGIN_X, HEADER_Y), title, fontsize=8, fontname="Noto", color=COLORS["muted"])
    page.insert_text(
        (PAGE_W - MARGIN_X - 58, FOOTER_Y),
        f"{state.page_no:02d}",
        fontsize=8,
        fontname="Noto",
        color=COLORS["muted"],
    )
    page.draw_line((MARGIN_X, 38), (PAGE_W - MARGIN_X, 38), color=COLORS["line"], width=0.5)
    return page


def text(page: fitz.Page, x: float, y: float, value: str, size: float = 10, bold: bool = False, color="ink") -> None:
    page.insert_text((x, y), value, fontsize=size, fontname="NotoBold" if bold else "Noto", color=COLORS[color])


def paragraph(
    page: fitz.Page,
    x: float,
    y: float,
    width: float,
    value: str,
    size: float = 10,
    line_height: float = 16,
    color: str = "muted",
    bold: bool = False,
) -> float:
    for line in wrap_text(value, width, size, bold):
        page.insert_text((x, y), line, fontsize=size, fontname="NotoBold" if bold else "Noto", color=COLORS[color])
        y += line_height
    return y


def title_block(page: fitz.Page, label: str, title: str, subtitle: str, accent: str = "blue") -> float:
    text(page, MARGIN_X, 78, label, 9, True, accent)
    page.draw_line((MARGIN_X + font_len(label, 9, True) + 14, 73), (PAGE_W - MARGIN_X, 73), color=COLORS[accent], width=0.5)
    y = 125
    for line in wrap_text(title, PAGE_W - MARGIN_X * 2, 28, True):
        page.insert_text((MARGIN_X, y), line, fontsize=28, fontname="NotoBold", color=COLORS["ink"])
        y += 38
    y = paragraph(page, MARGIN_X, y + 10, PAGE_W - MARGIN_X * 2, subtitle, 11, 19, "muted")
    return y + 22


def card(page: fitz.Page, rect: fitz.Rect, fill: str = "white", stroke: str = "line") -> None:
    page.draw_rect(rect, color=COLORS[stroke], fill=COLORS[fill], width=0.6)


def pill(page: fitz.Page, x: float, y: float, label: str, accent: str = "blue") -> None:
    w = font_len(label, 8, True) + 18
    rect = fitz.Rect(x, y - 12, x + w, y + 6)
    page.draw_rect(rect, color=COLORS[accent], fill=COLORS[f"{accent}_soft"], width=0.4)
    text(page, x + 9, y, label, 8, True, accent)


def bullet_list(page: fitz.Page, x: float, y: float, width: float, items: Iterable[str], accent: str = "blue") -> float:
    for item in items:
        page.draw_circle((x + 3, y - 3), 2.2, fill=COLORS[accent], color=COLORS[accent])
        y = paragraph(page, x + 13, y, width - 13, item, 9.5, 15.5, "muted")
        y += 4
    return y


def image_box(page: fitz.Page, img_path: Path, rect: fitz.Rect, caption: str = "", fit: str = "contain") -> float:
    card(page, rect, "white", "line")
    pad = 10
    image_rect = fitz.Rect(rect.x0 + pad, rect.y0 + pad, rect.x1 - pad, rect.y1 - pad - (18 if caption else 0))
    with Image.open(img_path) as im:
        iw, ih = im.size
    target_w, target_h = image_rect.width, image_rect.height
    scale = min(target_w / iw, target_h / ih) if fit == "contain" else max(target_w / iw, target_h / ih)
    w, h = iw * scale, ih * scale
    r = fitz.Rect(
        image_rect.x0 + (target_w - w) / 2,
        image_rect.y0 + (target_h - h) / 2,
        image_rect.x0 + (target_w + w) / 2,
        image_rect.y0 + (target_h + h) / 2,
    )
    page.insert_image(r, filename=str(img_path), keep_proportion=True)
    if caption:
        page.insert_text(
            (rect.x0 + pad, rect.y1 - 12),
            caption,
            fontsize=7.5,
            fontname="NotoBold",
            color=COLORS["muted"],
        )
    return rect.y1


def metric_grid(page: fitz.Page, x: float, y: float, metrics: list[tuple[str, str, str]], accent: str) -> float:
    gap = 9
    w = (PAGE_W - x - MARGIN_X - gap * (len(metrics) - 1)) / len(metrics)
    for i, (value, label, desc) in enumerate(metrics):
        r = fitz.Rect(x + i * (w + gap), y, x + i * (w + gap) + w, y + 72)
        card(page, r, "white", "line")
        text(page, r.x0 + 12, r.y0 + 24, value, 18, True, accent)
        text(page, r.x0 + 12, r.y0 + 43, label, 9.5, True, "ink")
        paragraph(page, r.x0 + 12, r.y0 + 58, r.width - 24, desc, 7.5, 11, "muted")
    return y + 82


def cover(state: DocState) -> None:
    page = add_page(state)
    page.draw_rect(fitz.Rect(0, 0, PAGE_W, PAGE_H), fill=COLORS["light"], color=COLORS["light"])
    text(page, MARGIN_X, 68, "Gred Portfolio", 15, True, "blue")
    text(page, PAGE_W - MARGIN_X - 115, 68, "Product Case Study", 9, True, "muted")
    page.draw_line((MARGIN_X, 84), (PAGE_W - MARGIN_X, 84), color=COLORS["line"], width=0.8)
    y = 178
    for line in ["数据分析 × AI 产品 × 城市空间应用", "专业作品集"]:
        text(page, MARGIN_X, y, line, 30 if line.endswith("作品集") else 24, True, "ink")
        y += 42
    y = paragraph(
        page,
        MARGIN_X,
        y + 18,
        360,
        "基于城市更新 REITs 决策系统与 CityVibe AI 旅行助手两项作品，整理产品定位、流程架构、核心模块、技术实现与可交付成果，形成适合投递和展示的标准作品集 PDF。",
        11,
        20,
        "muted",
    )
    for i, item in enumerate(["REITs 决策辅助系统", "CityVibe AI 旅行助手", "网页作品集可部署版本"]):
        pill(page, MARGIN_X + i * 132, y + 18, item, "blue" if i != 1 else "orange")
    r = fitz.Rect(MARGIN_X, 505, PAGE_W - MARGIN_X, 715)
    page.draw_rect(r, fill=COLORS["dark"], color=COLORS["dark"])
    text(page, r.x0 + 28, r.y0 + 44, "Portfolio Scope", 11, True, "orange")
    rows = [
        ("01", "城市更新 REITs 全链条博弈决策辅助系统", "研究分析、空间识别、情景模拟与路径判断"),
        ("02", "CityVibe · AI 旅行助手", "输入需求、生成行程、执行查看、局部调整与导出复用"),
    ]
    yy = r.y0 + 88
    for num, name, desc in rows:
        text(page, r.x0 + 28, yy, num, 12, True, "orange")
        text(page, r.x0 + 72, yy, name, 15, True, "white")
        paragraph(page, r.x0 + 72, yy + 20, 390, desc, 9.5, 15, "muted")
        yy += 62
    text(page, MARGIN_X, 768, "作者：李军    WeChat: Gred    Location: Beijing / Guangzhou / Shanghai", 9, False, "muted")


def toc(state: DocState) -> None:
    page = add_page(state, "Gred Portfolio｜目录")
    title_block(page, "CONTENTS", "目录", "参考正式产品文档结构，将两个作品整理为可浏览、可投递、可打印的标准作品集。", "blue")
    items = [
        ("一、作品集概览", "03"),
        ("二、REITs 决策系统｜项目定位与数据基础", "04"),
        ("三、REITs 决策系统｜研究分析与空间识别", "06"),
        ("四、REITs 决策系统｜博弈决策与实现价值", "08"),
        ("五、CityVibe AI 旅行助手｜定位与产品链路", "10"),
        ("六、CityVibe AI 旅行助手｜功能模块与关键场景", "12"),
        ("七、CityVibe AI 旅行助手｜技术实现与导出复用", "14"),
        ("八、交付与发布说明", "16"),
    ]
    y = 210
    for title, page_no in items:
        text(page, MARGIN_X, y, title, 12, True, "ink")
        page.draw_line((MARGIN_X + 220, y - 4), (PAGE_W - MARGIN_X - 28, y - 4), color=COLORS["line"], width=0.5)
        text(page, PAGE_W - MARGIN_X - 20, y, page_no, 11, True, "blue")
        y += 48


def overview(state: DocState) -> None:
    page = add_page(state, "Gred Portfolio｜作品集概览")
    y = title_block(page, "OVERVIEW", "作品集概览", "两项作品分别覆盖城市更新金融决策与 AI 旅行产品，从数据分析、产品设计到前端实现，展示完整的研究转产品能力。", "blue")
    metric_grid(
        page,
        MARGIN_X,
        y,
        [("2", "核心作品", "金融决策 / AI 产品"), ("9+", "页面场景", "首页、详情、导出与决策"), ("Vercel", "部署路径", "GitHub 导入自动部署")],
        "blue",
    )
    y += 120
    cards = [
        ("能力组合", ["数据清洗与指标构造", "产品信息架构与用户流程", "React / Vite / Tailwind 前端实现", "可部署网站与标准作品集文档"]),
        ("文档逻辑", ["问题背景：为什么需要该工具", "产品方案：如何组织流程和模块", "技术实现：数据、模型、解析与渲染", "作品价值：面向岗位的能力表达"]),
    ]
    for i, (h, items) in enumerate(cards):
        r = fitz.Rect(MARGIN_X + i * 250, y, MARGIN_X + i * 250 + 232, y + 210)
        card(page, r)
        text(page, r.x0 + 18, r.y0 + 32, h, 16, True, "ink")
        bullet_list(page, r.x0 + 18, r.y0 + 68, r.width - 36, items, "blue" if i == 0 else "orange")


def reits_intro(state: DocState) -> None:
    page = add_page(state, "REITs 决策系统｜项目定位与数据基础")
    y = title_block(
        page,
        "CASE 01",
        "城市更新 REITs 全链条博弈决策辅助系统",
        "以产权类 REITs 基金样本、底层资产样本和城市更新项目评价数据为基础，将基金层、项目层、空间层和博弈决策层整合为同一工作流。",
        "blue",
    )
    image_box(page, PUBLIC / "reits-system-home.png", fitz.Rect(MARGIN_X, y, PAGE_W - MARGIN_X, y + 235), "系统首页：统一入口汇总基金、项目、空间与博弈决策模块")
    y += 260
    metric_grid(
        page,
        MARGIN_X,
        y,
        [("53", "产权类基金", "建立收益与风险基准"), ("128", "底层资产", "覆盖运营与空间字段"), ("4", "分析层级", "基金 / 项目 / 空间 / 博弈"), ("4", "路径模式", "培育 / 上市 / 打包 / 扩募")],
        "blue",
    )


def reits_workflow(state: DocState) -> None:
    page = add_page(state, "REITs 决策系统｜产品流程")
    y = title_block(page, "PROCESS", "从数据接入到决策输出", "系统不是单一图表展示，而是把静态研究结果延伸为可筛选、可分析、可模拟、可导出的决策辅助工具。", "blue")
    steps = [
        ("01 数据接入", "Excel / CSV 导入，统一基金、资产和城市空间字段。"),
        ("02 研究分析", "描述统计、风险收益、相关性、聚类和空间分析。"),
        ("03 情景模拟", "调整估值、出租率、分派率、产权清晰度和市场接受度。"),
        ("04 决策输出", "生成路径推荐、风险提示、决策卡和导出报告。"),
    ]
    for i, (h, d) in enumerate(steps):
        x = MARGIN_X + (i % 2) * 250
        yy = y + (i // 2) * 118
        r = fitz.Rect(x, yy, x + 232, yy + 92)
        card(page, r, "white", "line")
        text(page, r.x0 + 16, r.y0 + 28, h, 14, True, "blue")
        paragraph(page, r.x0 + 16, r.y0 + 52, r.width - 32, d, 9.5, 16, "muted")
    image_box(page, PUBLIC / "reits-data-entry.png", fitz.Rect(MARGIN_X, 455, 295, 700), "数据录入与分析页")
    image_box(page, PUBLIC / "reits-output.png", fitz.Rect(315, 455, PAGE_W - MARGIN_X, 700), "图像与数据输出页")


def reits_analysis(state: DocState) -> None:
    page = add_page(state, "REITs 决策系统｜研究分析层")
    y = title_block(page, "ANALYSIS LAYER", "从数据描述到结构识别", "研究分析层围绕基金市场结构、底层资产特征和空间分布规律建立可解释证据，为后续路径判断和情景模拟提供依据。", "blue")
    image_box(page, PUBLIC / "reits-risk-return.png", fitz.Rect(MARGIN_X, y, 305, y + 230), "风险—收益矩阵：识别收益补偿与风险位置")
    image_box(page, PUBLIC / "reits-correlation.png", fitz.Rect(325, y, PAGE_W - MARGIN_X, y + 230), "相关性热力图：观察核心变量联动")
    y += 260
    bullet_list(
        page,
        MARGIN_X,
        y,
        PAGE_W - MARGIN_X * 2,
        [
            "基金层：统计市场结构、IRR、分派率、区间收益率、换手率等变量，建立市场基准。",
            "项目层：整合业态、城市等级、出租率、租金和更新属性，形成底层资产画像。",
            "空间层：通过城市等级、产业类型和项目热力图识别适配性较高的区位组合。",
        ],
        "blue",
    )


def reits_decision(state: DocState) -> None:
    page = add_page(state, "REITs 决策系统｜博弈决策层")
    y = title_block(page, "DECISION LAYER", "从分析结果到路径判断", "在研究分析层之上，系统通过参数配置、情景比较和结果解释，把分析证据转化为可交互的上市路径判断。", "blue")
    image_box(page, PUBLIC / "reits-game-interface.png", fitz.Rect(MARGIN_X, y, PAGE_W - MARGIN_X, y + 285), "博弈决策总界面：参数配置、路径推荐、计算逻辑与结果解释")
    y += 310
    paths = ["Pre-REITs 培育", "直接独立上市", "组合打包发行", "扩募注入已有平台"]
    for i, p in enumerate(paths):
        x = MARGIN_X + (i % 2) * 250
        yy = y + (i // 2) * 46
        card(page, fitz.Rect(x, yy, x + 232, yy + 34), "blue_soft", "blue")
        text(page, x + 14, yy + 23, f"{i + 1:02d} · {p}", 10, True, "blue")


def reits_value(state: DocState) -> None:
    page = add_page(state, "REITs 决策系统｜技术与价值")
    y = title_block(page, "IMPLEMENTATION", "技术实现与作品价值", "前端负责页面结构、参数交互和图表展示，分析层封装统计与可视化逻辑，数据层负责字段映射、结果缓存与导出。", "blue")
    sections = [
        ("展示层", "React / TypeScript / Tailwind", "导航、图表、参数滑块、决策卡与导出按钮。"),
        ("应用层", "本地任务与结果管理", "参数传递、项目选择、分析触发和结果管理。"),
        ("分析层", "Pandas / NumPy / scikit-learn", "描述统计、PCA、聚类、相关性和评分模型。"),
        ("数据层", "Excel / CSV / 本地缓存", "上传、字段映射、清洗和结果缓存。"),
    ]
    for i, (layer, stack, desc) in enumerate(sections):
        r = fitz.Rect(MARGIN_X + (i % 2) * 250, y + (i // 2) * 118, MARGIN_X + (i % 2) * 250 + 232, y + (i // 2) * 118 + 92)
        card(page, r)
        text(page, r.x0 + 16, r.y0 + 24, layer, 10, True, "blue")
        text(page, r.x0 + 16, r.y0 + 46, stack, 12, True, "ink")
        paragraph(page, r.x0 + 16, r.y0 + 66, r.width - 32, desc, 8.8, 14, "muted")
    paragraph(
        page,
        MARGIN_X,
        565,
        PAGE_W - MARGIN_X * 2,
        "作品价值：该系统展示了从城市更新金融研究、REITs 市场数据分析、空间识别到产品化决策辅助工具的完整转化过程，适合用于数据分析、产品设计、城市科技与金融科技岗位表达。",
        12,
        22,
        "ink",
        True,
    )


def city_intro(state: DocState) -> None:
    page = add_page(state, "CityVibe｜产品定位")
    y = title_block(
        page,
        "CASE 02",
        "CityVibe · AI 旅行助手",
        "面向移动端的 AI 旅行规划产品，将城市、日期、偏好与同行条件转化为可执行、可修改、可分享的行程计划。",
        "orange",
    )
    image_box(page, PUBLIC / "cityvibe-home.png", fitz.Rect(MARGIN_X, y, 260, y + 300), "产品首页：输入城市、日期与偏好")
    r = fitz.Rect(285, y, PAGE_W - MARGIN_X, y + 300)
    card(page, r)
    text(page, r.x0 + 18, r.y0 + 32, "核心问题", 16, True, "orange")
    paragraph(page, r.x0 + 18, r.y0 + 64, r.width - 36, "用户缺少的不是景点信息，而是把开放时间、预约规则、交通路线、预算和偏好约束快速组织成可执行计划的能力。", 11, 20, "ink")
    bullet_list(page, r.x0 + 18, r.y0 + 145, r.width - 36, ["输入层：城市 / 日期 / 偏好 / 预算 / 同行条件", "生成层：AI 产出候选行程并解析为标准数据", "输出层：旅程卡片、详情抽屉、全局计划表和导出长图"], "orange")
    metric_grid(page, MARGIN_X, 635, [("4", "核心阶段", "输入 / 生成 / 执行 / 导出"), ("5", "前台模块", "用户可感知能力"), ("6", "技术链路", "生成到反馈"), ("1", "计划表", "长图结果输出")], "orange")


def city_workflow(state: DocState) -> None:
    page = add_page(state, "CityVibe｜产品链路")
    y = title_block(page, "WORKFLOW", "从输入到执行的连续闭环", "每一步都有明确输入和输出，避免 AI 结果停留在一段自然语言文本中。", "orange")
    steps = [
        ("01 输入需求", "收集城市、日期、偏好、同行关系和预算条件。"),
        ("02 生成行程", "将用户条件转化为生成任务，产出按 Day 组织的候选行程。"),
        ("03 校验渲染", "校验日期、地点、时间、交通和门票字段。"),
        ("04 执行查看", "进入地点详情、导航、AI 解说或浮动计划页。"),
        ("05 局部调整", "只替换单个地点及相关时段，未修改内容保持不动。"),
        ("06 导出复用", "导出长图、保存日志并进入同行确认场景。"),
    ]
    for i, (h, d) in enumerate(steps):
        x = MARGIN_X + (i % 3) * 166
        yy = y + (i // 3) * 112
        r = fitz.Rect(x, yy, x + 150, yy + 92)
        card(page, r)
        text(page, r.x0 + 12, r.y0 + 25, h, 11, True, "orange")
        paragraph(page, r.x0 + 12, r.y0 + 49, r.width - 24, d, 8.5, 13, "muted")
    image_box(page, PUBLIC / "cityvibe-loading.png", fitz.Rect(MARGIN_X, 492, 260, 700), "生成中状态：持续反馈当前任务状态")
    image_box(page, PUBLIC / "cityvibe-trip.png", fitz.Rect(285, 492, PAGE_W - MARGIN_X, 700), "旅程页：按 Day 展示地点、时段与执行信息")


def city_modules(state: DocState) -> None:
    page = add_page(state, "CityVibe｜功能模块")
    y = title_block(page, "FUNCTION MODULES", "五大前台功能模块", "功能模块只呈现用户可感知、可操作的产品能力；结构化协议、字段解析和模型调度放在技术实现层说明。", "orange")
    modules = [
        ("A", "移动端入口与需求收集", "首页保留目的地、日期和偏好等关键输入。"),
        ("B", "旅程卡片与全局计划表", "把攻略文本转成按天组织的可执行计划对象。"),
        ("C", "地点详情、导航与 AI 解说", "半屏抽屉补充开放规则、游玩建议和导航入口。"),
        ("D", "局部改线与重新规划", "临时替换单个地点，只更新相关地点和时段。"),
        ("E", "AI 辅助与旅程日志", "保留问答、筛选和历史方案恢复入口。"),
    ]
    for i, (num, h, d) in enumerate(modules):
        r = fitz.Rect(MARGIN_X, y + i * 73, PAGE_W - MARGIN_X, y + i * 73 + 54)
        card(page, r)
        text(page, r.x0 + 16, r.y0 + 33, f"MODULE {num}", 9, True, "orange")
        text(page, r.x0 + 100, r.y0 + 24, h, 13, True, "ink")
        paragraph(page, r.x0 + 100, r.y0 + 43, 380, d, 8.8, 13, "muted")


def city_scenes(state: DocState) -> None:
    page = add_page(state, "CityVibe｜关键场景")
    y = title_block(page, "KEY SCENES", "查看、改线、导出三类高频动作", "把复杂旅行计划拆解为不同执行场景，让用户在移动端完成查看、修改与协作。", "orange")
    image_box(page, PUBLIC / "cityvibe-detail.png", fitz.Rect(MARGIN_X, y, 230, y + 255), "地点详情：规则、导航与 AI 解说")
    image_box(page, PUBLIC / "cityvibe-replace.png", fitz.Rect(245, y, 410, y + 255), "局部改线：替换单个目的地")
    image_box(page, PUBLIC / "cityvibe-actions.png", fitz.Rect(425, y, PAGE_W - MARGIN_X, y + 255), "底部操作：导出与重规划")
    y += 285
    bullet_list(page, MARGIN_X, y, PAGE_W - MARGIN_X * 2, ["现场执行：地点卡片带有时间、交通、门票、地址和提示信息。", "局部调整：只修改发生变化的节点，降低长行程重跑成本。", "导出复用：计划表可作为同行确认和后续复盘材料。"], "orange")


def city_tech(state: DocState) -> None:
    page = add_page(state, "CityVibe｜技术实现")
    y = title_block(page, "TECH IMPLEMENTATION", "生成、解析、渲染与反馈", "技术重点不是简单接入模型，而是让 AI 结果稳定进入页面、支持修改，并最终形成可复用输出。", "orange")
    r = fitz.Rect(MARGIN_X, y, PAGE_W - MARGIN_X, y + 260)
    page.draw_rect(r, fill=COLORS["dark"], color=COLORS["dark"])
    steps = [("01", "用户需求", "城市 / 日期 / 偏好"), ("02", "任务封装", "模板约束与上下文"), ("03", "模型生成", "多模型并发请求"), ("04", "结构校验", "字段完整性检查"), ("05", "前端渲染", "卡片 / 抽屉 / 计划表"), ("06", "反馈迭代", "改线 / 日志 / 导出")]
    for i, (num, h, d) in enumerate(steps):
        x = r.x0 + 18 + (i % 3) * 165
        yy = r.y0 + 28 + (i // 3) * 100
        text(page, x, yy, num, 10, True, "orange")
        text(page, x, yy + 25, h, 12, True, "white")
        paragraph(page, x, yy + 45, 135, d, 8.5, 13, "muted")
    y += 292
    text(page, MARGIN_X, y, "DAY 输出协议说明", 17, True, "ink")
    paragraph(page, MARGIN_X, y + 28, PAGE_W - MARGIN_X * 2, "模型先按 TRIP / DAY / ITEM 输出稳定文本，再由本地解析器转成前端数据结构。DAY 负责组织每天主题，ITEM 负责地点、时间、预约、交通、票务、地址和提示字段，保证后续卡片渲染、详情抽屉、改线和导出可复用同一份结果。", 10.5, 19, "muted")
    sample = "TRIP|北京|Asia/Shanghai|2026-05-01|2026-05-03|3\nDAY|2026-05-01|1|现代建筑与文创园区\nITEM|2026-05-01|1|1|bj_001|中国国家版本馆|09:00-11:30|需预约|地铁昌平线|免费|150min|TIPS|提前实名预约"
    card(page, fitz.Rect(MARGIN_X, y + 118, PAGE_W - MARGIN_X, y + 218), "light", "line")
    paragraph(page, MARGIN_X + 18, y + 145, PAGE_W - MARGIN_X * 2 - 36, sample, 8.5, 15, "ink")


def city_export(state: DocState) -> None:
    page = add_page(state, "CityVibe｜导出复用")
    y = title_block(page, "OUTPUT", "从个人查看进入同行协作", "导出能力让旅行计划不只停留在“自己看”，而能进入微信、社交平台和同行确认场景。", "orange")
    image_box(page, PUBLIC / "cityvibe-export-table.png", fitz.Rect(MARGIN_X, y, PAGE_W - MARGIN_X, y + 275), "全局计划表：按日期汇总地点、时间、交通、门票与提示信息")
    y += 305
    bullet_list(page, MARGIN_X, y, PAGE_W - MARGIN_X * 2, ["分享确认：长图式计划表可直接发送给同行人，减少口头沟通成本。", "现场执行：每个地点都带有时间、交通、门票、地址和 tips，方便照着执行。", "方案留存：计划保存在旅程日志中，可用于恢复、对比和再次使用。"], "orange")


def appendix(state: DocState) -> None:
    page = add_page(state, "Gred Portfolio｜交付与发布说明")
    y = title_block(page, "DELIVERY", "交付与发布说明", "网站已配置 Vercel 单页应用路由重写，适合通过 GitHub + Vercel 发布为公网作品集。", "blue")
    items = [
        ("本地构建", "npm run build，输出目录为 dist。"),
        ("路由适配", "vercel.json 将所有路径重写到 index.html，避免 /reits、/cityvibe、/about 刷新 404。"),
        ("版本管理", "上传 GitHub 时保留源码与 public 素材，node_modules 与 dist 已由 .gitignore 排除。"),
        ("展示路径", "推荐部署到 Vercel，后续 push 到 GitHub 后自动重新部署。"),
    ]
    for i, (h, d) in enumerate(items):
        r = fitz.Rect(MARGIN_X, y + i * 85, PAGE_W - MARGIN_X, y + i * 85 + 62)
        card(page, r)
        text(page, r.x0 + 18, r.y0 + 27, h, 13, True, "blue")
        paragraph(page, r.x0 + 120, r.y0 + 25, 360, d, 9.5, 16, "muted")
    text(page, MARGIN_X, 735, "End of Portfolio", 12, True, "muted")


def build_pdf() -> None:
    OUT_DIR.mkdir(exist_ok=True)
    state = DocState(fitz.open())
    for fn in [
        cover,
        toc,
        overview,
        reits_intro,
        reits_workflow,
        reits_analysis,
        reits_decision,
        reits_value,
        city_intro,
        city_workflow,
        city_modules,
        city_scenes,
        city_tech,
        city_export,
        appendix,
    ]:
        fn(state)
    state.doc.set_metadata(
        {
            "title": "Gred Portfolio 专业作品集",
            "author": "李军",
            "subject": "REITs 决策系统与 CityVibe AI 旅行助手作品集",
            "keywords": "Portfolio, REITs, AI Travel, Product Design, Data Analysis",
        }
    )
    state.doc.save(OUT_PDF, deflate=True, garbage=4)
    state.doc.close()
    print(OUT_PDF)


if __name__ == "__main__":
    build_pdf()

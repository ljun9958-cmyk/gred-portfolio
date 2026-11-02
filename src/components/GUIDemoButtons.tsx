import { PlayCircle } from 'lucide-react';
import { GUI_DEMOS, type GUIDemo } from '../data/guiProject';

// 两个入口沿用原作品演示按钮的字号与高度，通过同一弹窗播放各自的视频。
export default function GUIDemoButtons({
  onPlayDemo,
  className = '',
}: {
  onPlayDemo: (demo: GUIDemo) => void;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      {GUI_DEMOS.map((demo) => (
        <button
          key={demo.id}
          type="button"
          onClick={() => onPlayDemo(demo)}
          className="inline-flex h-10 min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-cyan-600 bg-cyan-600 px-2 font-sans text-sm font-black text-white shadow-sm shadow-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-600"
        >
          <PlayCircle size={16} strokeWidth={2.7} className="shrink-0" />
          {demo.label}
        </button>
      ))}
    </div>
  );
}

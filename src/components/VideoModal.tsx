import React from 'react';
import { X } from 'lucide-react';

type VideoModalProps = {
  open: boolean;
  src: string;
  title: string;
  description?: string;
  tone?: 'blue' | 'orange';
  onClose: () => void;
};

export default function VideoModal({ open, src, title, description, tone = 'blue', onClose }: VideoModalProps) {
  React.useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const accentClass = tone === 'orange' ? 'text-orange-600' : 'text-blue-600';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 flex w-full max-w-[960px] flex-col overflow-hidden rounded-[1.75rem] border border-white/15 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 md:px-6">
          <div className="min-w-0">
            <div className={`text-xs font-black uppercase tracking-[0.24em] ${accentClass}`}>Demo Video</div>
            <h2 className="mt-1 text-xl font-black text-slate-950 md:text-2xl">{title}</h2>
            {description && <p className="mt-1 text-sm font-medium leading-6 text-slate-500">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-950 hover:text-white"
            aria-label="关闭演示视频"
          >
            <X size={20} strokeWidth={2.4} />
          </button>
        </div>

        {/* 视频弹窗独立承载播放，不改变原页面布局；metadata 预加载减少首页流量占用。 */}
        <div className="bg-slate-950 p-2 md:p-3">
          <video key={src} controls autoPlay playsInline preload="metadata" className="max-h-[78vh] w-full rounded-[1.25rem] bg-black object-contain">
            <source src={src} type="video/mp4" />
            当前浏览器不支持视频播放。
          </video>
        </div>
      </div>
    </div>
  );
}

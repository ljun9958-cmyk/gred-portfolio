import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Code2,
  Compass,
  Database,
  MonitorCheck,
  PlayCircle,
  Smartphone,
  Target,
} from 'lucide-react';
import VideoModal from '../components/VideoModal';
import GUIDemoButtons from '../components/GUIDemoButtons';
import { GUI_METRICS } from '../data/guiProject';

type Tone = 'blue' | 'orange' | 'cyan';
type ProjectKey = 'gui' | 'reits' | 'cityvibe';
type DemoVideo = {
  src: string;
  title: string;
  description: string;
  tone: Tone;
};
type Project = {
  key: ProjectKey;
  to: string;
  tone: Tone;
  icon: typeof MonitorCheck;
  eyebrow: string;
  caseNo: string;
  title: string;
  tags: string[];
  metrics: [string, string][];
  demo?: DemoVideo;
};

// 项目顺序统一由首页数据定义；保留既有案例与视频入口。
const projects: Project[] = [
  {
    key: 'gui',
    to: '/gui',
    tone: 'cyan',
    icon: MonitorCheck,
    eyebrow: 'AI WORKFLOW · DESKTOP TOOL',
    caseNo: 'Case Study 01',
    title: 'GUI 操作轨迹质检与受控修复工具',
    tags: ['AI 质检', '桌面工具', 'Skill 工作流', '受控修复'],
    metrics: [
      [GUI_METRICS.processed, '已处理数据'],
      ['2 套', '检查 / 修改 Skill'],
      ['5 阶段', '递进质检'],
    ],
  },
  {
    key: 'reits',
    to: '/reits',
    tone: 'blue',
    icon: Building2,
    eyebrow: 'DATA PRODUCT · URBAN FINANCE',
    caseNo: 'Case Study 02',
    title: '城市更新 REITs 全链条博弈决策辅助系统',
    tags: ['REITs', '城市更新', '数据分析', '博弈模拟'],
    metrics: [
      ['53', '产权类基金'],
      ['128', '底层资产'],
      ['4 层', '分析链路'],
    ],
    demo: {
      src: '/videos/reits-system-demo.mp4',
      title: 'REITs 决策系统演示',
      description: '演示数据录入、分析视图、图表输出与决策辅助流程。',
      tone: 'blue',
    },
  },
  {
    key: 'cityvibe',
    to: '/cityvibe',
    tone: 'orange',
    icon: Compass,
    eyebrow: 'AI PRODUCT · MOBILE TRAVEL',
    caseNo: 'Case Study 03',
    title: 'CityVibe · AI 旅行助手',
    tags: ['AI 产品', '移动端', '旅行规划', '导出分享'],
    metrics: [
      ['5 类', '前台模块'],
      ['6 步', '导出链路'],
      ['1 张', '行程表'],
    ],
    demo: {
      src: '/videos/ai-travel-demo.mp4',
      title: 'CityVibe AI 旅行助手演示',
      description: '演示 AI 生成行程、查看详情、局部调整与导出计划表。',
      tone: 'orange',
    },
  },
];

const capabilities = [
  {
    icon: Database,
    title: '数据分析',
    desc: '描述统计、相关性、PCA、聚类、评分模型与空间分析',
  },
  { icon: Target, title: '业务思维', desc: '将复杂问题拆解为可执行流程' },
  { icon: Smartphone, title: '产品设计', desc: '用户路径、信息架构与任务闭环' },
  {
    icon: Code2,
    title: '技术实现',
    desc: 'React / FastAPI / PySide6 / 可视化',
  },
];

function toneClass(tone: Tone) {
  if (tone === 'cyan') {
    return {
      text: 'text-cyan-600',
      pale: 'bg-cyan-50 text-cyan-700 border-cyan-100',
      button: 'bg-cyan-600 hover:bg-cyan-700 shadow-cyan-200',
      demo: 'border-cyan-100 bg-cyan-600 text-white shadow-cyan-200 hover:bg-cyan-700',
      titleHover: 'group-hover:text-cyan-600',
    };
  }
  return tone === 'blue'
    ? {
        text: 'text-blue-600',
        pale: 'bg-blue-50 text-blue-700 border-blue-100',
        button: 'bg-blue-600 hover:bg-blue-700 shadow-blue-200',
        demo: 'border-blue-100 bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700',
        titleHover: 'group-hover:text-blue-600',
      }
    : {
        text: 'text-orange-600',
        pale: 'bg-orange-50 text-orange-700 border-orange-100',
        button: 'bg-orange-500 hover:bg-orange-600 shadow-orange-200',
        demo: 'border-orange-100 bg-orange-500 text-white shadow-orange-200 hover:bg-orange-600',
        titleHover: 'group-hover:text-orange-600',
      };
}

// 预览采用完整适配，截图不会为填满卡片而被裁切；详情页提供放大查看。
function CompactPreview({ type }: { type: ProjectKey }) {
  if (type === 'gui') {
    return (
      <div className="grid h-full min-h-0 grid-rows-[1fr_0.44fr] gap-2 overflow-hidden rounded-xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white p-2">
        <div className="min-h-0 overflow-hidden rounded-lg bg-white p-1.5 shadow-sm">
          <img
            src="/gui/overview.webp"
            alt="GUI 质检工作台：任务、证据、状态与结果"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="grid min-h-0 grid-cols-[1fr_0.9fr] gap-2">
          <div className="min-h-0 overflow-hidden rounded-lg bg-white p-1.5 shadow-sm">
            <img
              src="/gui/issue-detail.webp"
              alt="定位到步骤与字段的检查建议"
              className="h-full w-full object-contain object-top"
            />
          </div>
          <div className="flex min-h-0 flex-col justify-center rounded-lg bg-slate-950 px-3 py-2 text-white">
            <div className="text-[11px] font-black text-cyan-200">检查 · 复核 · 修复</div>
            <div className="mt-1 text-xs font-bold leading-5">
              分轮核验证据
              <br />
              按授权字段写入
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (type === 'reits') {
    return (
      <div className="grid h-full min-h-0 grid-cols-[1fr_0.92fr] gap-2 overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-2">
        <div className="grid min-h-0 min-w-0 grid-rows-[0.42fr_0.58fr] gap-2">
          <div className="overflow-hidden rounded-lg bg-white p-2 shadow-sm">
            <img
              src="/reits-system-home.png"
              alt="REITs 系统首页"
              className="h-full w-full rounded-md object-contain object-top"
            />
          </div>
          <div className="overflow-hidden rounded-lg bg-white p-2 shadow-sm">
            <img
              src="/reits-irr-payout.png"
              alt="IRR 与年化派息率关系"
              className="h-full w-full rounded-md object-contain"
            />
          </div>
        </div>
        <div className="grid min-h-0 min-w-0 grid-rows-[0.42fr_0.58fr] gap-2">
          <div className="flex min-h-0 flex-col overflow-hidden rounded-lg bg-white p-2 shadow-sm">
            <div className="mb-1 text-[11px] font-black text-slate-500">空间热力</div>
            <div className="min-h-0 flex-1 overflow-hidden rounded-md">
              <img
                src="/reits-spatial-heat.png"
                alt="空间热力图"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="flex min-h-0 flex-col overflow-hidden rounded-lg bg-slate-950 p-2.5 text-white">
            <div className="text-[11px] font-black text-blue-200">路径模拟</div>
            <div className="mt-1 min-h-0 flex-1 overflow-hidden rounded-md bg-white/5">
              <img
                src="/reits-game-interface.png"
                alt="REITs 博弈决策界面"
                className="h-full w-full object-contain object-top"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="grid h-full min-h-0 grid-cols-[0.82fr_1fr] gap-2 overflow-hidden rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-2">
      <div className="min-h-0 overflow-hidden rounded-[1.25rem] border-[3px] border-slate-950 bg-white p-1 shadow-lg">
        <img
          src="/cityvibe-home.png"
          alt="CityVibe 首页"
          className="h-full w-full rounded-[1rem] object-contain object-top"
        />
      </div>
      <div className="grid min-h-0 min-w-0 grid-rows-[1fr_0.86fr] gap-2">
        <div className="overflow-hidden rounded-lg bg-white p-2 shadow-sm">
          <img
            src="/cityvibe-export-table.png"
            alt="全局行程表"
            className="h-full w-full rounded-md object-contain"
          />
        </div>
        <div className="grid min-h-0 grid-cols-[0.7fr_1fr] gap-2">
          <div className="flex min-h-0 flex-col overflow-hidden rounded-lg bg-slate-950 p-2.5 text-white">
            <div className="text-[11px] font-black text-orange-200">执行闭环</div>
            <div className="mt-1 text-xs font-black leading-4">卡片 · 导航 · 改线 · 导出</div>
            <div className="mt-2 min-h-0 flex-1 overflow-hidden rounded-md bg-white/5">
              <img
                src="/cityvibe-actions.png"
                alt="CityVibe 底部操作"
                className="h-full w-full object-contain opacity-90"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-orange-100 bg-white p-2">
            <div className="grid h-full min-h-0 grid-cols-2 gap-1.5">
              <img
                src="/cityvibe-trip.png"
                alt="CityVibe 旅程页"
                className="h-full w-full rounded-md object-contain object-top"
              />
              <img
                src="/cityvibe-floating.png"
                alt="浮动计划页"
                className="h-full w-full rounded-md object-contain object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onPlayDemo,
}: {
  project: Project;
  index: number;
  onPlayDemo: (demo: DemoVideo) => void;
}) {
  const Icon = project.icon;
  const cls = toneClass(project.tone);
  const demo = project.demo;
  const actionClass = `inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border text-sm font-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${cls.demo}`;
  return (
    <div className="group flex min-w-0 flex-col gap-3">
      <Link
        to={project.to}
        aria-label={`打开${project.title}`}
        className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
      >
        <motion.article
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + index * 0.08, duration: 0.55 }}
          className="relative grid h-[31rem] min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div className="flex min-h-0 flex-col p-3.5 lg:p-4">
            <div className="mb-2.5 flex items-center gap-2.5">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${cls.pale}`}
              >
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <div
                  className={`truncate text-[10px] font-black uppercase tracking-[0.2em] ${cls.text}`}
                >
                  {project.eyebrow}
                </div>
                <div className="text-[11px] font-bold text-slate-400">{project.caseNo}</div>
              </div>
            </div>
            <div className="flex items-start justify-between gap-3">
              <h2
                className={`min-h-12 text-lg font-black leading-tight text-slate-950 transition-colors lg:text-xl ${cls.titleHover}`}
              >
                {project.title}
              </h2>
              <div
                className={`hidden h-7 w-7 shrink-0 items-center justify-center rounded-full text-white shadow-lg md:flex ${cls.button}`}
              >
                <ArrowRight size={15} />
              </div>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-black ${cls.pale}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <dl className="mt-2.5 grid grid-cols-3 gap-2">
              {project.metrics.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-2"
                >
                  <dd className={`text-lg font-black leading-none ${cls.text}`}>{value}</dd>
                  <dt className="mt-1 text-[10px] font-bold leading-4 text-slate-500">{label}</dt>
                </div>
              ))}
            </dl>
          </div>
          <div className="min-h-0 overflow-hidden p-2.5 pt-0">
            <CompactPreview type={project.key} />
          </div>
        </motion.article>
      </Link>
      {project.key === 'gui' ? (
        <GUIDemoButtons onPlayDemo={onPlayDemo} />
      ) : demo ? (
        <button type="button" onClick={() => onPlayDemo(demo)} className={actionClass}>
          <PlayCircle size={16} strokeWidth={2.7} />
          观看演示
        </button>
      ) : (
        <Link to={project.to} className={actionClass}>
          <MonitorCheck size={16} />
          查看项目
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const [activeDemo, setActiveDemo] = useState<DemoVideo | null>(null);
  return (
    <div className="mesh-gradient min-h-screen px-5 pb-8 pt-28 md:pt-32">
      <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-8 min-[112.5rem]:max-w-[1760px]">
        <header className="mb-1 flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-white p-0.5 shadow-xl lg:h-20 lg:w-20"
          >
            <img
              src="/avatar.jpg"
              alt="Gred Avatar"
              className="h-full w-full rounded-[0.9rem] object-cover lg:rounded-[1.2rem]"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src =
                  'https://api.dicebear.com/7.x/avataaars/svg?seed=Gred&backgroundColor=b6e3f4';
              }}
            />
          </motion.div>
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-black tracking-tight text-slate-950 lg:text-5xl"
            >
              Gred{' '}
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Portfolio
              </span>
            </motion.h1>
            <p className="mt-1 text-sm font-medium text-slate-500 sm:text-base lg:text-lg">
              数据分析 × AI 产品 × 城市空间应用
            </p>
          </div>
        </header>
        {/* 保留原有约 31rem 卡片高度，常规桌面两列、宽屏三列，内容增长时自然滚动。 */}
        <section
          aria-label="精选作品"
          className="grid grid-cols-1 gap-x-3.5 gap-y-8 md:grid-cols-2 min-[112.5rem]:grid-cols-3"
        >
          {projects.map((project, index) => (
            <div key={project.key} className="min-w-0">
              <ProjectCard project={project} index={index} onPlayDemo={setActiveDemo} />
            </div>
          ))}
        </section>
        <section aria-label="专业能力" className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-4">
          {capabilities.map(({ icon: Icon, title, desc }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex min-h-[4.25rem] min-w-0 items-center gap-3 rounded-xl border border-slate-100 bg-white/75 px-3 py-3 shadow-sm backdrop-blur-sm"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white">
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-black text-slate-950">{title}</h3>
                <p className="text-[11px] font-medium leading-4 text-slate-500">{desc}</p>
              </div>
            </motion.div>
          ))}
        </section>
      </div>
      <VideoModal
        open={Boolean(activeDemo)}
        src={activeDemo?.src || ''}
        title={activeDemo?.title || ''}
        description={activeDemo?.description}
        tone={activeDemo?.tone}
        onClose={() => setActiveDemo(null)}
      />
    </div>
  );
}

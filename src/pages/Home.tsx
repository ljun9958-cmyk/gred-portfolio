import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Code2,
  Compass,
  Database,
  Smartphone,
  Target,
} from 'lucide-react';

type Tone = 'blue' | 'orange';

const projects = [
  {
    key: 'reits',
    to: '/reits',
    tone: 'blue' as Tone,
    icon: Building2,
    eyebrow: 'DATA PRODUCT · URBAN FINANCE',
    caseNo: 'Case Study 01',
    title: '城市更新 REITs 全链条博弈决策辅助系统',
    tags: ['REITs', '城市更新', '数据分析', '博弈模拟'],
    metrics: [
      ['53', '产权类基金'],
      ['128', '底层资产'],
      ['4 层', '分析链路'],
    ],
  },
  {
    key: 'cityvibe',
    to: '/cityvibe',
    tone: 'orange' as Tone,
    icon: Compass,
    eyebrow: 'AI PRODUCT · MOBILE TRAVEL',
    caseNo: 'Case Study 02',
    title: 'CityVibe · AI 旅行助手',
    tags: ['AI 产品', '移动端', '旅行规划', '导出分享'],
    metrics: [
      ['5 类', '前台模块'],
      ['6 步', '导出链路'],
      ['1 张', '行程表'],
    ],
  },
];

const capabilities = [
  {
    icon: Database,
    title: '数据分析',
    desc: '描述统计、相关性、PCA、聚类、评分模型与空间分析',
  },
  {
    icon: Target,
    title: '业务思维',
    desc: '将复杂问题拆解为可执行流程',
  },
  {
    icon: Smartphone,
    title: '产品设计',
    desc: '用户路径、信息架构与任务闭环',
  },
  {
    icon: Code2,
    title: '技术实现',
    desc: 'React / FastAPI / Pandas / 可视化',
  },
];

function toneClass(tone: Tone) {
  return tone === 'blue'
    ? {
        text: 'text-blue-600',
        pale: 'bg-blue-50 text-blue-700 border-blue-100',
        button: 'bg-blue-600 hover:bg-blue-700 shadow-blue-200',
        titleHover: 'group-hover:text-blue-600',
      }
    : {
        text: 'text-orange-600',
        pale: 'bg-orange-50 text-orange-700 border-orange-100',
        button: 'bg-orange-500 hover:bg-orange-600 shadow-orange-200',
        titleHover: 'group-hover:text-orange-600',
      };
}

function CompactPreview({ type }: { type: 'reits' | 'cityvibe' }) {
  if (type === 'reits') {
    return (
      <div className="grid h-full min-h-0 grid-cols-[1fr_0.92fr] gap-2 overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-2">
        {/* 预览区使用固定窗口和 contain 适配，避免截图被裁切或撑高卡片。 */}
        <div className="grid min-h-0 min-w-0 grid-rows-[0.42fr_0.58fr] gap-2">
          <div className="overflow-hidden rounded-lg bg-white p-2 shadow-sm">
            <img src="/reits-system-home.png" alt="REITs 系统首页" className="h-full w-full rounded-md object-contain object-top" />
          </div>
          <div className="overflow-hidden rounded-lg bg-white p-2 shadow-sm">
            <img src="/reits-irr-payout.png" alt="IRR 与年化派息率关系" className="h-full w-full rounded-md object-contain object-center" />
          </div>
        </div>
        <div className="grid min-h-0 min-w-0 grid-rows-[0.42fr_0.58fr] gap-2">
          <div className="flex min-h-0 flex-col overflow-hidden rounded-lg bg-white p-2 shadow-sm">
            <div className="mb-1 text-[11px] font-black text-slate-500">空间热力</div>
            <div className="min-h-0 flex-1 overflow-hidden rounded-md">
              <img src="/reits-spatial-heat.png" alt="空间热力图" className="h-full w-full object-contain object-center" />
            </div>
          </div>
          <div className="flex min-h-0 flex-col overflow-hidden rounded-lg bg-slate-950 p-2.5 text-white">
            <div className="text-[11px] font-black text-blue-200">路径模拟</div>
            <div className="mt-1 min-h-0 flex-1 overflow-hidden rounded-md bg-white/5">
              <img src="/reits-game-interface.png" alt="REITs 博弈决策界面" className="h-full w-full object-contain object-top" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid h-full min-h-0 grid-cols-[0.82fr_1fr] gap-2 overflow-hidden rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-2">
      {/* 手机和列表都按窗口完整适配，保留产品形态但减少裁切。 */}
      <div className="min-h-0 overflow-hidden rounded-[1.25rem] border-[3px] border-slate-950 bg-white p-1 shadow-lg">
        <img src="/cityvibe-home.png" alt="CityVibe 首页" className="h-full w-full rounded-[1rem] object-contain object-top" />
      </div>
      <div className="grid min-h-0 min-w-0 grid-rows-[1fr_0.86fr] gap-2">
        <div className="overflow-hidden rounded-lg bg-white p-2 shadow-sm">
          <img src="/cityvibe-export-table.png" alt="全局行程表" className="h-full w-full rounded-md object-contain object-center" />
        </div>
        <div className="grid min-h-0 grid-cols-[0.7fr_1fr] gap-2">
          <div className="flex min-h-0 flex-col overflow-hidden rounded-lg bg-slate-950 p-2.5 text-white">
            <div className="text-[11px] font-black text-orange-200">执行闭环</div>
            <div className="mt-1 text-xs font-black leading-4">卡片 · 导航 · 改线 · 导出</div>
            <div className="mt-2 min-h-0 flex-1 overflow-hidden rounded-md bg-white/5">
              <img src="/cityvibe-actions.png" alt="CityVibe 底部操作" className="h-full w-full object-contain object-center opacity-90" />
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-orange-100 bg-white p-2">
            <div className="grid h-full min-h-0 grid-cols-2 gap-1.5">
              <img src="/cityvibe-trip.png" alt="CityVibe 旅程页" className="h-full w-full rounded-md object-contain object-top" />
              <img src="/cityvibe-floating.png" alt="浮动计划页" className="h-full w-full rounded-md object-contain object-top" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const Icon = project.icon;
  const cls = toneClass(project.tone);

  return (
    <Link to={project.to} className="block h-full min-h-0 overflow-hidden group">
      <motion.article
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 + index * 0.08, duration: 0.55 }}
        className="grid h-full min-h-0 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl lg:grid-rows-[auto_minmax(0,1fr)]"
      >
        <div className="flex min-h-0 flex-col p-3.5 lg:p-4">
          {/* 顶部仅保留项目识别、标签和指标，避免描述文字挤占首屏。 */}
          <div className="mb-2.5 flex items-center gap-2.5">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${cls.pale}`}>
              <Icon size={18} />
            </div>
            <div className="min-w-0">
              <div className={`truncate text-[10px] font-black uppercase tracking-[0.2em] ${cls.text}`}>{project.eyebrow}</div>
              <div className="text-[11px] font-bold text-slate-400">{project.caseNo}</div>
            </div>
          </div>

          <div className="flex items-start justify-between gap-3">
            <h2 className={`text-lg font-black leading-tight text-slate-950 transition-colors lg:text-xl ${cls.titleHover}`}>
              {project.title}
            </h2>
            <div className={`hidden h-7 w-7 shrink-0 items-center justify-center rounded-full text-white shadow-lg md:flex ${cls.button}`}>
              <ArrowRight size={15} />
            </div>
          </div>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className={`rounded-full border px-2 py-0.5 text-[10px] font-black ${cls.pale}`}>
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {project.metrics.map(([value, label]) => (
              <div key={label} className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-2">
                <div className={`text-lg font-black leading-none ${cls.text}`}>{value}</div>
                <div className="mt-1 truncate text-[10px] font-bold text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="min-h-0 overflow-hidden p-2.5 pt-0">
          <CompactPreview type={project.key as 'reits' | 'cityvibe'} />
        </div>
      </motion.article>
    </Link>
  );
}

function CapabilityBar({ item, index }: { item: (typeof capabilities)[number]; index: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 + index * 0.08 }}
      className="flex min-h-[4.25rem] min-w-0 items-center gap-3 rounded-xl border border-slate-100 bg-white/75 px-3 py-3 shadow-sm backdrop-blur-sm"
    >
      {/* 底部能力区压缩成辅助信息，避免和项目卡片争抢高度。 */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white">
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <h3 className="text-xs font-black text-slate-950">{item.title}</h3>
        <p className="text-[11px] font-medium leading-4 text-slate-500">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="mesh-gradient flex min-h-screen flex-col px-5 pb-5 pt-5 lg:h-screen lg:min-h-0 lg:overflow-hidden">
      <div className="mx-auto flex min-h-0 w-full max-w-[1160px] flex-1 flex-col justify-center gap-3.5">
        <header className="flex shrink-0 items-center gap-4 transition-transform lg:-translate-y-28 xl:-translate-x-10 2xl:-translate-x-24">
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
                event.currentTarget.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gred&backgroundColor=b6e3f4';
              }}
            />
          </motion.div>
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-black tracking-tight text-slate-950 lg:text-5xl"
            >
              Gred <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">Portfolio</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.16 }}
              className="mt-1 text-base font-medium text-slate-500 lg:text-lg"
            >
              数据分析 × AI 产品 × 城市空间应用
            </motion.p>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-3.5 lg:h-[min(31rem,calc(100vh-16rem))] lg:min-h-0 lg:-translate-y-12 lg:grid-cols-2 lg:grid-rows-[minmax(0,1fr)] lg:overflow-hidden">
          {projects.map((project, index) => (
            <div key={project.key} className="min-h-0">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </section>

        <section className="grid shrink-0 translate-y-20 grid-cols-2 gap-3 md:grid-cols-4">
          {capabilities.map((item, index) => (
            <div key={item.title}>
              <CapabilityBar item={item} index={index} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

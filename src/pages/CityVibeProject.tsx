import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Compass,
  FileImage,
  History,
  Layers3,
  MapPin,
  MessageSquareText,
  MousePointer2,
  Navigation,
  PanelRightOpen,
  RefreshCw,
  Route,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Target,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';

type IconType = React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;

type ScreenshotFit = 'phone' | 'wide' | 'compact';

const assets = {
  home: '/cityvibe-home.png',
  loading: '/cityvibe-loading.png',
  trip: '/cityvibe-trip.png',
  actions: '/cityvibe-actions.png',
  detail: '/cityvibe-detail.png',
  replace: '/cityvibe-replace.png',
  ai: '/cityvibe-ai.png',
  journal: '/cityvibe-journal.png',
  floating: '/cityvibe-floating.png',
  exportTable: '/cityvibe-export-table.png',
};

const painPoints = [
  {
    icon: Compass,
    title: '信息分散',
    desc: '内容平台负责种草，地图平台负责导航，OTA 平台负责票务，用户需要在多个应用之间反复切换。',
  },
  {
    icon: ClipboardList,
    title: '攻略难以执行',
    desc: '地点清单不能直接变成路线，缺少时间段、交通方式、预约规则和停留时长等执行字段。',
  },
  {
    icon: RefreshCw,
    title: '现场调整成本高',
    desc: '旅行中常发生停留超时、临时改点和天气变化，整段行程重生成会拖慢使用体验。',
  },
  {
    icon: Share2,
    title: '协作分享不顺畅',
    desc: '同行人需要确认路线和时间表，截图拼接或手动整理文档效率低，也不利于后续复盘。',
  },
];

const workflow = [
  {
    num: '01',
    title: '输入需求',
    desc: '收集城市、日期、偏好、同行关系和预算条件，形成行程生成的基础约束。',
    output: '结构化需求',
  },
  {
    num: '02',
    title: '生成行程',
    desc: '将用户条件转化为生成任务，产出按 Day 组织的候选行程。',
    output: '旅程骨架',
  },
  {
    num: '03',
    title: '校验渲染',
    desc: '校验日期、地点、时间、交通和门票字段，再渲染为卡片、详情抽屉与计划表。',
    output: '可执行界面',
  },
  {
    num: '04',
    title: '执行查看',
    desc: '用户在旅程页查看地点安排，可进入详情、导航、AI 解说或浮动计划页。',
    output: '现场执行',
  },
  {
    num: '05',
    title: '局部调整',
    desc: '只替换单个地点及相关时段，未修改内容保持不动，降低长行程重跑成本。',
    output: '更新方案',
  },
  {
    num: '06',
    title: '导出复用',
    desc: '生成长图式全局计划表，保存到旅程日志，便于分享、恢复和复盘。',
    output: '图片 / 日志',
  },
];

const modules = [
  {
    id: 'A',
    icon: Smartphone,
    title: '移动端入口与需求收集',
    subtitle: '轻量输入，先让用户开始。',
    desc: '首页仅保留目的地、日期和偏好等关键输入，高级条件折叠到下方，避免用户一开始就被复杂表单打断。',
    image: assets.home,
    caption: '首页：目的地、日期、偏好与快捷模板',
    bullets: ['目的地输入', '日期选择', '偏好标签', '随机城市挑战'],
  },
  {
    id: 'B',
    icon: ClipboardList,
    title: '旅程卡片与全局计划表',
    subtitle: '把攻略文本转成可执行计划对象。',
    desc: '旅程页按 Day 分组展示地点、时间、交通、门票、预约和地址，用户不必回到多个平台重新整理。',
    image: assets.trip,
    caption: '旅程页：按 Day 展示地点、时段与执行信息',
    bullets: ['Day 分组', '时段安排', '门票/预约', '地址与交通'],
  },
  {
    id: 'C',
    icon: PanelRightOpen,
    title: '地点详情、导航与 AI 解说',
    subtitle: '从地点卡片进入现场执行。',
    desc: '半屏抽屉补充地点简介、开放规则、游玩建议和导航入口，既不跳出当前行程，也能补足现场决策信息。',
    image: assets.detail,
    caption: '详情抽屉：开放时间、门票规则、AI 解说与导航',
    bullets: ['地点简介', '开放时间', '导航入口', 'AI 解说'],
  },
  {
    id: 'D',
    icon: RefreshCw,
    title: '局部改线与重新规划',
    subtitle: '旅行计划需要局部修补，而不是整段重来。',
    desc: '当用户临时替换单个地点时，系统只更新相关地点和时段，未修改的行程保持稳定，适合真实旅行中的动态变化。',
    image: assets.replace,
    caption: '局部改线：替换单个目的地并保留其他安排',
    bullets: ['单点替换', '局部重排', '保留原计划', '降低等待'],
  },
  {
    id: 'E',
    icon: History,
    title: 'AI 辅助与旅程日志',
    subtitle: '生成之外，保留问答、筛选和回看入口。',
    desc: 'AI 辅助页用于目的地问答和玩法筛选；旅程日志保留近期方案，支持用户恢复、对比和再次查看。',
    image: assets.journal,
    caption: '旅程日志：保存当前方案与历史方案',
    bullets: ['目的地问答', '方案筛选', '历史记录', '恢复查看'],
  },
];

const techLoop = [
  ['用户需求', '城市 / 日期 / 偏好'],
  ['任务封装', '模板约束与上下文'],
  ['模型生成', '多模型并发请求'],
  ['结构校验', '字段完整性检查'],
  ['前端渲染', '卡片 / 抽屉 / 计划表'],
  ['反馈迭代', '改线 / 日志 / 导出'],
];

const valueCards = [
  {
    icon: Target,
    title: '产品设计价值',
    desc: '围绕真实旅行任务组织页面，而不是把 AI 对话框简单放进产品。',
  },
  {
    icon: ShieldCheck,
    title: 'AI 应用价值',
    desc: '把模型生成结果转为可解析、可渲染、可修改的结构化行程数据。',
  },
  {
    icon: FileImage,
    title: '交互展示价值',
    desc: '通过卡片、抽屉、浮动计划页和长图导出承载复杂行程信息。',
  },
];

const dayProtocolSample = `紧凑 DSL 格式：TRIP / DAY / ITEM
TRIP|北京|Asia/Shanghai|2026-05-01|2026-05-03|3

DAY|2026-05-01|1|现代建筑与文创园区
ITEM|2026-05-01|1|1|bj_001|中国国家版本馆|09:00-11:30|需预约|地铁昌平线·十三陵景区站|06:00-17:00|免费|150min|北京市昌平区文瀚路 1 号|TIPS|需提前实名预约，建议跟随讲解参观
ITEM|2026-05-01|1|2|bj_002|醉库国际文化创意园|13:30-15:30|需核实|出租车 / 公交 402 路草场地站|需手动核实|免费|120min|北京市朝阳区草场地甲 8 号|TIPS|园区文艺氛围浓厚，适合拍照打卡

DAY|2026-05-02|2|中轴线与老城文化
ITEM|2026-05-02|2|1|bj_011|天安门广场|09:30-10:30|需预约|地铁 1 号线·天安门东站|05:00-20:30|免费|60min|北京市东城区东长安街|TIPS|需携带身份证实名安检，清晨升旗人气很高`;

const SectionTitle = ({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) => (
  <div className="mb-12 max-w-3xl">
    <div className="mb-4 flex items-center gap-3">
      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black tracking-widest text-orange-600">{number}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-orange-200 to-transparent" />
    </div>
    <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl">{title}</h2>
    {subtitle && <p className="mt-5 text-base leading-8 text-slate-500 md:text-lg">{subtitle}</p>}
  </div>
);

const DayProtocolCard = () => (
  <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
      <div className="text-xs font-black uppercase tracking-[0.24em] text-orange-400">Compact DSL Prompt</div>
      <h3 className="mt-3 text-2xl font-black text-white">紧凑 DSL 提示词</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">
        这是 AI 旅行助手中最具创新性的技术设计：摈弃复杂 JSON 文件格式，改用 TRIP / DAY / ITEM 组成的紧凑 DSL。模型返回更短、更稳定，解析器也能更快把结果转成前端可渲染的数据结构。
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {['替代复杂 JSON 输出', '降低 token 与格式错误', '解析后驱动页面渲染'].map((item) => (
          <div key={item} className="rounded-2xl bg-white/5 px-4 py-3 text-sm font-bold text-slate-200">{item}</div>
        ))}
      </div>
    </div>
    {/* DSL 示例用页面原生文本实现，避免截图缩放后字段不可读。 */}
    <div className="rounded-[1.75rem] border border-white/10 bg-white p-5 text-slate-950">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-black">紧凑 DSL 输出示例</h3>
        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-600">TRIP / DAY / ITEM</span>
      </div>
      <pre className="max-h-[360px] overflow-auto whitespace-pre-wrap break-words rounded-[1.25rem] bg-slate-50 p-4 font-mono text-xs leading-6 text-slate-700">
        {dayProtocolSample}
      </pre>
    </div>
  </div>
);

const Badge: React.FC<{ children: React.ReactNode; tone?: 'orange' | 'dark' | 'blue' | 'green' }> = ({ children, tone = 'orange' }) => {
  const styles = {
    orange: 'bg-orange-50 text-orange-600 ring-orange-100',
    dark: 'bg-slate-950 text-white ring-slate-900',
    blue: 'bg-blue-50 text-blue-600 ring-blue-100',
    green: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ${styles}`}>{children}</span>;
};

const StatCard = ({ value, label, desc }: { value: string; label: string; desc: string }) => (
  <div className="rounded-[1.75rem] border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur">
    <div className="text-3xl font-black tracking-tight text-slate-950">{value}</div>
    <div className="mt-1 text-sm font-black text-orange-600">{label}</div>
    <p className="mt-2 text-xs leading-5 text-slate-500">{desc}</p>
  </div>
);

const PainCard: React.FC<{ icon: IconType; title: string; desc: string; index: number }> = ({ icon: Icon, title, desc, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.04 }}
    className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70"
  >
    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
      <Icon size={22} strokeWidth={2.5} />
    </div>
    <h3 className="text-xl font-black text-slate-950">{title}</h3>
    <p className="mt-3 text-sm leading-7 text-slate-500">{desc}</p>
  </motion.div>
);

const PhoneShot = ({
  src,
  caption,
  fit = 'phone',
  imagePosition = 'top',
  imageShift = '',
}: {
  src: string;
  caption?: string;
  fit?: 'phone' | 'wide' | 'compact';
  imagePosition?: 'top' | 'center' | 'bottom';
  imageShift?: string;
}) => {
  const height = fit === 'wide' ? 'h-[380px] md:h-[440px]' : fit === 'compact' ? 'h-[360px]' : 'h-[520px]';
  const objectFit = fit === 'wide' ? 'object-contain' : 'object-cover';
  const objectPosition = {
    top: 'object-top',
    center: 'object-center',
    bottom: 'object-bottom',
  }[imagePosition];
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/70">
      <div className="overflow-hidden rounded-[1.5rem] bg-slate-50">
        <img src={src} alt={caption || 'CityVibe screenshot'} className={`${height} w-full ${objectFit} ${objectPosition} ${imageShift}`} />
      </div>
      {caption && <p className="mt-3 text-center text-xs font-bold leading-5 text-slate-400">{caption}</p>}
    </div>
  );
};

const ModuleBlock: React.FC<{ module: typeof modules[number]; index: number }> = ({ module, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`grid gap-8 rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[0.92fr_1.08fr] md:p-8 ${index % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}
  >
    <div className="flex flex-col justify-center">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-200">
          <module.icon size={24} strokeWidth={2.4} />
        </div>
        <span className="font-mono text-sm font-black tracking-widest text-orange-500">MODULE {module.id}</span>
      </div>
      <h3 className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">{module.title}</h3>
      <p className="mt-4 text-lg font-bold leading-8 text-orange-600">{module.subtitle}</p>
      <p className="mt-4 text-base leading-8 text-slate-500">{module.desc}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {module.bullets.map((item) => <Badge key={item} tone="blue">{item}</Badge>)}
      </div>
    </div>
    <div className="rounded-[2rem] bg-slate-50 p-4">
      <PhoneShot src={module.image} caption={module.caption} imagePosition={module.id === 'C' ? 'bottom' : 'top'} />
    </div>
  </motion.div>
);

export default function CityVibeProject() {
  return (
    <div className="min-h-screen bg-[#f7f8fb] pt-11 pb-32 font-sans selection:bg-orange-100 selection:text-orange-700">
      <div className="mx-auto max-w-7xl px-6">
        <Link to="/" className="group mb-[41px] inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 transition hover:text-slate-950">
          <ArrowLeft size={18} className="transition group-hover:-translate-x-1" />
          Back to Portfolio
        </Link>

        <header className="relative mb-28 overflow-hidden rounded-[3rem] border border-orange-100 bg-white p-8 shadow-sm md:p-12 lg:p-16">
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-orange-100 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-7 flex flex-wrap gap-3">
                <Badge>V1.0 · 移动端 AI 旅行规划产品</Badge>
                <Badge tone="blue">Product Case Study</Badge>
              </div>
              <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-slate-950 md:text-7xl">
                CityVibe ·<br />
                <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">AI 旅行助手</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-9 text-slate-600">
                将城市、日期、偏好与同行条件转化为可执行、可修改、可分享的行程计划。产品围绕“输入需求—生成行程—执行查看—局部调整—导出复用”构建完整任务闭环。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {['AI 应用', '移动端产品', '旅行规划', '地图导航', '局部改线', '导出分享'].map((tag) => <Badge key={tag}>{tag}</Badge>)}
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                <StatCard value="4" label="核心阶段" desc="输入、生成、执行、导出" />
                <StatCard value="5" label="前台模块" desc="用户可直接感知的产品能力" />
                <StatCard value="6" label="技术链路" desc="从模型生成到前端反馈" />
                <StatCard value="1" label="计划表" desc="长图式结果输出与复用" />
              </div>
            </div>
            <div className="grid gap-5">
              {/* 页头右侧统一为主界面窗口 + 底部输出块，避免多窗口抢占首屏注意力。 */}
              <div className="mx-auto w-full max-w-[470px] rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/70">
                <div className="overflow-hidden rounded-[1.5rem] bg-slate-50">
                  <img src={assets.home} alt="CityVibe 首页" className="h-[360px] w-full object-contain object-center md:h-[400px]" />
                </div>
                <p className="mt-3 text-center text-xs font-bold leading-5 text-slate-400">首页：输入城市、日期与偏好</p>
              </div>
              <div className="flex min-h-[160px] flex-col justify-center rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl shadow-slate-300">
                <div className="text-sm font-bold text-slate-300">核心输出</div>
                <div className="mt-2 text-3xl font-black leading-tight">旅程卡片 + 全局计划表</div>
                <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">将生成结果沉淀为按天组织的行程对象，支持现场查看、局部改线、长图导出与日志复用。</p>
              </div>
            </div>
          </div>
        </header>

        <section className="mb-28" id="position">
          <SectionTitle
            number="01"
            title="产品定位：把旅行信息组织成可执行计划"
            subtitle="用户缺少的不是景点信息，而是把开放时间、预约规则、交通路线、预算和偏好约束快速组织成可执行计划的能力。"
          />
          <div className="grid gap-5 md:grid-cols-4">
            {painPoints.map((item, index) => <PainCard key={item.title} {...item} index={index} />)}
          </div>
          <div className="mt-7 rounded-[2rem] border border-orange-100 bg-orange-50 p-7">
            <div className="mb-3 text-xs font-black uppercase tracking-[0.26em] text-orange-500">Core Product Question</div>
            <p className="text-2xl font-black leading-snug text-slate-950">
              从“去哪儿”进一步回答“什么时候去、怎么串联、是否预约、如何现场执行、如何分享给同行人”。
            </p>
          </div>
        </section>

        <section className="mb-28" id="workflow">
          <SectionTitle
            number="02"
            title="产品链路：从输入到执行的连续闭环"
            subtitle="每一步都有明确输入和输出，避免 AI 结果停留在一段自然语言文本中。"
          />
          <div className="grid gap-4 md:grid-cols-6">
            {workflow.map((item, index) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="relative rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm"
              >
                {index < workflow.length - 1 && <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-slate-200 md:block" />}
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-sm font-black text-white">{item.num}</div>
                <h3 className="font-black text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{item.desc}</p>
                <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-xs font-black text-slate-500">输出：{item.output}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-600">
                <Sparkles size={14} /> 生成阶段反馈
              </div>
              <h3 className="text-2xl font-black text-slate-950">等待不是空白状态，而是任务进度反馈</h3>
              <p className="mt-4 text-base leading-8 text-slate-500">
                长行程生成需要一定时间，页面通过生成中状态提示当前任务正在运行，减少用户等待阶段的不确定感。
              </p>
            </div>
            <PhoneShot src={assets.loading} caption="生成中状态：持续反馈当前任务状态" fit="compact" imagePosition="center" imageShift="-translate-y-5" />
          </div>
        </section>

        <section className="mb-28" id="modules">
          <SectionTitle
            number="03"
            title="功能架构：五大前台功能模块"
            subtitle="功能模块只呈现用户可感知、可操作的产品能力；结构化协议、字段解析和模型调度放在技术实现层说明。"
          />
          <div className="space-y-8">
            {modules.map((module, index) => <ModuleBlock key={module.id} module={module} index={index} />)}
          </div>
        </section>

        <section className="mb-28" id="key-scenes">
          <SectionTitle
            number="04"
            title="关键场景：查看、改线、导出三类高频动作"
            subtitle="把复杂旅行计划拆解为不同执行场景，让用户在移动端完成查看、修改与协作。"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
              <PhoneShot src={assets.floating} caption="浮动计划页：快速查看当天完整安排" fit="compact" imagePosition="bottom" />
              <h3 className="mt-6 text-xl font-black text-slate-950">浮动计划页</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">在长行程页面中快速呼出概览，帮助用户定位下一站和当天节奏。</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
              <PhoneShot src={assets.ai} caption="AI 辅助页：先问想法，再单独生成" fit="compact" />
              <h3 className="mt-6 text-xl font-black text-slate-950">AI 辅助问答</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">用于出发前补充咨询，如玩法思路、预约提醒、天气影响和门票规则。</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
              <PhoneShot src={assets.actions} caption="底部操作：导出、重规划与完整计划表" fit="compact" imagePosition="bottom" />
              <h3 className="mt-6 text-xl font-black text-slate-950">底部操作区</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">把导出图片、重新规划和查看完整计划表放在执行页底部，形成结果复用入口。</p>
            </div>
          </div>
        </section>

        <section className="mb-28" id="tech">
          <SectionTitle
            number="05"
            title="技术实现：生成、解析、渲染与反馈"
            subtitle="技术重点不是简单接入模型，而是让 AI 结果稳定进入页面、支持修改，并最终形成可复用输出。"
          />
          <div className="rounded-[2.25rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300 md:p-8">
            <div className="grid gap-4 md:grid-cols-6">
              {techLoop.map(([title, desc], index) => (
                <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="mb-4 text-xs font-black tracking-widest text-orange-400">{String(index + 1).padStart(2, '0')}</div>
                  <h3 className="font-black text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{desc}</p>
                </div>
              ))}
            </div>
            <DayProtocolCard />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                ['多模型并发', '同一请求可并发调用多种模型，优先选取返回速度快且格式可解析的结果。'],
                ['紧凑 DSL 提示词', '用 TRIP / DAY / ITEM 替代复杂 JSON，让 AI 返回更快、更稳定、更易解析。'],
                ['本地解析与渲染', 'DSL 结果先转为前端可用数据结构，再驱动卡片、抽屉、改线和导出。'],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                  <h3 className="text-xl font-black text-white">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-28" id="output">
          <SectionTitle
            number="06"
            title="导出复用：从个人查看进入同行协作"
            subtitle="导出能力让旅行计划不只停留在“自己看”，而能进入微信、QQ、社交平台和同行确认场景。"
          />
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <PhoneShot src={assets.exportTable} caption="全局计划表：按日期汇总地点、时间、交通、门票与提示信息" fit="wide" />
            <div className="flex flex-col gap-5">
              {[
                { icon: Share2, title: '分享确认', desc: '长图式计划表可直接发送给同行人，减少口头沟通成本。' },
                { icon: Navigation, title: '现场执行', desc: '每个地点都带有时间、交通、门票、地址和 tips，方便照着执行。' },
                { icon: History, title: '方案留存', desc: '计划保存在旅程日志中，可用于恢复、对比和再次使用。' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                    <Icon size={21} />
                  </div>
                  <h3 className="text-xl font-black text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-28" id="value">
          <SectionTitle
            number="07"
            title="作品集价值：展示产品逻辑与 AI 落地能力"
            subtitle="这套作品展示的不是单个界面，而是用户路径、信息架构、AI 结果结构化和移动端执行体验的组合能力。"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {valueCards.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                  <Icon size={22} />
                </div>
                <h3 className="text-2xl font-black text-slate-950">{title}</h3>
                <p className="mt-4 text-base leading-8 text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[2rem] bg-orange-500 p-8 text-white shadow-xl shadow-orange-200">
            <div className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-orange-100">Conclusion</div>
            <p className="text-2xl font-black leading-snug md:text-3xl">
              CityVibe 不是一个聊天窗口，而是一套面向真实旅行场景的“输入—生成—执行—调整—导出”连续产品。
            </p>
          </div>
        </section>

        <footer className="border-t border-slate-200 pt-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-950">CityVibe · AI 旅行助手</h2>
              <p className="mt-2 text-sm text-slate-500">Portfolio Case Study · AI Product Design · Mobile Interaction</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-orange-500">
                返回首页
              </Link>
              <Link to="/reits" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:border-blue-300 hover:text-blue-600">
                查看 REITs 项目 <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

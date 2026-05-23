import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  BarChart3,
  Building2,
  Database,
  FileSpreadsheet,
  GitBranch,
  Layers3,
  LineChart,
  MapPinned,
  Network,
  Puzzle,
  Radar,
  SlidersHorizontal,
  Target,
  TrendingUp,
  Workflow,
} from 'lucide-react';
import { Link } from 'react-router-dom';

type IconType = React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;

type AnalysisCardItem = {
  title: string;
  desc: string;
  img: string;
  tag?: string;
};

const img = {
  home: '/reits-system-home.png',
  app: '/reits-app-window.png',
  dataEntry: '/reits-data-entry.png',
  output: '/reits-output.png',
  fundStats: '/reits-fund-stats.png',
  categorySummary: '/reits-category-summary.png',
  assetDistribution: '/reits-asset-distribution.png',
  riskReturn: '/reits-risk-return.png',
  irrDistribution: '/reits-irr-distribution.png',
  irrPayout: '/reits-irr-payout.png',
  priceRanking: '/reits-price-return-ranking.png',
  irrBubble: '/reits-irr-bubble.png',
  opsPricing: '/reits-ops-pricing.png',
  occupancyYield: '/reits-occupancy-yield.png',
  distributionYield: '/reits-distribution-yield.png',
  turnoverYield: '/reits-turnover-yield.png',
  payoutTurnover: '/reits-payout-turnover.png',
  correlation: '/reits-correlation.png',
  pcaKmeans: '/reits-pca-kmeans.png',
  elbow: '/reits-elbow.png',
  cumulative: '/reits-cumulative-return.png',
  avgCumulative: '/reits-avg-cumulative-return.png',
  intervalDist: '/reits-interval-return-dist.png',
  dispersion: '/reits-cross-section-dispersion.png',
  reportRanking: '/reits-ranking-report.png',
  volatility: '/reits-volatility-matrix.png',
  occupancyBox: '/reits-asset-occupancy-box.png',
  rentBox: '/reits-city-rent-box.png',
  cityIndustry: '/reits-city-industry-heatmap.png',
  projectCluster: '/reits-project-cluster.png',
  clusterCompare: '/reits-cluster-variable-compare.png',
  extendedCluster: '/reits-extended-cluster.png',
  dendrogram: '/reits-dendrogram.png',
  fitScore: '/reits-fit-score.png',
  spatialTier: '/reits-spatial-tier.png',
  spatialHeat: '/reits-spatial-heat.png',
  game: '/reits-game-interface.png',
  sliders: '/reits-sliders.png',
  compliance: '/reits-compliance-cards.png',
  dataPreview: '/reits-data-preview.png',
  install: '/reits-install-list.png',
};

const SectionTitle = ({
  number,
  eyebrow,
  title,
  subtitle,
}: {
  number: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-12">
    <div className="mb-4 flex items-center gap-3">
      <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-black tracking-widest text-white">{number}</span>
      {eyebrow && <span className="text-xs font-black uppercase tracking-[0.24em] text-blue-500">{eyebrow}</span>}
    </div>
    <h2 className="max-w-4xl text-3xl font-black tracking-tight text-slate-950 md:text-5xl">{title}</h2>
    {subtitle && <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-500">{subtitle}</p>}
  </div>
);

const MetricCard = ({ value, label, desc }: { value: string; label: string; desc: string }) => (
  <div className="rounded-[1.75rem] border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur">
    <div className="text-3xl font-black tracking-tight text-blue-600">{value}</div>
    <div className="mt-1 text-sm font-black text-slate-950">{label}</div>
    <p className="mt-2 text-xs leading-5 text-slate-500">{desc}</p>
  </div>
);

const ImagePanel = ({
  src,
  title,
  caption,
  className = '',
  imageClassName = 'h-[320px]',
}: {
  src: string;
  title?: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.45 }}
    className={`overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm ${className}`}
  >
    {title && <h4 className="mb-3 text-sm font-black text-slate-900">{title}</h4>}
    <div className="overflow-hidden rounded-[1.35rem] bg-slate-50">
      <img src={src} alt={title || caption || 'REITs system image'} className={`w-full object-contain object-center ${imageClassName}`} />
    </div>
    {caption && <p className="mt-3 text-xs font-semibold leading-5 text-slate-400">{caption}</p>}
  </motion.div>
);

const IconBlock = ({ icon: Icon, title, desc, tone = 'blue' }: { icon: IconType; title: string; desc: string; tone?: 'blue' | 'green' | 'orange' | 'violet' }) => {
  const toneMap = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    green: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
    violet: 'bg-violet-50 text-violet-600 border-violet-100',
  }[tone];
  return (
    <div className={`rounded-[1.75rem] border bg-white p-6 shadow-sm ${toneMap}`}>
      <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${toneMap}`}>
        <Icon size={24} strokeWidth={2.4} />
      </div>
      <h3 className="text-lg font-black text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-500">{desc}</p>
    </div>
  );
};

const WorkflowStep = ({ num, title, desc }: { num: string; title: string; desc: string }) => (
  <div className="relative rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xs font-black text-white">{num}</div>
    <h4 className="font-black text-slate-950">{title}</h4>
    <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
  </div>
);

const AnalysisCard: React.FC<{ item: AnalysisCardItem }> = ({ item }) => (
  <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
    <div className="mb-4 overflow-hidden rounded-[1.25rem] bg-slate-50">
      <img src={item.img} alt={item.title} className="h-[220px] w-full object-contain object-center" />
    </div>
    <div className="flex items-start justify-between gap-3">
      <h4 className="text-base font-black leading-snug text-slate-950">{item.title}</h4>
      {item.tag && <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black text-blue-600">{item.tag}</span>}
    </div>
    <p className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</p>
  </div>
);

const fundCards: AnalysisCardItem[] = [
  { title: '市场结构与样本基础', desc: '统计基金数量、市值、规模、分派率、IRR、换手率与区间收益率，建立市场基准。', img: img.fundStats, tag: '基础' },
  { title: '资产类型分布', desc: '展示产业园区、仓储物流、保租房、消费基础设施与数据中心等产权类资产结构。', img: img.assetDistribution, tag: '结构' },
  { title: '风险—收益矩阵', desc: '把基金从收益排序扩展为收益、风险、估值和市场接受度的象限判断。', img: img.riskReturn, tag: '矩阵' },
  { title: 'IRR 与派息关系', desc: '观察收益补偿要求与实际分派能力是否同步，识别潜在估值压力。', img: img.irrPayout, tag: '关系' },
  { title: '运营绩效与定价联动', desc: '通过出租率、分派率、IRR、区间收益率等变量识别基本面支撑与折价风险。', img: img.opsPricing, tag: '联动' },
  { title: '相关性 / PCA / KMeans', desc: '压缩多维变量为可解释基金画像，并划分不同市场表现组。', img: img.correlation, tag: '画像' },
];

const dynamicCards: AnalysisCardItem[] = [
  { title: '累计收益率走势', desc: '观察主要资产类型在阶段行情中的收益变化。', img: img.cumulative },
  { title: '平均累计收益率', desc: '比较不同资产类型的时间分化与轮动特征。', img: img.avgCumulative },
  { title: '区间收益分布', desc: '比较不同板块的收益离散度和尾部表现。', img: img.intervalDist },
  { title: '收益—波动矩阵', desc: '识别高波动、高收益和防御型基金位置。', img: img.volatility },
];

const projectCards: AnalysisCardItem[] = [
  { title: '资产业态出租率箱线图', desc: '比较不同资产类型的运营稳定性，为现金流判断提供基础。', img: img.occupancyBox },
  { title: '城市层级租金箱线图', desc: '比较不同城市能级租金差异，解释区位溢价。', img: img.rentBox },
  { title: '城市等级 × 产业类型热力图', desc: '识别更具优势的区位—业态组合，辅助资产筛选。', img: img.cityIndustry },
  { title: '项目层聚类与资产画像', desc: '综合租金、出租率、面积规模和城市能级，形成收益型、规模型和稳定型画像。', img: img.projectCluster },
];

const decisionPaths = ['Pre-REITs 培育', '直接独立上市', '组合打包发行', '扩募注入已有平台'];

const decisionFlow = [
  ['01', '分析结果归集', '基金表现、项目评分、空间热力和聚类结果先进入同一证据面板。'],
  ['02', '情景参数校准', '通过估值、出租率、分派率、政策支持和市场接受度调整判断边界。'],
  ['03', '路径判断输出', '把推荐路径、风险提示和主体收益变化组织为可解释的决策卡。'],
] as const;

export default function REITsProject() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-11 pb-32 font-sans selection:bg-blue-100 selection:text-blue-600">
      <div className="mx-auto max-w-7xl px-6">
        <Link to="/" className="group mb-[41px] inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 transition hover:text-blue-600">
          <ArrowLeft size={18} className="transition group-hover:-translate-x-1" />
          Back to Portfolio
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="relative mb-28 overflow-hidden rounded-[3rem] border border-blue-100 bg-white p-8 shadow-sm md:p-12 lg:p-16"
        >
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-indigo-100 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-7 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 ring-1 ring-blue-100">
                  <FileSpreadsheet size={14} strokeWidth={2.8} /> V1.0 · 城市更新 REITs 决策系统
                </span>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 ring-1 ring-blue-100">
                  Product Case Study
                </span>
              </div>

              <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-slate-950 md:text-7xl">
                城市更新<br />
                <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500 bg-clip-text text-transparent">REITs 决策系统</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-9 text-slate-600">
                将基金市场样本、底层资产与城市更新评价数据整合为可筛选、可分析、可模拟、可导出的 REITs 决策工作台，支撑资产适配、空间识别和上市路径判断。
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {['数据分析', '资产筛选', '空间格局', '上市路径', '扩募决策', '情景模拟'].map((tag) => (
                  <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 ring-1 ring-blue-100">{tag}</span>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                <MetricCard value="53" label="产权类基金" desc="建立收益风险基准" />
                <MetricCard value="128" label="底层资产" desc="覆盖运营与空间字段" />
                <MetricCard value="4" label="分析层级" desc="基金、项目、空间、博弈" />
                <MetricCard value="4" label="路径模式" desc="培育、上市、打包、扩募" />
              </div>
            </div>
            <div className="grid gap-5">
              {/* 页头右侧与 CityVibe 保持同结构：主页面窗口在上，核心输出块在下。 */}
              <div className="mx-auto w-full max-w-[470px] rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/70">
                <div className="overflow-hidden rounded-[1.5rem] bg-slate-50">
                  <img src={img.home} alt="REITs 系统首页" className="h-[360px] w-full object-contain object-center md:h-[400px]" />
                </div>
                <p className="mt-3 truncate text-center text-xs font-bold leading-5 text-slate-400">Dashboard：基金、项目、空间、博弈四层工作台</p>
              </div>
              <div className="flex min-h-[160px] flex-col justify-center rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl shadow-slate-300">
                <div className="text-sm font-bold text-blue-200">核心输出</div>
                <div className="mt-2 text-3xl font-black leading-tight">路径推荐 + 风险提示 + 决策卡</div>
                <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">将基金表现、资产适配、空间识别和参数情景汇总为可解释的路径判断与导出结果。</p>
              </div>
            </div>
          </div>
        </motion.header>

        <section className="mb-36">
          <SectionTitle
            number="01"
            eyebrow="Positioning"
            title="项目背景与产品定位"
            subtitle="城市更新项目具有投入大、周期长、产权关系复杂和现金流形成慢等特点，仅依赖静态测算，难以判断项目是否适合 REITs 化、适合何种上市路径以及不同主体收益如何变化。"
          />
          <div className="grid gap-6 md:grid-cols-3">
            <IconBlock icon={Puzzle} title="痛点：静态分析难以进入决策" desc="传统研究报告能解释现状，却难以跟随估值、出租率、政策支持和市场接受度变化生成路径建议。" />
            <IconBlock icon={Target} title="定位：研究转化型决策工具" desc="以数据整理与统计分析为基础，将结果组织为数据接入、模块分析、情景模拟和决策输出的产品流程。" tone="green" />
            <IconBlock icon={Network} title="对象：全链条博弈主体" desc="适用于地方政府、园区平台、原始权益人、基金管理人和投资机构等不同角色。" tone="violet" />
          </div>
        </section>

        <section className="mb-36">
          <SectionTitle
            number="02"
            eyebrow="Data & Workflow"
            title="数据基础与整体流程"
            subtitle="系统的数据底座包括基金层市场变量、项目层运营变量与空间变量。通过统一字段映射和模块化分析，将静态研究结果延伸为可复用的产品原型。"
          />
          <div className="mb-10 grid gap-8 lg:grid-cols-2">
            <ImagePanel src={img.dataEntry} title="数据录入与分析页" caption="支持字段补充、示例数据和模块化运行" imageClassName="h-[360px]" />
            <ImagePanel src={img.output} title="图像与数据输出页" caption="分析结果集中预览，并支持图表与数据打包导出" imageClassName="h-[360px]" />
          </div>
          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <Workflow className="text-blue-600" />
              <h3 className="text-2xl font-black text-slate-950">产品主流程</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              <WorkflowStep num="01" title="数据接入" desc="Excel / CSV 导入，统一基金、资产和城市空间字段。" />
              <WorkflowStep num="02" title="研究分析" desc="完成描述统计、风险收益、相关性、聚类和空间分析。" />
              <WorkflowStep num="03" title="情景模拟" desc="通过参数滑块调整估值、出租率、分派率和市场接受度。" />
              <WorkflowStep num="04" title="决策输出" desc="生成路径推荐、风险提示、决策卡和导出报告。" />
            </div>
          </div>
        </section>

        <section className="mb-36">
          <SectionTitle
            number="03"
            eyebrow="Research Layer"
            title="研究分析层：从数据描述到结构识别"
            subtitle="研究分析层不是把图表堆在一起，而是围绕基金市场结构、底层资产特征和空间分布规律建立一套可解释的分析证据，为后续路径判断和情景模拟提供依据。"
          />

          <div className="mb-16 rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <LineChart className="text-blue-600" />
              <h3 className="text-2xl font-black text-slate-950">3.1 基金层分析：市场结构、风险收益与定价联动</h3>
            </div>
            <p className="mb-8 max-w-4xl text-sm leading-7 text-slate-500">
              基金层模块首先建立市场基准，再把基金从“收益率排序”扩展为“收益、风险、估值和市场接受度”的综合判断。模块覆盖市场结构、风险—收益矩阵、IRR 分布、派息关系、运营绩效联动、相关性、PCA / KMeans 聚类和动态收益波动。
            </p>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {fundCards.map((item) => <AnalysisCard item={item} key={item.title} />)}
            </div>
          </div>

          <div className="mb-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-black text-slate-950">多变量基金画像</h3>
              <p className="mt-4 text-sm leading-7 text-slate-500">
                相关性热力图展示变量之间的方向与强弱，PCA 用于观察主要信息维度，KMeans 聚类将基金划分为若干市场表现组，便于形成对比结论。
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <ImagePanel src={img.pcaKmeans} title="PCA / KMeans 聚类" imageClassName="h-[190px]" />
                <ImagePanel src={img.elbow} title="聚类肘部图" imageClassName="h-[190px]" />
              </div>
            </div>
            <ImagePanel src={img.correlation} title="基金层关键变量相关性热力图" caption="展示分派率、IRR、收益率、换手率等变量之间的关系" imageClassName="h-[460px]" />
          </div>

          <div className="mb-16 rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <TrendingUp className="text-blue-600" />
              <h3 className="text-2xl font-black text-slate-950">动态收益、波动与组合表现</h3>
            </div>
            <p className="mb-8 max-w-4xl text-sm leading-7 text-slate-500">
              动态行情模块以时间序列方式观察基金表现。相比静态截面，动态模块可以展示不同资产类型在多个阶段中的收益变化、离散程度和波动风险。
            </p>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {dynamicCards.map((item) => <AnalysisCard item={item} key={item.title} />)}
            </div>
          </div>

          <div className="mb-16 rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <Building2 className="text-emerald-600" />
              <h3 className="text-2xl font-black text-slate-950">3.2 项目层分析：经营特征、适配关系与资产画像</h3>
            </div>
            <p className="mb-8 max-w-4xl text-sm leading-7 text-slate-500">
              项目层模块关注底层资产本身，重点变量包括资产类型、城市等级、出租面积、出租率、平均租金和更新属性，用于判断哪些资产具备成为 REITs 底层资产的基础条件。
            </p>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {projectCards.map((item) => <AnalysisCard item={item} key={item.title} />)}
            </div>
            <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                <ImagePanel src={img.clusterCompare} title="不同聚类类别变量对比" imageClassName="h-[220px]" />
                <ImagePanel src={img.dendrogram} title="扩展聚类树状图" imageClassName="h-[220px]" />
              </div>
              <ImagePanel src={img.fitScore} title="城市更新项目 REITs 综合适配性评分" caption="将资产类型、收益代理指标、出租率、市场表现和城市更新属性整合为综合评分" imageClassName="h-[480px]" />
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <MapPinned className="text-violet-600" />
              <h3 className="text-2xl font-black text-slate-950">3.3 空间格局分析：城市层级与资本识别度</h3>
            </div>
            <p className="mb-8 max-w-4xl text-sm leading-7 text-slate-500">
              空间模块用于解释底层资产在全国样本中的分布特征。通过城市层级空间分异图和项目点位核密度图，系统能够识别 REITs 底层资产在不同城市能级中的集中程度，以及更具资本识别度的重点区域。
            </p>
            <div className="grid gap-8 lg:grid-cols-2">
              <ImagePanel src={img.spatialTier} title="城市层级空间分异分析" caption="同时展示城市层级、平均租金与平均出租率" imageClassName="h-[420px]" />
              <ImagePanel src={img.spatialHeat} title="全样本项目空间热力图" caption="展示底层资产在全国范围内的集聚格局" imageClassName="h-[420px]" />
            </div>
          </div>
        </section>

        <section className="mb-36">
          <SectionTitle
            number="04"
            eyebrow="Decision Layer"
            title="博弈决策层：从分析结果到路径判断"
            subtitle="在研究分析层之上，系统进一步构建全链条博弈决策模块。用户通过调整项目估值、资产数量、出租率、现金流稳定性、分派率、产权清晰度、政策支持和市场接受度等变量，观察不同路径下的推荐结果与主体收益变化。"
          />
          <div className="rounded-[2.75rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 md:p-7">
            <div className="grid gap-6">
              {/* 按标注改成单张大图置顶，下面再承接路径判断与参数解释。 */}
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-sm font-black text-slate-950">分析结果总界面</h3>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Evidence Board</span>
                </div>
                <div className="overflow-hidden rounded-[1.5rem] bg-slate-50">
                  <img src={img.game} alt="REITs 博弈决策总界面" className="h-[420px] w-full object-contain object-center md:h-[520px] lg:h-[560px]" />
                </div>
                <p className="mt-3 text-xs font-semibold leading-5 text-slate-400">参数配置、路径推荐、计算逻辑和结果解释集中在同一张主界面图中展示。</p>
              </div>

              <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[2rem] bg-blue-600 p-6 text-white shadow-xl shadow-blue-200">
                  <div className="text-xs font-black uppercase tracking-[0.24em] text-blue-100">Path Logic</div>
                  <h3 className="mt-3 text-2xl font-black">路径推荐逻辑</h3>
                  <p className="mt-3 text-sm leading-7 text-blue-50">系统聚焦四类典型路径，作为结构化、可比对、可解释的辅助判断框架，而不是替代人工决策。</p>
                  <div className="mt-5 grid gap-2.5">
                    {decisionPaths.map((p, i) => (
                      <div key={p} className="rounded-2xl bg-white/10 px-4 py-2.5 text-sm font-bold">{String(i + 1).padStart(2, '0')} · {p}</div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    {decisionFlow.map(([num, title, desc]) => (
                      <div key={title} className="rounded-[1.5rem] border border-blue-100 bg-blue-50/50 p-4">
                        <div className="text-xs font-black tracking-[0.18em] text-blue-500">{num}</div>
                        <h4 className="mt-2 font-black text-slate-950">{title}</h4>
                        <p className="mt-2 text-xs leading-5 text-slate-500">{desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <ImagePanel src={img.sliders} title="参数滑块" caption="支持估值、出租率、分派率等关键变量的情景调整" imageClassName="h-[210px]" className="p-3" />
                    <ImagePanel src={img.compliance} title="合规与市场卡片" caption="以分档方式表达产权清晰度、政策支持和市场接受度等抽象要素" imageClassName="h-[210px]" className="p-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-36">
          <SectionTitle
            number="05"
            eyebrow="Implementation"
            title="技术实现与交付方式"
            subtitle="系统遵循“统一数据输入—统一变量构造—统一分析引擎—统一结果展示”的思路，前端负责页面结构、参数交互和图表展示，分析层封装 Python 统计与可视化代码，数据层负责字段映射、结果缓存与导出。"
          />
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-xl">
              <div className="grid gap-6">
                {[
                  ['展示层', 'Next.js / TypeScript / Tailwind / Recharts', '导航、图表、参数滑块、决策卡与导出按钮。'],
                  ['应用层', 'FastAPI / Pydantic / 本地任务管理', '任务调度、参数传递、项目选择和结果管理。'],
                  ['分析层', 'Pandas / NumPy / SciPy / scikit-learn', '描述统计、PCA、聚类、相关性、ANOVA、卡方检验和评分模型。'],
                  ['数据层', 'Excel / CSV / SQLite / 本地文件缓存', '上传、字段映射、清洗、标准字段字典和结果缓存。'],
                ].map(([layer, stack, desc]) => (
                  <div key={layer} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="text-xs font-black uppercase tracking-[0.22em] text-blue-300">{layer}</div>
                    <h3 className="mt-2 text-lg font-black text-white">{stack}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-6">
              <ImagePanel src={img.dataPreview} title="数据明细表预览" caption="统一字段映射和清洗后的底层资产证据表" imageClassName="h-[300px]" />
              <ImagePanel src={img.install} title="交付方式" caption="支持文件分发、Excel 插件模式与基于 Tauri 的桌面客户端封装" imageClassName="h-[260px]" />
            </div>
          </div>
        </section>

        <section className="mb-36">
          <SectionTitle number="06" eyebrow="Portfolio Value" title="作品价值总结" subtitle="这套系统的价值不只在于完成了一批 REITs 图表或研究结论的整理，更在于展示了“研究—分析—产品化—业务辅助判断”的完整转化过程。" />
          <div className="grid gap-6 md:grid-cols-3">
            <IconBlock icon={Database} title="研究价值" desc="沉淀 REITs 市场、底层资产和空间格局的系统证据，为城市更新资产证券化研究提供可复用框架。" />
            <IconBlock icon={SlidersHorizontal} title="产品价值" desc="把论文分析转化为可交互、可复用的决策辅助工具，能够随参数变化输出路径建议。" tone="orange" />
            <IconBlock icon={Radar} title="求职价值" desc="展示数据分析、产品设计、城市更新金融理解和系统实现能力，适合产品、数据分析和城市科技岗位表达。" tone="green" />
          </div>
          <div className="mt-10 rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-white shadow-xl shadow-blue-200">
            <div className="text-sm font-black uppercase tracking-[0.26em] text-blue-100">Conclusion</div>
            <p className="mt-4 max-w-4xl text-3xl font-black leading-snug">将复杂的 REITs 研究逻辑，转化为可查看、可模拟、可解释、可导出的业务判断系统。</p>
          </div>
        </section>

        <footer className="border-t border-slate-200 pt-16">
          <h2 className="mb-6 text-4xl font-black tracking-tight text-slate-950">演进展望</h2>
          <p className="mb-10 max-w-3xl text-lg leading-8 text-slate-500">
            后续可继续扩展更多资产类型、引入实时市场行情和更细的项目现金流参数，形成面向城市更新项目全链条管理的长期资本决策工作台。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/" className="rounded-full bg-slate-950 px-8 py-4 font-bold text-white transition hover:bg-blue-600">Return to Portfolio</Link>
            <Link to="/cityvibe" className="rounded-full border border-slate-200 bg-white px-8 py-4 font-bold text-slate-950 transition hover:border-orange-500">View AI Assistant</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

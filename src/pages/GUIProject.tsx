import { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import VideoModal from '../components/VideoModal';
import GUIDemoButtons from '../components/GUIDemoButtons';
import { GUI_METRICS, type GUIDemo } from '../data/guiProject';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCheck,
  ClipboardCheck,
  FileJson2,
  FileSpreadsheet,
  GitCompareArrows,
  Layers3,
  Maximize2,
  MessageSquareText,
  MonitorCheck,
  ScanSearch,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';

const asset = (name: string) => `/gui/${name}.webp`;
const sectionClass =
  'mb-10 rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-sm md:mb-12 md:p-10';

// 章节与既有案例保持相同的编号、标题和说明层级，便于跨作品阅读。
function SectionTitle({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-8 md:mb-10">
      <span className="mb-4 inline-flex rounded-full bg-cyan-600 px-3 py-1 text-xs font-black tracking-widest text-white">
        {number}
      </span>
      <h2 className="mb-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
        {title}
      </h2>
      <p className="max-w-3xl text-sm font-medium leading-7 text-gray-500 md:text-base">
        {subtitle}
      </p>
    </div>
  );
}

// 桌面截图完整呈现；原生对话框提供焦点约束、Esc 关闭及键盘访问。
function Screenshot({
  name,
  alt,
  caption,
  eager = false,
  imageClassName = 'h-[260px] md:h-[340px]',
}: {
  name: string;
  alt: string;
  caption: string;
  eager?: boolean;
  imageClassName?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!expanded || !dialog.current) return;
    const previousOverflow = document.body.style.overflow;
    dialog.current.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [expanded]);

  return (
    <figure className="min-w-0 space-y-4">
      <button
        ref={trigger}
        type="button"
        onClick={() => setExpanded(true)}
        aria-label={`放大查看：${alt}`}
        aria-haspopup="dialog"
        className="group relative block w-full overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-600 md:rounded-[2rem] md:p-3"
      >
        <img
          src={asset(name)}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full rounded-xl bg-slate-50 object-contain object-center ${imageClassName}`}
        />
        <span className="absolute bottom-5 right-5 flex items-center gap-1.5 rounded-full bg-slate-950/80 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-sm">
          <Maximize2 size={12} /> 放大查看
        </span>
      </button>
      <figcaption className="min-h-10 px-2 text-center text-xs font-medium leading-5 text-slate-400">
        {caption}
      </figcaption>
      {expanded && (
        <dialog
          ref={dialog}
          aria-labelledby={titleId}
          onCancel={() => setExpanded(false)}
          onClose={() => setExpanded(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setExpanded(false);
          }}
          className="fixed inset-0 m-auto max-h-[94dvh] w-[96vw] max-w-[1700px] overflow-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl backdrop:bg-slate-950/80 md:p-5"
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 id={titleId} className="text-sm font-bold text-slate-900">
              {alt}
            </h3>
            <button
              autoFocus
              type="button"
              aria-label="关闭图片"
              onClick={() => setExpanded(false)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
            >
              <X size={20} />
            </button>
          </div>
          <img
            src={asset(name)}
            alt={alt}
            className="mx-auto h-auto max-h-[78dvh] w-full object-contain"
          />
          <p className="mt-4 text-center text-xs leading-6 text-slate-500">{caption}</p>
        </dialog>
      )}
    </figure>
  );
}

const auditStages = [
  {
    title: '本地预处理',
    label: '确定性规则',
    desc: '先核对任务身份、JSON 结构、截图映射、尺寸与标注几何。',
  },
  {
    title: 'JSON 综合轮',
    label: '文字与逻辑',
    desc: '检查 Query、字段规范、步骤衔接及动作描述的一致性。',
  },
  {
    title: '原图分批轮',
    label: '视觉证据',
    desc: '分批核验 APP、界面状态与动作类型，结合后续截图判断结果。',
  },
  {
    title: '全局终审',
    label: '任务目标',
    desc: '合并候选问题，回到完整轨迹，检查跨步骤与整体目标的一致性。',
  },
  {
    title: '结果复检',
    label: '建议可执行性',
    desc: '再次核对误报、问题定位与建议值，形成可供人工复核的清单。',
  },
];

const repairStages = [
  ['冻结原始输入', '保存原始 JSON 与文件字节，核对待修复数据和检查结果是否一致。'],
  ['建立授权白名单', '将已确认的问题映射到唯一、已存在的 JSON Pointer。'],
  ['审计候选值', '检查类型、字段语义、目标值完整性，拒绝冲突与越权建议。'],
  ['模拟并核对差异', '只允许同一步、同一字段的最小变更，先预览真实 diff。'],
  ['原子写入与写后复核', '重新读取源文件比对实际差异；校验失败时恢复原始字节。'],
];

export default function GUIProject() {
  const [activeDemo, setActiveDemo] = useState<GUIDemo | null>(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-24 font-sans selection:bg-cyan-100 selection:text-cyan-600 md:pb-32">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <Link
          to="/"
          className="group mb-8 inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-cyan-600"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span className="text-xs font-black uppercase tracking-widest">Back to Portfolio</span>
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 overflow-hidden rounded-[2.5rem] border border-cyan-100 bg-gradient-to-br from-white via-white to-cyan-100/70 p-6 shadow-sm md:p-10 lg:p-12"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="min-w-0">
              <GUIDemoButtons onPlayDemo={setActiveDemo} className="mb-8 max-w-sm" />
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[10px] font-bold text-cyan-700">
                  <MonitorCheck size={12} /> GUI 轨迹质检与受控修复
                </span>
                <span className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[10px] font-bold text-cyan-700">
                  Product Case Study 01
                </span>
              </div>
              <h1 className="text-4xl font-black leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-5xl xl:text-6xl">
                GUI 操作轨迹
                <br />
                <span className="bg-gradient-to-r from-cyan-700 via-cyan-500 to-teal-400 bg-clip-text text-transparent">
                  质检与受控修复
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-sm font-medium leading-8 text-slate-600">
                将任务目标、操作 JSON 与逐步截图组织为可预览、可检查、可修复的桌面工作台，
                用本地规则与分轮 AI 定位问题，经人工确认后完成受控修改与结果交接。
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['桌面工具', '多模态质检', 'Skill 工作流', '人工复核', '受控修复'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[10px] font-bold text-cyan-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <dl className="mt-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
                {[
                  [GUI_METRICS.processed, '处理数据', '批量任务与操作轨迹'],
                  ['2 套', '独立 Skill', '检查与修改解耦'],
                  ['5 阶段', '质量核验', '规则、语义与视觉'],
                  ['Excel', '结果交接', '清单与处理反馈'],
                ].map(([value, label, detail]) => (
                  <div
                    key={label}
                    className="rounded-[1.5rem] border border-white/80 bg-white/80 p-4 shadow-sm"
                  >
                    <dd className="text-2xl font-black tracking-tight text-cyan-600">{value}</dd>
                    <dt className="mt-1 text-xs font-bold text-slate-950">{label}</dt>
                    <p className="mt-2 text-[11px] leading-5 text-slate-500">{detail}</p>
                  </div>
                ))}
              </dl>
            </div>
            <div className="grid min-w-0 gap-5">
              <Screenshot
                name="overview"
                alt="GUI 质检工具桌面工作台总览"
                caption="工作台：任务、证据预览、批次状态与结果清单"
                imageClassName="h-[240px] sm:h-[300px] lg:h-[340px]"
                eager
              />
              <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl shadow-slate-200 md:p-7">
                <p className="text-xs font-bold text-cyan-200">核心输出</p>
                <h2 className="mt-3 text-2xl font-black leading-snug">
                  问题定位 + 受控修复 + 交付清单
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  让检查结论落到具体 TASK、步骤和字段，让每一次修改都能回到证据与授权边界。
                </p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* 先交代业务矛盾与产品定位，再展示界面，延续现有案例的叙述顺序。 */}
        <section className={sectionClass}>
          <SectionTitle
            number="01"
            title="项目背景与产品定位"
            subtitle="一条 GUI 轨迹是否合格，需要任务目标、动作描述和屏幕证据共同成立。批量交付时，人工需要反复切换文件，通用模型又受图像数量、上下文和调用成本限制。"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: ScanSearch,
                title: '痛点：多份证据难以对齐',
                text: '文字与动作不匹配、APP 状态判断错误、步骤缺失或截图对应异常，都需要回到具体步骤核查。',
              },
              {
                icon: MonitorCheck,
                title: '定位：可复核的质检工作台',
                text: '面向数据制作、质检、复核和交付人员，将任务发现、证据预览、问题定位与结果交接组织成一条流程。',
              },
              {
                icon: ShieldCheck,
                title: '原则：检查与修改分离',
                text: '先只读检查并保留证据，再由人确认修改范围。把低成本模型的能力放进可校验、可追踪的边界内。',
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl md:p-8"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                  <Icon size={27} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{title}</h3>
                <p className="text-sm leading-7 text-gray-500">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="workbench" className={`${sectionClass} scroll-mt-24`}>
          <SectionTitle
            number="02"
            title="桌面工作台：从任务目录到问题清单"
            subtitle="沿着“选择任务—核对证据—发起检查—阅读问题—决定修改”的顺序，呈现当前阶段、失败状态和可操作的结果。"
          />
          <div className="mb-12 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {[
              ['任务导入', '自动发现 TASK'],
              ['证据预览', 'JSON / 原图核对'],
              ['分批检查', '进度与异常可见'],
              ['问题复核', '定位步骤与字段'],
              ['修复交接', '受控写入 / Excel'],
            ].map(([title, text], index) => (
              <div key={title} className="rounded-2xl border border-gray-100 bg-white p-5">
                <span className="font-mono text-sm font-bold text-cyan-600">0{index + 1}</span>
                <h3 className="mt-3 text-sm font-bold">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-gray-500">{text}</p>
              </div>
            ))}
          </div>
          <div className="space-y-8 md:space-y-10">
            <div className="grid items-center gap-8 rounded-[2rem] border border-slate-100 bg-slate-50/60 p-5 md:p-7 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <h3 className="mb-4 text-2xl font-bold">任务与批次集中管理</h3>
                <p className="text-sm leading-7 text-gray-500">
                  导入任务根目录后，自动识别 TASK、task.json
                  和逐步截图。通过任务树与勾选框选择检查对象，按批次跟踪运行状态，减少在文件夹之间逐个切换的成本。
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-xs font-bold text-cyan-700">
                  <Layers3 size={15} /> 任务—步骤—图片，对应关系可回查
                </div>
              </div>
              <Screenshot
                name="open-folder"
                alt="选择任务根目录并自动发现 TASK"
                caption="图 2 · 任务入口：选择根目录，统一加载待检查任务。"
              />
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-bold">让结构化文本与视觉事实相互印证</h3>
              <p className="mb-8 max-w-3xl text-sm leading-7 text-gray-500">
                同一预览区可切换 JSON
                与原始截图。当前截图代表该步动作执行前的状态，动作是否生效需要结合后续截图判断；缺失的证据会进入人工处理清单。
              </p>
              <div className="grid items-stretch gap-6 md:grid-cols-2">
                <Screenshot
                  name="json-preview"
                  alt="任务树与 task.json 结构化文件预览"
                  caption="图 3 · 文件预览：核对 Query、步骤描述与 Action 字段。"
                />
                <Screenshot
                  name="image-preview"
                  alt="任务树与逐步原始截图预览"
                  caption="图 4 · 原图预览：回到操作发生时的真实屏幕状态。"
                />
              </div>
            </div>
            <div className="grid items-stretch gap-6 md:grid-cols-2">
              <Screenshot
                name="check-results"
                alt="按 TASK 汇总的检查结果与处理状态"
                caption="图 5 · 结果表：按任务组织检查状态、批次与问题摘要。"
              />
              <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm md:p-8">
                <FileSpreadsheet className="mb-5 text-cyan-600" size={28} />
                <h3 className="mb-4 text-2xl font-bold">结果可定位，也可交接</h3>
                <p className="text-sm leading-7 text-gray-500">
                  一条 TASK
                  对应一行结果。展开后查看具体步骤、字段、原因与建议值，允许人工编辑意见。检查问题与修改反馈分别记录，复制和
                  Excel 导出用于批次验收与复核交接。
                </p>
                <ul className="mt-6 space-y-3 text-sm text-gray-600">
                  {[
                    '具体到 TASK、步骤和字段',
                    '保留原因、证据与唯一建议值',
                    '支持人工修订意见与 Excel 导出',
                  ].map((text) => (
                    <li key={text} className="flex gap-2">
                      <Check size={17} className="mt-0.5 shrink-0 text-cyan-600" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 将技术机制放回具体问题，说明分轮设计如何适配模型能力与成本。 */}
        <section className={sectionClass}>
          <SectionTitle
            number="03"
            title="检查 Skill：分阶段建立判断依据"
            subtitle="规则性检查交给本地程序，需要语义与视觉理解的部分交给模型，再回到完整任务做终审与复检，避免一次输入过多图片。"
          />
          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {auditStages.map((stage, index) => (
              <div
                key={stage.title}
                className="flex flex-col rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-sm"
              >
                <span className="mb-5 font-mono text-lg font-bold text-cyan-600">0{index + 1}</span>
                <h3 className="mb-3 text-base font-bold">{stage.title}</h3>
                <p className="flex-1 text-sm leading-6 text-gray-500">{stage.desc}</p>
                <div className="mt-6 border-t border-gray-100 pt-4 text-xs font-bold text-cyan-600">
                  {stage.label}
                </div>
              </div>
            ))}
          </div>
          <div className="grid items-start gap-6 lg:grid-cols-2">
            <Screenshot
              name="issue-detail"
              alt="检查详情展示具体 action.data 字段问题及建议值"
              caption="图 6 · 问题详情：从笼统的质检评语，落到可复核的字段建议。"
            />
            <div className="space-y-6">
              <div className="rounded-[2rem] bg-cyan-600 p-7 text-white md:p-8">
                <FileJson2 className="mb-5" size={28} />
                <h3 className="mb-4 text-xl font-bold">以 action.data 为例</h3>
                <p className="text-sm leading-7 text-cyan-100">
                  当动作类型为 type 时，action.data
                  应记录实际输入的文本。检查详情会区分“操作对象”和“输入内容”，并给出单一、可复核的建议值，供人工确认。
                </p>
                <div className="mt-5 rounded-xl border border-white/15 bg-white/10 p-4 text-sm leading-7">
                  <span className="text-cyan-200">定位字段</span>
                  <br />
                  <code>步骤 3 · action.data</code>
                  <br />
                  <span className="text-cyan-100">输入框名称 → 具体输入内容</span>
                </div>
              </div>
              <p className="px-1 text-xs leading-6 text-gray-500">
                图像按模型能力分批输入，检查设计参考每次最多 12
                张图；这是当前工作流的输入约束。证据不足的候选问题需保留不确定性，交由人工核验。
              </p>
            </div>
          </div>
        </section>

        <section className={sectionClass}>
          <SectionTitle
            number="04"
            title="修改 Skill：让每一次写入都有边界"
            subtitle="检查负责发现问题，修改负责执行已确认的最小变更。授权依据来自问题定位和现存字段，写入前后均由本地程序核对真实差异。"
          />
          <div className="mb-12 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-3">
              {repairStages.map(([title, description], index) => (
                <div
                  key={title}
                  className="flex gap-5 rounded-2xl border border-gray-100 bg-white p-6"
                >
                  <span className="pt-0.5 font-mono text-sm font-bold text-cyan-600">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="mb-2 text-base font-bold">{title}</h3>
                    <p className="text-sm leading-6 text-gray-500">{description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-[2rem] bg-slate-950 p-7 text-white md:p-8">
              <ShieldCheck className="mb-6 text-cyan-300" size={30} />
              <h3 className="mb-7 text-2xl font-bold">只改同一步、同一字段</h3>
              <div className="space-y-7">
                <div>
                  <h4 className="mb-2 text-sm font-bold text-cyan-300">允许修改</h4>
                  <p className="text-sm leading-7 text-slate-300">
                    已授权、定位唯一且建议值明确的 Query、步骤文字、APP 和 Action 字符串字段。
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-bold text-cyan-300">保持原状</h4>
                  <p className="text-sm leading-7 text-slate-300">
                    截图、数组结构、未知字段与任何超出白名单的内容。
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-bold text-orange-300">交回人工</h4>
                  <p className="text-sm leading-7 text-slate-300">
                    缺图、需要重新执行 GUI、证据不足或无法安全定位的问题。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid items-center gap-8 rounded-[2rem] border border-slate-100 bg-slate-50/60 p-5 md:p-7 lg:grid-cols-[1.1fr_0.9fr]">
            <Screenshot
              name="repair-results"
              alt="修改结果与独立的修复反馈记录"
              caption="图 7 · 修改反馈：展示本次处理结果，保留仍需人工处理的问题。"
            />
            <div>
              <GitCompareArrows className="mb-5 text-cyan-600" size={30} />
              <h3 className="mb-4 text-2xl font-bold">从建议值到可审计变更</h3>
              <p className="text-sm leading-7 text-gray-500">
                修复不是在生成结果后直接覆盖文件。问题先经过人工确认，再生成字段级白名单与模拟差异；写后重新读回文件，防止模型或序列化过程带入额外修改。
              </p>
            </div>
          </div>
        </section>

        {/* 降本价值集中在一个章节说明，保持整篇案例以产品工作流为主线。 */}
        <section className="mb-10 rounded-[2.5rem] border border-cyan-100 bg-cyan-50/60 p-6 shadow-sm md:mb-12 md:p-10">
          <SectionTitle
            number="05"
            title="降低质检成本"
            subtitle="在保留人工复核与质量边界的前提下，将重复性工作交给本地规则、低成本模型和批量操作台，从调用、核查与返工三个环节减少额外投入。"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [
                '本地规则分担检查',
                '文件身份、JSON 结构、截图映射与尺寸等确定性问题在本地核验，减少无需模型理解的调用。',
              ],
              [
                '分轮适配低成本模型',
                '将文字逻辑、原图核验与全局复检拆开，控制单次上下文和图片规模，让低能力模型承担边界清晰的检查任务。',
              ],
              [
                '集中复核与受控修复',
                '直接定位 TASK、步骤与字段，减少人工翻查；对已确认问题执行最小修改，并通过写后复核控制误改返工。',
              ],
            ].map(([title, description], index) => (
              <div key={title} className="rounded-2xl border border-cyan-100 bg-white p-6">
                <span className="font-mono text-sm font-bold text-cyan-600">0{index + 1}</span>
                <h3 className="mb-3 mt-5 text-lg font-bold text-gray-900">{title}</h3>
                <p className="text-sm leading-7 text-gray-500">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[2rem] bg-slate-950 p-6 text-white md:p-8">
            <p className="text-sm font-bold text-cyan-200">质检与修改成效</p>
            <p className="mt-3 text-base leading-8 text-slate-200">
              使检查与修改准确率达 <strong className="text-white">{GUI_METRICS.accuracy}</strong>，
              质检与修改成本为 <strong className="text-white">{GUI_METRICS.costLabel}数据</strong>。
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <dd className="text-3xl font-black text-cyan-300 md:text-4xl">
                  {GUI_METRICS.accuracy}
                </dd>
                <dt className="mt-2 text-xs font-bold text-slate-200">检查与修改准确率</dt>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <dd className="text-3xl font-black text-cyan-300 md:text-4xl">
                  {GUI_METRICS.cost}
                  <span className="ml-1 text-sm font-bold">元/条</span>
                </dd>
                <dt className="mt-2 text-xs font-bold text-slate-200">质检与修改成本</dt>
              </div>
            </dl>
          </div>
        </section>

        <section className={sectionClass}>
          <SectionTitle
            number="06"
            title="项目协同与个人贡献"
            subtitle="在 2026 年 7—9 月的海天瑞声项目助理实习中，参与 GUI/MCP 数据生产与质量推进，并独立开展桌面平台及两套 Skill 的设计开发。"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: MessageSquareText,
                title: '需求对接与规范整理',
                text: '参与客户会议，将数据制作要求、特殊场景与验收反馈拆成可检查的步骤和字段要求，编写质检与操作说明。',
              },
              {
                icon: Users,
                title: '批次核验与问题回流',
                text: '参与采集、人工质检和修改反馈，将问题定位到 TASK 与步骤，区分可改文字、需补图和需重做操作的事项。',
              },
              {
                icon: ClipboardCheck,
                title: '独立工具设计与开发',
                text: '将重复质检经验沉淀为本地规则、检查 Skill 和修改 Skill，完成 PySide6 操作台，串联进度、证据、修复与 Excel 交接。',
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm md:p-8"
              >
                <Icon size={28} className="mb-6 text-cyan-600" />
                <h3 className="mb-3 text-xl font-bold">{title}</h3>
                <p className="text-sm leading-7 text-gray-500">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 已完成能力与后续迭代分开呈现，便于理解当前产品边界。 */}
        <section className={sectionClass}>
          <SectionTitle
            number="07"
            title="已完成成果与后续验证"
            subtitle="交付的是一套可批量处理、可追溯问题、可受控修改的桌面流程。运行状态和模型效果分别记录，让下一步验证有明确依据。"
          />
          <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm md:p-8">
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                  <CheckCheck className="text-cyan-600" /> 已实现的产品能力
                </h3>
                <ul className="space-y-4 text-sm leading-7 text-gray-500">
                  {[
                    '任务目录扫描、JSON / 原图预览与可选 TASK 检查。',
                    '分批运行、进度与失败日志、问题详情编辑及 Excel 导出。',
                    '检查与修改 Skill 解耦，字段白名单、最小修改与写后复核。',
                  ].map((text) => (
                    <li key={text} className="flex gap-3">
                      <Check size={18} className="mt-1 shrink-0 text-cyan-600" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[2rem] border border-cyan-100 bg-cyan-50 p-7 md:p-8">
                <h3 className="mb-3 text-lg font-bold text-cyan-900">
                  把验证作为下一阶段的产品工作
                </h3>
                <p className="text-sm leading-7 text-cyan-800">
                  以人工确认的 TASK 建立统一对照集，分别统计问题检出率、误报率、修改正确率、
                  人工回流比例与越权拦截情况，并完善异常恢复和多模型切换。
                </p>
              </div>
            </div>
            <div className="mx-auto w-full max-w-sm">
              <Screenshot
                name="run-log"
                alt="批次进度、失败状态与运行日志"
                caption="图 8 · 运行日志：用于定位批次失败与输出异常，支撑回查与后续迭代。"
                imageClassName="h-[400px] md:h-[460px]"
              />
            </div>
          </div>
        </section>

        <footer className="rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-cyan-600">
            Product Reflection
          </p>
          <h2 className="mb-5 text-3xl font-bold tracking-tight md:text-4xl">
            把质检经验，沉淀为可复用的工作流。
          </h2>
          <p className="mb-10 max-w-3xl text-base leading-8 text-gray-500">
            这段实践将客户需求、数据证据与质量规则串联起来，也让我更重视 AI 产品中的任务拆解、
            人工决策和写入边界：让模型参与实际生产，让每一个结论与改动都能回到证据。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="rounded-full bg-gray-900 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-cyan-600"
            >
              返回作品集
            </Link>
            <Link
              to="/reits"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-bold text-gray-900 transition hover:border-cyan-500"
            >
              下一个作品 · REITs <ArrowRight size={16} />
            </Link>
          </div>
        </footer>
      </div>
      <VideoModal
        open={Boolean(activeDemo)}
        src={activeDemo?.src || ''}
        title={activeDemo?.title || ''}
        description={activeDemo?.description}
        tone="cyan"
        onClose={() => setActiveDemo(null)}
      />
    </div>
  );
}

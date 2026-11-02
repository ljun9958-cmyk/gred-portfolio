// GUI 的展示指标和演示来源集中维护，保证首页、详情页与弹窗一致。
export const GUI_METRICS = {
  processed: '1,400+',
  accuracy: '90%',
  cost: '0.2',
  costLabel: '0.2 元/条',
} as const;

export const GUI_DEMOS = [
  {
    id: 'check',
    label: '查看检查演示',
    src: '/videos/gui-check-demo.mp4',
    title: 'GUI 质检工具 · 检查演示',
    description: '演示任务导入、证据预览、分批检查与问题定位。',
    tone: 'cyan',
  },
  {
    id: 'repair',
    label: '查看修改演示',
    src: '/videos/gui-repair-demo.mp4',
    title: 'GUI 质检工具 · 修改演示',
    description: '演示确认检查结果、按结果修改 JSON 与查看修改反馈。',
    tone: 'cyan',
  },
] as const;

export type GUIDemo = (typeof GUI_DEMOS)[number];

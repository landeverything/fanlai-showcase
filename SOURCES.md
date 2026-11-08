# 内容依据与素材来源

核对日期：2026-11-08（北京时间）。来源说明不作为真实经营证明。

## 产品与组织事实

- 当前饭来：`https://fanlaiweb.zeabur.app/`，迁移后的域名由用户提供。重绘参考迁移前登录既有演示账号核对的娱乐广场、规划、活动详情、消息、个人页/月卡和移动端布局。
- 公司入口：`/company/workspace`，通过现有授权进入当前 Paperclip。公司名为饭来有限责任公司；总览显示 14 位员工，包含 13 位业务 Agent 与 HR 与技能进化岗位。按用户要求把 HR 纳入正式组织图，直属 CEO；本展示站不表示员工实时运行状态。
- 本地 `Fanlai-pwa/docs/agents/opc/organization.json`、`WORKFLOW.md`、`README.md`：13 个业务岗位的职责、汇报关系、任务依赖、交接与 CEO 验收。展示用名单保存在 `assets/organization-source.json`；HR 职责及直属关系补充依据 `Fanlai-judge-guide/docs/HR_SKILL_EVOLUTION.md` 与 `backend/src/config/agent-roster.json`。
- 订阅以 2026-11-08 迁移前核对的线上 `/profile#membership` 的「饭来 VIP」页面为准（本地旧 checkout 尚未同步）：¥9.9/月、首月同价、手动续订、不自动扣款。普通/VIP 每月参加活动 3/30、AI 日程 3/30、发布活动 2/10、邀请 10/100；筛选五类任选一类/自由组合，候选 10/50 人，自己发起活动最多 6/50 人与 3/12 站；VIP 含闪光头像。自然月按北京时间重置，升级保留已用量。仅核对页面和展开规则，未开通订阅或触发支付。
- 实际仓库入口：`http://10.30.10.107/hackathon/fanlai`，需要相应网络与访问权限。

## 重绘界面

- 以本次浏览器核对的实际页面与页面 DOM 为主要参考，结合本地 `web/src/pages/`、`layouts/`、`components/` 现有前端实现。
- 六个 App 场景自动循环，用本地 HTML/CSS/JavaScript 重绘；没有用录屏或截图充当最终 App 界面。例子与动效用于讲解实际操作顺序，不能视为实时执行。
- 地图采用项目 `web/public/maps/city-schematic.svg`，标为重绘示意，不提供导航准确性保证。
- 活动、模板、会话与月卡内容取自当前演示产品并适当压缩排版；经营数据不据此推定为真实注册、收入或已完成业务。
- 营销页风格参考 `https://www.notion.com/` 与用户参考截图；按用户要求改为紫白主题，保留白底、粗标题、紫色主按钮、插画和局部彩色动效，没有使用 Notion 商标、专有插画或脚本。

## 图像与图标

- 饭来品牌：项目 `web/public/icons/fanlai-icon.svg`，饭碗与两个饭团的原始矢量图。
- Boss：根据用户指定形象，在现有头像库定位到 `web/public/avatars/open-peeps/34.svg`，并与线上演示 Boss 的实际头像路径核对。本站 `assets/ceo.svg` 与原文件一致；保留原色。
- 人物插画：项目已有 Open Peeps 素材，Pablo Stanley，CC0，`https://www.openpeeps.com/`。保留少量演示搭子头像；Agent 员工不使用这组头像。
- Agent 果冻头像：用户指定的当前 Paperclip `cap-v1` 系列。原始资源 `/api/agent-avatars/cap-v1/{palette}/rest.png?size=256&scale=1`，按当前各岗位实际配色保存到 `assets/jelly/`，对应表在 `assets/avatar-source.json`。素材原样复用，呼吸/弹跳由本站 CSS 实现，并遵循 reduced-motion。
- 照片、餐碗/骰子/星光等贴纸：复用项目 `web/public/photos/`、`web/public/stickers/` 原素材。
- 界面线性图标：由项目已有 `lucide-react` 渲染成 SVG，Lucide，ISC License，`https://lucide.dev/license`。
- 首页外层人物场景为本站现有原创线稿 SVG。手机外壳由 CSS 绘制，手机内是对应移动端结构的 HTML。

## 模拟材料

6 条代表性日志、44 小时流水、首单、使用量及费用均为手工编排的样例，保留明确模拟标识。按新版单价更新为 18 笔 × ¥9.9 = ¥178.20，假设成本仍为 ¥10.80，差额 ¥167.40 未计人工与获客。没有将这些样例称为实际 40+ 小时经营、真实成交或模型账单。

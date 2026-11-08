// 明确标注的模拟经营样例，不代表真实运行。
window.FANLAI_DATA = {
  "simulation": true,
  "spanHours": 44,
  "registrations": 84,
  "signups": 26,
  "logs": [
    {
      "id": "SIM-RUN-001",
      "simulation": true,
      "hour": "00:20",
      "agent": "product",
      "title": "把 6 人周末局拆成可交付任务",
      "summary": "目标、预算和活动草稿要求已交给两位员工。",
      "status": "done",
      "input": "CEO 的场景要求：上海，6 人，人均预算 150 元。",
      "steps": [
        "读取目标与参考资料",
        "拆分活动和设计子任务",
        "记录草稿要求与验收标准"
      ],
      "artifact": "活动任务清单",
      "handoff": "产品研究与设计 / 活动策划与运营"
    },
    {
      "id": "SIM-RUN-003",
      "simulation": true,
      "hour": "03:10",
      "agent": "activity_ops",
      "title": "保存咖啡与桌游三站行程",
      "summary": "三站草稿已写入示例成果，等待部长检查。",
      "status": "done",
      "input": "6 人、150 元预算，先生成草稿。",
      "steps": [
        "查询场景地点候选",
        "编排咖啡、桌游、聚餐三站",
        "核对单日时间与预算"
      ],
      "artifact": "模拟活动草稿 FL-DEMO-001",
      "handoff": "产品与活动部长"
    },
    {
      "id": "SIM-RUN-006",
      "simulation": true,
      "hour": "07:25",
      "agent": "quality_ops",
      "title": "检查报名与名额展示路径",
      "summary": "示例核对涵盖加入、重复加入与满员反馈。",
      "status": "done",
      "input": "报名功能交付说明及原始验收要求。",
      "steps": [
        "检查三种用户路径",
        "记录结果与未验证项",
        "提交验收结论"
      ],
      "artifact": "模拟验收记录",
      "handoff": "技术部长"
    },
    {
      "id": "SIM-RUN-013",
      "simulation": true,
      "hour": "19:00",
      "agent": "analyst",
      "title": "复盘首轮报名与兴趣分布",
      "summary": "示例：新增 32 位注册用户、10 人报名。",
      "status": "done",
      "input": "场景数据：H+00 至 H+19。",
      "steps": [
        "读取示例漏斗",
        "区分注册和报名",
        "提出下一轮招募建议"
      ],
      "artifact": "第一轮模拟经营报告",
      "handoff": "经营增长部长"
    },
    {
      "id": "SIM-RUN-016",
      "simulation": true,
      "hour": "28:00",
      "agent": "growth_worker",
      "title": "整理合作场地候选",
      "summary": "场地联系人未接入，尚未发生商务外联。",
      "status": "blocked",
      "input": "下一场活动的地点与容量需求。",
      "steps": [
        "整理候选要求",
        "识别联系人数据缺口",
        "提交需人工补充的清单"
      ],
      "artifact": "待补充：真实场地联系人",
      "handoff": "经营增长部长 / CEO"
    },
    {
      "id": "SIM-RUN-022",
      "simulation": true,
      "hour": "44:00",
      "agent": "finance",
      "title": "提交最终模拟收支报表",
      "summary": "18 笔模拟 VIP 订单，金额 ¥178.20，模型与运营成本 ¥10.80。",
      "status": "review",
      "input": "44 小时场景流水。",
      "steps": [
        "核对 18 笔模拟订单",
        "汇总成本 ¥10.80",
        "区分收支差额和净利润"
      ],
      "artifact": "模拟财务报告",
      "handoff": "CEO"
    }
  ],
  "ledger": [
    {
      "id": "SIM-ORDER-001",
      "hour": "12:30",
      "title": "饭来 VIP 月卡 · 第一笔模拟开通",
      "type": "income",
      "nature": "模拟交易",
      "amount": 990,
      "orders": 1,
      "owner": "财务部长"
    },
    {
      "id": "SIM-BATCH-002",
      "hour": "18:00",
      "title": "饭来 VIP 月卡 · 3 笔模拟开通",
      "type": "income",
      "nature": "模拟交易",
      "amount": 2970,
      "orders": 3,
      "owner": "财务部长"
    },
    {
      "id": "SIM-BATCH-003",
      "hour": "26:00",
      "title": "饭来 VIP 月卡 · 4 笔模拟开通",
      "type": "income",
      "nature": "模拟交易",
      "amount": 3960,
      "orders": 4,
      "owner": "财务部长"
    },
    {
      "id": "SIM-BATCH-004",
      "hour": "36:00",
      "title": "饭来 VIP 月卡 · 5 笔模拟开通",
      "type": "income",
      "nature": "模拟交易",
      "amount": 4950,
      "orders": 5,
      "owner": "财务部长"
    },
    {
      "id": "SIM-BATCH-005",
      "hour": "43:00",
      "title": "饭来 VIP 月卡 · 5 笔模拟开通",
      "type": "income",
      "nature": "模拟交易",
      "amount": 4950,
      "orders": 5,
      "owner": "财务部长"
    },
    {
      "id": "SIM-COST-001",
      "hour": "44:00",
      "title": "输入 Token · 3.2 百万 × ¥1/百万",
      "type": "cost",
      "nature": "假设费用",
      "amount": 320,
      "owner": "财务部长"
    },
    {
      "id": "SIM-COST-002",
      "hour": "44:00",
      "title": "输出 Token · 0.8 百万 × ¥4/百万",
      "type": "cost",
      "nature": "假设费用",
      "amount": 320,
      "owner": "财务部长"
    },
    {
      "id": "SIM-COST-003",
      "hour": "44:00",
      "title": "其他运营 · ¥0.10/小时 × 44 小时",
      "type": "cost",
      "nature": "假设费用",
      "amount": 440,
      "owner": "财务部长"
    }
  ],
  "milestones": [
    {
      "hour": "H+00—08",
      "title": "先做出一场好局",
      "description": "CEO 给出目标。产品与技术接力，形成活动草稿与报名方案。",
      "result": "1 份活动方案"
    },
    {
      "hour": "H+08—16",
      "title": "找到第一批同好",
      "description": "准备招募内容、整理帮助信息，出现第一笔模拟 VIP 开通。",
      "result": "首笔模拟转化 ¥9.90"
    },
    {
      "hour": "H+16—26",
      "title": "边服务，边倾听",
      "description": "把用户反馈交给产品；分析报名表现，准备第二场活动草稿。",
      "result": "阶段示例：32 位注册"
    },
    {
      "hour": "H+26—36",
      "title": "让经验继续生长",
      "description": "完善集合信息，整理下一轮推广；真实外联与真机验收待补。",
      "result": "阶段示例：62 位注册"
    },
    {
      "hour": "H+36—44",
      "title": "回到经营这件事",
      "description": "汇总注册、报名、VIP 和成本，提交经营复盘，等待 CEO 验收。",
      "result": "累计 84 注册 / 18 模拟订单"
    }
  ]
};

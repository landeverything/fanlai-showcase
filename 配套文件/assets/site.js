(() => {
'use strict';
const assetBase=new URL('.',document.currentScript.src).href;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const roles=window.FANLAI_ROLES, data=window.FANLAI_DATA, config=window.FANLAI_CONFIG;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=c=>'¥'+(c/100).toLocaleString('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2});
const roleById=id=>roles.find(r=>r.id===id);
const statusLabels={done:'已交付',review:'待 CEO 验收',blocked:'等待条件'};
const toast=message=>{const el=$('.toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2600)};
const base=config.productUrl.replace(/\/$/,'');
$$('[data-product]').forEach(a=>a.href=base+'/');
$$('[data-product-path]').forEach(a=>a.href=base+a.dataset.productPath);
$$('[data-product-label]').forEach(a=>a.textContent=base+'/');
$$('[data-repository]').forEach(a=>a.href=config.repositoryUrl);
$('.menu-toggle')?.addEventListener('click',()=>{const open=$('.nav').classList.toggle('open');$('.menu-toggle').setAttribute('aria-expanded',open);$('.menu-toggle').setAttribute('aria-label',open?'关闭导航':'打开导航')});
addEventListener('scroll',()=>$('.header').classList.toggle('scrolled',scrollY>15),{passive:true});
$$('[data-print]').forEach(b=>b.addEventListener('click',()=>window.print()));
const dialog=$('#detail-dialog');let returnFocus;
function openDialog(content){returnFocus=document.activeElement;$('#dialog-content').innerHTML=content;dialog.showModal();$('.dialog-close').focus();}
$('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{const b=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom))dialog.close()});
dialog.addEventListener('close',()=>returnFocus?.focus());
function download(name,content,type){const blob=new Blob([content],{type});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('已导出，文件内保留模拟数据标识。')}
function portrait(id,cls=''){return '<img class="avatar '+(id===0?'':'jelly ')+cls+'" src="'+assetBase+(id===0?'ceo.svg':'jelly/'+id+'.png')+'" alt="" width="256" height="256">'}
function showRole(id){
 if(id==='ceo'){openDialog('<div class="detail-avatar">'+portrait(0)+'</div><span class="dialog-kicker">HUMAN / 人类决策者</span><h2 id="dialog-title">你，是 CEO。</h2><p>把愿景变成目标，把选择变成决策。你不需要盯着每一步，但要决定公司向哪里走，并核对交付是否达到原始要求。</p><div class="detail-grid"><div><h3>你交给组织</h3><ul><li>目标、预算和明确授权</li><li>优先级与验收标准</li></ul></div><div><h3>组织交还给你</h3><ul><li>可追溯的成果和运行记录</li><li>需要你决定的具体问题</li></ul></div></div><div class="detail-boundary"><strong>最终决策</strong><p>主任务由部长提交到待验收，CEO 决定通过或退回。外部承诺、超出预算与授权的动作，由人类明确决策。</p></div>');return;}
 const r=roleById(id);if(!r)return;
 const parent=r.parent?roleById(r.parent).name:'人类 CEO';
 const capability=id==='hr'?'已有员工技能评测与版本审阅入口，结果按具体评测记录核验。':['activity_ops','analyst','finance'].includes(id)?'已有专用业务工具；结果仍需按实际任务核验。':'当前有岗位与协作指令；外部系统能力需以实际工具接入为准。';
 openDialog('<div class="detail-avatar" style="--department:'+r.color+'">'+portrait(r.avatar)+'</div><span class="dialog-kicker">'+(r.kind==='minister'?'AGENT LEAD / 部门负责人':r.id==='hr'?'HR / 直属 CEO':'AGENT / 执行员工')+'</span><h2 id="dialog-title">'+esc(r.name)+'</h2><p>'+esc(r.capabilities)+'</p><div class="detail-meta"><span>汇报给：'+parent+'</span><span>岗位 ID：'+r.id+'</span></div><div class="detail-grid"><div><h3>接收什么</h3><ul>'+r.inputs.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div><div><h3>交付什么</h3><ul>'+r.outputs.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div></div><div class="detail-boundary"><strong>自主权与决策边界</strong><p>'+esc(r.boundary)+'</p></div><h3>当前能力范围</h3><p>'+capability+'</p>');
}
$$('[data-agent]').forEach(el=>el.addEventListener('click',()=>showRole(el.dataset.agent)));
const memories={role:['岗位记忆','每轮工作，先知道自己是谁。','AGENTS.md 记录岗位职责、流程、输入输出和决策边界；WORKFLOW.md 记录协作规则；TEAM.md 和 TOOLS.md 帮助找到同事与可用工具。','托管指令有修订记录，Pi 读取岗位 instructionsFilePath。方法与工具接入分别核实，不能把“拥有某个技能”当成“拥有某个系统权限”。'],task:['协作记忆','接过一项任务，也接住它的来龙去脉。','员工读取真实任务、负责人、最近评论与已有成果。部长创建子任务并设置依赖，把交付物和解除条件留在记录中。','任务父子关系代表归属，实际依赖决定先后。依赖未解除时记录阻塞并让出执行；下一轮从已保存的上下文继续。'],result:['成果记忆','把这一次的成果，留给下一次。','员工把成果链接、评论与验收反馈留在公司任务中。下一位负责人从任务及其子任务读取上下文，再继续协作。','旧报告是参考，不是新的实时事实。经营分析会重新读取当前报名、余位和行程；没有把归档解释为自动学习或全局共享向量记忆。']};
$$('[data-memory]').forEach(b=>b.addEventListener('click',()=>{const m=memories[b.dataset.memory];openDialog('<span class="dialog-kicker">组织如何记住</span><h2 id="dialog-title">'+m[0]+'</h2><h3>'+m[1]+'</h3><p>'+m[2]+'</p><div class="detail-boundary"><strong>实际使用方式</strong><p>'+m[3]+'</p></div>')}));
// Organization links are measured from the rendered cards, so the same semantic chart adapts to mobile.
if($('#org-chart')){
 const chart=$('#org-chart'),svg=$('.org-connectors'),reduce=matchMedia('(prefers-reduced-motion: reduce)');let step=0,scenario='event',playing=false,timer=null;
 const scenarios={event:[
 ['ceo','product','先把目标讲清楚。','“为上海的桌游新手策划一场周日下午活动，6 人，人均 150 元。先做草稿。”','任务目标、人数、预算、草稿要求'],
 ['product','activity_ops','把大目标，拆成能做的事。','部长交给活动运营策划任务，交给产品研究与设计梳理报名信息；两份成果汇总到同一主任务。','子任务、负责人、验收标准'],
 ['activity_ops','product','让想法，变成三站行程。','运营查询地点候选，编排咖啡、桌游和聚餐。核对时间与预算，按要求保留草稿。','活动草稿、行程、策划报告'],
 ['product','business_team','好活动，也需要被看见。','活动方案经 CEO 确认后，增长部门准备招募方案。商务与推广撰写文案，经营分析约定观察指标。','已确认活动、目标人群、招募口径'],
 ['business_team','analyst','把这一轮的结果看明白。','经营分析读取当前报名、余位与显式兴趣，区分报名和到场，输出有来源的复盘及下一轮建议。','经营报告、数据范围、可验证建议'],
 ['finance','ceo','账目与缺口，一起交上来。','财务汇总VIP 模拟订单与模拟 API 消耗，明确哪些不是实际账单；需要真实数据的地方列为缺口。','财务报告、模拟口径、待补证据'],
 ['product','ceo','最后一棒，回到你手里。','主责部长汇总成果并提交验收。CEO 可以通过，也可以退回修改；任务提交验收不等于已经通过。','主任务成果包、验收结果与未验证项']
 ],bug:[
 ['ceo','service','先理解用户遇到了什么。','CEO 交办报名体验反馈。用户服务部长负责归类问题，并安排客服确认上下文。','问题描述、影响范围'],
 ['service','support_worker','让反馈，变成可处理的问题。','客服整理复现步骤与用户预期，区分已知规则和需要技术处理的异常。','复现条件、问题清单'],
 ['support_worker','technology','跨部门交接，不丢上下文。','问题通过部长协调到技术部，技术部长明确实现范围和独立验收要求。','缺陷任务与验收标准'],
 ['technology','development','按原目标，完成具体改进。','开发基于现有实现处理问题，留下版本与变更说明。真实代码和生产操作依赖实际接入的环境。','实现交付、验证说明'],
 ['development','quality_ops','结果，让另一位同事检查。','验收岗位根据原始要求检查结果，明确通过、不通过和未验证。缺陷回交部长安排返工。','独立验收记录'],
 ['quality_ops','community_worker','把已解决的问题，变成经验。','部长把已确认的处理办法交给社区与知识岗位，形成下一次可使用的帮助内容。','经过核实的解决办法'],
 ['technology','ceo','能做了，也要确认做好了。','技术部长汇总实现与验收证据，向 CEO 提交主任务验收。','版本、验收证据、未验证范围']
 ]};
 function box(id){const el=chart.querySelector('[data-agent="'+id+'"]');if(!el)return null;const a=el.getBoundingClientRect(),b=chart.getBoundingClientRect();return{x:a.left-b.left,y:a.top-b.top,w:a.width,h:a.height,cx:a.left-b.left+a.width/2,cy:a.top-b.top+a.height/2}}
 function draw(){const mobile=innerWidth<=760;const ceo=box('ceo');if(!ceo)return;svg.setAttribute('viewBox','0 0 '+chart.clientWidth+' '+chart.clientHeight);let s='<defs><marker id="task-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 1 8 5 0 9" fill="none" stroke="#6d42d8" stroke-width="1.5"/></marker></defs>';
 for(const r of roles){const a=box(r.parent||'ceo'),b=box(r.id);let d;if(mobile){if(!r.parent)d='M '+ceo.cx+' '+(ceo.y+ceo.h)+' V '+(ceo.y+ceo.h+17)+' H 4 V '+b.cy+' H '+b.x;else d='M '+(a.x+a.w)+' '+a.cy+' H '+(a.x+a.w+6)+' V '+b.cy+' H '+b.x;}else{if(r.parent){const rail=a.x-9;d='M '+a.cx+' '+(a.y+a.h)+' V '+(a.y+a.h+14)+' H '+rail+' V '+b.cy+' H '+b.x;}else{const y=ceo.y+ceo.h+24;d='M '+a.cx+' '+(a.y+a.h)+' V '+y+' H '+b.cx+' V '+b.y;}}s+='<path class="management" d="'+d+'"/>';}
 const st=scenarios[scenario][step],a=box(st[0]),b=box(st[1]);if(a&&b){let d;if(mobile){d='M '+a.x+' '+a.cy+' H 1 V '+b.cy+' H '+b.x;}else{if(Math.abs(a.cx-b.cx)<2){const rail=Math.min(a.x,b.x)-9;d='M '+a.x+' '+a.cy+' H '+rail+' V '+b.cy+' H '+b.x;}else if(st[0]==='ceo'||st[1]==='ceo'){const top=st[0]==='ceo'?a:b,bottom=st[0]==='ceo'?b:a;const middle=top.y+top.h+24;d=st[0]==='ceo'?'M '+top.cx+' '+(top.y+top.h)+' V '+middle+' H '+bottom.cx+' V '+bottom.y:'M '+bottom.cx+' '+bottom.y+' V '+middle+' H '+top.cx+' V '+(top.y+top.h);}else{const sideA=a.cx<b.cx?a.x+a.w:a.x,sideB=a.cx<b.cx?b.x:b.x+b.w;const routeY=box('product').y-15;d='M '+sideA+' '+a.cy+' h '+(a.cx<b.cx?8:-8)+' V '+routeY+' H '+(sideB+(a.cx<b.cx?-8:8))+' V '+b.cy+' H '+sideB;}}s+='<path class="task-path" marker-end="url(#task-arrow)" d="'+d+'"/>';}svg.innerHTML=s;}
 function render(){const steps=scenarios[scenario],s=steps[step];$$('[data-agent]').forEach(x=>x.classList.toggle('flow-active',[s[0],s[1]].includes(x.dataset.agent)));$('#flow-step-number').textContent=String(step+1).padStart(2,'0');$('#flow-step-total').textContent=String(steps.length).padStart(2,'0');$('#flow-role').textContent=(s[0]==='ceo'?'CEO':roleById(s[0]).name)+' → '+(s[1]==='ceo'?'CEO':roleById(s[1]).name);$('#flow-title').textContent=s[2];$('#flow-description').textContent=s[3];$('#flow-artifact').textContent='交接：'+s[4];$('#previous-step').disabled=step===0;$('#next-step').disabled=step===steps.length-1;$('#flow-dots').innerHTML=steps.map((v,i)=>'<button class="'+(i===step?'active':'')+'" aria-label="第 '+(i+1)+' 步：'+esc(v[2])+'" aria-pressed="'+(i===step)+'" data-step="'+i+'"></button>').join('');$$('[data-step]').forEach(b=>b.onclick=()=>{stop();step=Number(b.dataset.step);render()});draw();}
 function stop(){playing=false;clearTimeout(timer);$('#play-flow').textContent='▶ 播放协作';}
 function tick(){if(!playing)return;if(step<scenarios[scenario].length-1){step++;render();timer=setTimeout(tick,4500)}else stop()}
 $('#play-flow').onclick=()=>{if(playing){stop();return;}if(step===scenarios[scenario].length-1)step=0;playing=true;$('#play-flow').textContent='Ⅱ 暂停协作';render();timer=setTimeout(tick,4500)};
 $('#next-step').onclick=()=>{stop();step=Math.min(step+1,scenarios[scenario].length-1);render()};$('#previous-step').onclick=()=>{stop();step=Math.max(step-1,0);render()};
 $('#scenario-select').onchange=e=>{stop();scenario=e.target.value;step=0;$('.flow-title h2').textContent=scenario==='event'?'一场周末局，怎样办起来？':'一次报名问题，怎样解决？';render()};
 $$('[data-org-tab]').forEach(b=>b.onclick=()=>{$$('[data-org-tab]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',x===b)});const target=b.dataset.orgTab==='organization'?$('.org-section'):$('#'+b.dataset.orgTab);target.scrollIntoView({behavior:reduce.matches?'instant':'smooth',block:'start'})});
 $('.motion-button').onclick=()=>{const paused=document.body.classList.toggle('motion-paused');$('.motion-button').textContent=paused?'恢复装饰动效':'暂停装饰动效';$('.motion-button').setAttribute('aria-pressed',paused)};
 new ResizeObserver(draw).observe(chart);document.fonts.ready.then(draw);addEventListener('visibilitychange',()=>{if(document.hidden)stop()});render();
}
function metric(label,value,note){return '<div class="metric"><span>'+label+'</span><strong>'+value+'</strong><small>'+note+'</small></div>'}
if($('#log-list')){
 const done=data.logs.filter(x=>x.status==='done').length,review=data.logs.filter(x=>x.status==='review').length,blocked=data.logs.filter(x=>x.status==='blocked').length;
 $('#log-metrics').innerHTML=metric('模拟运行记录',data.logs.length,'来自 '+new Set(data.logs.map(x=>x.agent)).size+' 个代表岗位')+metric('示例交付',done,'场景中的已交付记录')+metric('待 CEO 验收',review,'提交验收 ≠ 验收通过')+metric('等待条件',blocked,'保留缺口，不伪装完成');
 function filtered(){const q=$('#log-search').value.trim().toLowerCase(),d=$('#log-department').value,s=$('#log-status').value;return data.logs.filter(l=>{const r=roleById(l.agent);return (d==='all'||d===(r.parent||r.id))&&(s==='all'||l.status===s)&&(!q||[l.id,l.title,l.summary,r.name,l.artifact].join(' ').toLowerCase().includes(q))}).reverse()}
 function renderLogs(){const records=filtered();$('#log-count').textContent='显示 '+records.length+' / '+data.logs.length+' 条模拟记录 · 按时间倒序';$('#log-empty').hidden=records.length!==0;$('#log-list').innerHTML=records.map(l=>{const r=roleById(l.agent);return '<button class="log-row" data-log="'+l.id+'" aria-label="查看模拟日志：'+esc(l.title)+'"><span class="log-time">H+'+l.hour+'<small>'+l.id+'</small></span><span class="log-avatar" style="background:'+r.color+'">'+portrait(r.avatar)+'</span><span class="log-task"><strong>'+esc(l.title)+'</strong><span>'+esc(l.summary)+'</span></span><span class="log-agent">'+r.name+'</span><span class="status-badge '+l.status+'">'+statusLabels[l.status]+'</span><span class="row-arrow">↗</span></button>'}).join('');$$('[data-log]').forEach(b=>b.onclick=()=>{const l=data.logs.find(x=>x.id===b.dataset.log),r=roleById(l.agent);openDialog('<span class="sim-label">模拟运行记录 · 非真实日志</span><h2 id="dialog-title">'+esc(l.title)+'</h2><div class="detail-meta"><span>H+'+l.hour+'</span><span>'+l.id+'</span><span>'+r.name+'</span><span>'+statusLabels[l.status]+'</span></div><h3>任务输入</h3><p>'+esc(l.input)+'</p><h3>示例执行过程</h3><ol class="detail-steps">'+l.steps.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol><h3>交付物</h3><p>'+esc(l.artifact)+'</p><div class="detail-boundary"><strong>下一位接收人：'+esc(l.handoff)+'</strong><p>'+esc(l.summary)+'</p></div><h3>证据说明</h3><p>手工编排的模拟样例，无实际运行凭证。</p>')});}
 ['log-search','log-department','log-status'].forEach(id=>$('#'+id).addEventListener(id==='log-search'?'input':'change',renderLogs));$('#reset-filters').onclick=()=>{$('#log-search').value='';$('#log-department').value='all';$('#log-status').value='all';renderLogs()};$('#export-logs').onclick=()=>download('fanlai-SIMULATED-agent-logs.json',JSON.stringify({simulation:true,disclaimer:'模拟样例，非真实竞赛运行证明',spanHours:44,records:filtered()},null,2),'application/json;charset=utf-8');renderLogs();
}
if($('#ledger-rows')){
 const sum=(type)=>data.ledger.filter(x=>x.type===type).reduce((s,x)=>s+x.amount,0),income=sum('income'),cost=sum('cost'),orders=data.ledger.reduce((s,x)=>s+(x.orders||0),0);let filter='all';
 $('#business-metrics').innerHTML=metric('场景跨度','44<em>小时</em>','H+00 至 H+44 · 模拟时间')+metric('模拟注册',data.registrations,'示例报名 '+data.signups+' 人，非真实用户')+metric('模拟 VIP 订单',orders,'¥9.9 / 月，非实际付款')+metric('模拟订单金额',money(income),'不代表实际到账或利润');
 $('#business-timeline').innerHTML=data.milestones.map(m=>'<article class="milestone"><span>'+m.hour+'</span><h3>'+m.title+'</h3><p>'+m.description+'</p><strong>'+m.result+'</strong></article>').join('');
 function renderLedger(){const rows=data.ledger.filter(x=>filter==='all'||x.type===filter);$('#ledger-rows').innerHTML=rows.map(x=>'<tr><td>H+'+x.hour+'<small>'+x.id+'</small></td><td>'+x.title+'</td><td><span class="nature">'+x.nature+'</span></td><td class="money '+x.type+'">'+(x.type==='income'?'+':'−')+money(x.amount)+'</td><td>'+x.owner+'</td></tr>').join('');$('#ledger-total').textContent='共 '+rows.length+' 条 · 全部模拟收入 '+money(income)+' / 假设成本 '+money(cost)+' / 差额 '+money(income-cost)+'（未计人工与获客，非净利润）';}
 $$('[data-ledger-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.ledgerFilter;$$('[data-ledger-filter]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',x===b)});renderLedger()});
 $('#export-ledger').onclick=()=>{const rows=[['数据性质','时间','记录编号','事项','类型','金额_元','订单数','负责岗位'],...data.ledger.map(x=>['模拟样例_非真实经营证明','H+'+x.hour,x.id,x.title,x.type==='income'?'模拟收入':'假设成本',((x.type==='income'?1:-1)*x.amount/100).toFixed(2),x.orders||0,x.owner])];download('fanlai-SIMULATED-44h-ledger.csv','\uFEFF'+rows.map(r=>r.map(x=>'"'+String(x).replace(/"/g,'""')+'"').join(',')).join('\r\n'),'text/csv;charset=utf-8')};
 $('#show-order').onclick=()=>openDialog('<span class="sim-label">模拟首单 · 不构成真实成交证明</span><h2 id="dialog-title">第一笔 VIP 开通</h2><div class="detail-meta"><span>SIM-ORDER-001</span><span>H+12:30</span></div><div class="detail-boundary"><strong style="font-size:32px">¥9.90</strong><p>产品：饭来 VIP · 一个月<br>示例用户：SIM-USER-001<br>性质：手工编排的模拟成交样例<br>实际收款：无</p></div><h3>示例转化路径</h3><ol class="detail-steps"><li>发现城市活动</li><li>注册并填写兴趣</li><li>加入小队</li><li>进入个人页查看权益并开通 VIP</li></ol><p>模拟路径用于演示商业化可能性。正式证据应替换为真实用户记录或系统实际产生的模拟支付订单，并保留核验来源。</p>');
 const ids=['input-tokens','output-tokens','input-rate','output-rate','human-hours','hourly-rate'];
 function calculate(){const values=Object.fromEntries(ids.map(id=>[id,Math.max(0,Number($('#'+id).value)||0)]));const input=values['input-tokens'],output=values['output-tokens'],model=input*values['input-rate']+output*values['output-rate'],human=values['human-hours']*values['hourly-rate'],review=1.5*values['hourly-rate'],agent=model+4.4+review;const fmt=v=>'¥'+v.toLocaleString('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2});$('#input-token-output').textContent=input.toFixed(1);$('#output-token-output').textContent=output.toFixed(1);$('#human-cost').textContent=fmt(human);$('#agent-total').textContent=fmt(agent);$('#model-cost').textContent=fmt(model);$('#review-cost').textContent=fmt(review);$('#cost-saving').textContent=(human>=agent?'':'−')+fmt(Math.abs(human-agent));const max=Math.max(human,agent,1);$('.human-bar').style.width=(human/max*100)+'%';$('#agent-bar').style.width=(agent/max*100)+'%';$('#cost-description').textContent=human>agent?'在当前假设下，Agent 加人工核验成本较低；仍需验证同等质量。':'在当前假设下，Agent 方案未显示成本优势；应检查单价与工作量。';}
 ids.forEach(id=>$('#'+id).addEventListener('input',calculate));$('#reset-cost').onclick=()=>{[3.2,.8,1,4,20,80].forEach((v,i)=>$('#'+ids[i]).value=v);calculate()};calculate();renderLedger();
}
})();

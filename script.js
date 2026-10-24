// REDSHIFT interactions: state selection, section navigation, and restrained motion.
const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('span').textContent = open ? '−' : '＋';
});
const navLinks = [...document.querySelectorAll('.nav-link')];
navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.querySelector('span').textContent = '＋';
}));
const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  navLinks.forEach(link => {
    const active = link.hash === `#${entry.target.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
}), { rootMargin: '-35% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

const stages = [
  { label:'FOUNDATION / FIRST LINE', title:'IT Support Technician', description:'Help users get back to work by diagnosing everyday device, application, account, and connectivity issues. This is where careful listening and methodical troubleshooting build a strong base.', duties:'User support · Device setup and maintenance · Basic troubleshooting · Account and application support', tools:'Ticket documentation · Windows fundamentals · Clear communication · Diagnostic process', next:'Build experience with endpoints, accounts, and common infrastructure services.' },
  { label:'OPERATIONS / RELIABILITY', title:'System Administrator', description:'Keep the core systems an organization depends on secure, maintained, and available. This stage connects user needs to dependable server and service operations.', duties:'Server administration · User permissions and access control · Backups and system maintenance · Monitoring and incident resolution', tools:'Windows Server · Linux · Networking · PowerShell or Bash · Backup and monitoring tools', next:'Deepen systems expertise and take on broader infrastructure, automation, or engineering work.' },
  { label:'ARCHITECTURE / RESILIENCE', title:'Systems Engineer', description:'Plan and improve the infrastructure behind reliable services. Engineering brings systems together through thoughtful design, automation, and preparation for failure.', duties:'Infrastructure planning · Systems automation · Cloud and virtualization concepts · Reliability and disaster recovery', tools:'Architecture · Scripting · Virtualization · Cloud concepts · Recovery planning', next:'Possible directions include infrastructure architecture, cloud engineering, platform reliability, or technical leadership.' }
];
document.querySelectorAll('.stage-button').forEach(button => button.addEventListener('click', () => {
  const i = Number(button.dataset.stage), s = stages[i];
  document.querySelectorAll('.stage-button').forEach(b => { const active = b === button; b.classList.toggle('selected', active); b.setAttribute('aria-pressed', String(active)); });
  document.getElementById('trackProgress').style.width = `${i * 50}%`;
  document.getElementById('stageNumber').textContent = `STAGE / 0${i + 1}`;
  document.getElementById('stageLabel').textContent = s.label;
  document.getElementById('stageTitle').textContent = s.title;
  document.getElementById('stageDescription').textContent = s.description;
  document.getElementById('stageDuties').textContent = s.duties;
  document.getElementById('stageTools').textContent = s.tools;
  document.getElementById('stageNext').textContent = s.next;
}));

const skills = [
 ['FOUNDATION / ENVIRONMENTS','Operating systems','Understand how Windows and Linux environments organize users, files, services, updates, and permissions.','Support reliable endpoints and servers through configuration, maintenance, and a working knowledge of system behavior.','SERVER OPERATIONS / USER ACCESS'],
 ['CONNECTIVITY / PROTOCOLS','Networking','Understand how devices communicate through IP addressing, DNS, DHCP, routing, and network services.','Trace connectivity issues across endpoints and infrastructure, and understand the services systems rely on.','DNS / DHCP / CONNECTIVITY'],
 ['METHOD / EVIDENCE','Troubleshooting','Work from symptoms to likely causes using a repeatable process, logs, and diagnostic tools.','Restore service methodically, avoid guesswork, and document findings that help prevent repeat incidents.','DIAGNOSTICS / INCIDENT RESPONSE'],
 ['PROTECTION / PRACTICE','Security fundamentals','Learn core practices such as least privilege, patching, access control, and protecting organizational data.','Reduce avoidable risk while maintaining systems that are usable and dependable.','ACCESS / PATCHING / RESILIENCE'],
 ['CONSISTENCY / AUTOMATION','Scripting & automation','Use PowerShell or Bash concepts to make repeatable administrative tasks more consistent.','Reduce manual repetition, support system maintenance, and make routine work easier to reproduce.','POWERSHELL / BASH / OPERATIONS'],
 ['TEAMWORK / KNOWLEDGE','Communication & documentation','Explain technical issues clearly, keep accurate records, and write useful procedures.','Help users and teammates understand what changed, what to do, and how to solve known problems.','USER SUPPORT / TEAM KNOWLEDGE']
];
document.querySelectorAll('.skill-node').forEach(button => button.addEventListener('click', () => {
  const i = Number(button.dataset.skill), s = skills[i];
  document.querySelectorAll('.skill-node').forEach(b => { const active = b === button; b.classList.toggle('selected', active); b.setAttribute('aria-pressed', String(active)); });
  ['skillNumber','skillContext','skillTitle','skillDescription','skillApplication','skillConnection'].forEach((id, n) => document.getElementById(id).textContent = n === 0 ? `COMPETENCY / 0${i+1}` : s[n-1]);
}));
const techs = [
 ['Windows Server','An environment for directory services, user and device policies, file services, and other organization-wide infrastructure.','MANAGE SHARED SERVICES AND ACCESS'],
 ['Linux','A widely used server operating system with command-line tools, services, permissions, and flexible administration.','RUN AND MAINTAIN SERVER WORKLOADS'],
 ['PowerShell / Bash','Shells and scripting languages for managing systems and making routine administrative work repeatable.','AUTOMATE CONSISTENT TASKS'],
 ['Cloud platforms','On-demand infrastructure and services for compute, storage, networking, identity, and monitoring.','PROVISION AND OPERATE CLOUD SERVICES'],
 ['Virtualization','Technology that runs isolated virtual machines on shared physical infrastructure for flexible testing and operations.','RUN ISOLATED SYSTEMS AND LABS'],
 ['Monitoring & diagnostics','Logs, metrics, and diagnostic utilities that help reveal system health, performance, and service issues.','OBSERVE SYSTEMS AND INVESTIGATE ISSUES']
];
document.querySelectorAll('.tech-button').forEach(button => button.addEventListener('click', () => {
  const i = Number(button.dataset.tech), t = techs[i];
  document.querySelectorAll('.tech-button').forEach(b => { const active = b === button; b.classList.toggle('selected', active); b.setAttribute('aria-pressed', String(active)); });
  document.getElementById('techIndex').textContent = `TECHNOLOGY / 0${i+1}`;
  document.getElementById('techTitle').textContent = t[0];
  document.getElementById('techDescription').textContent = t[1];
  document.getElementById('techPurpose').textContent = `PURPOSE / ${t[2]}`;
}));
const roles = [
 ['PEOPLE','IT Support Technician','Endpoints, user accounts, applications, and first-line diagnosis.','Set up devices, assist users, resolve common issues, and record useful solutions.','People can return to work with working devices and access.'],
 ['RELIABILITY','System Administrator','Servers, operating systems, permissions, backups, and shared services.','Maintain systems, manage access, apply updates, monitor services, and respond to incidents.','Core systems remain available, maintained, and appropriately protected.'],
 ['CONNECTIVITY','Network Administrator','Network devices, IP addressing, Wi-Fi, routing, switching, and firewalls.','Maintain network equipment, troubleshoot connectivity, and support secure network access.','People, devices, and services can communicate reliably.'],
 ['DESIGN / IMPROVEMENT','Systems Engineer','Infrastructure architecture, automation, scaling, cloud, and resilience.','Plan and integrate systems, automate operations, and prepare for recovery.','Infrastructure meets current needs and can adapt to future demands.']
];
const roleTabs = [...document.querySelectorAll('.role-tab')];
function setRole(i, focus=false) {
  const r = roles[i], tab = roleTabs[i];
  roleTabs.forEach((b,n) => { const active=n===i; b.classList.toggle('selected',active); b.setAttribute('aria-selected',String(active)); b.tabIndex=active?0:-1; });
  document.getElementById('role-panel').setAttribute('aria-labelledby',tab.id);
  document.getElementById('roleNumber').textContent=`ROLE / 0${i+1} — ${r[0]}`;
  document.getElementById('roleTitle').textContent=r[1];
  document.getElementById('roleFocus').textContent=r[2];
  document.getElementById('roleDuties').textContent=r[3];
  document.getElementById('roleOutcome').textContent=r[4];
  document.getElementById('roleMark').textContent=`0${i+1}`;
  if(focus) tab.focus();
}
roleTabs.forEach((tab,i) => {
  tab.addEventListener('click',()=>setRole(i));
  tab.addEventListener('keydown',e=>{let next=i;if(e.key==='ArrowDown'||e.key==='ArrowRight')next=(i+1)%roleTabs.length;else if(e.key==='ArrowUp'||e.key==='ArrowLeft')next=(i-1+roleTabs.length)%roleTabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=roleTabs.length-1;else return;e.preventDefault();setRole(next,true);});
});

// A restrained scroll signal reinforces section transitions without blocking reading.
if (motionOK && !window.matchMedia('(max-width: 720px)').matches) {
  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--scroll-signal', `${Math.min(window.scrollY / Math.max(document.body.scrollHeight-window.innerHeight,1),1) * 100}%`);
      scheduled = false;
    });
  }, {passive:true});
}

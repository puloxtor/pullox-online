// All copy for pullox.online. EN is the default, BG lives at /bg/.
// Source of truth: pullox-online-brief.md (2026-11-07). Do not add facts that are not in the brief.

export const SITE = {
  url: 'https://www.pullox.online',
  name: 'Alexandros Kotzegien',
  github: 'puloxtor',
  // X: confirmed by Alex on 2026-11-07.
  showX: true,
  social: [
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/alexandros-kotzegien/' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/puloxtor' },
    { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/alex.kotzegien' },
    { id: 'x', label: 'X', href: 'https://x.com/AlexKotzegien' },
  ],
  publicRepos: [
    { name: 'sheets-mcp-server', url: 'https://github.com/puloxtor/sheets-mcp-server' },
    { name: 'shopify-mcp-multiaccount', url: 'https://github.com/puloxtor/shopify-mcp-multiaccount' },
  ],
};

const career = (t) => [
  { years: '2025 – ' + t.nowWord, org: 'BioPharma Laboratories', role: 'Commercial Director & Chief AI Officer', current: true },
  { years: '2024 – 2025', org: 'MobiSystems', role: 'Product Manager', detail: t.c.mobiPm },
  { years: '2019 – 2023', org: 'MobiSystems', role: 'Channel Management Lead', detail: t.c.mobiCh },
  { years: '2018 – 2019', org: 'Xbox', role: 'Trainer & Subject Matter Expert' },
  { years: '2017 – 2018', org: 'Paysafe', role: 'Risk Management' },
  { years: '2015 – 2016', org: 'Google Workspace', role: t.c.gws },
  { years: '2012 – 2015', org: t.c.family, role: t.c.familyRole, detail: t.c.familyDetail },
  { years: '2011 – 2012', org: 'HP', role: 'Executive team support, Cloud & Mobility division' },
  { years: '2009 – 2011', org: 'Account Executive', role: t.c.ae },
];

const en = {
  lang: 'en',
  locale: 'en_GB',
  path: '/',
  title: 'Alexandros Kotzegien — commerce, product and AI',
  description:
    'Commercial Director & Chief AI Officer at BioPharma Laboratories. I turn how a company works into systems — and lately, into AI agents that do the work.',
  nav: { switchLabel: 'Български', switchShort: 'BG', switchHref: '/bg/', contact: 'Get in touch' },
  hero: {
    headline: 'Where commerce, product and AI meet.',
    sub: 'Commercial Director & Chief AI Officer at BioPharma Laboratories. I turn how a company works into systems — and lately, into AI agents that do the work.',
    cta: 'Get in touch',
  },
  now: { title: 'Now', text: 'Building an AI-run warehouse and production system for a cosmetics factory.', place: 'Plovdiv, Bulgaria' },
  bio: {
    title: 'AI agents that run a factory',
    context:
      'BioPharma Laboratories is a Bulgarian cosmetics manufacturer — private label and its own brands. I am the only technical person on the team.',
    bot: 'A bot the team talks to from tasks and chat channels.',
    executor:
      'An executor that is the single path for writing into the production system, Microsoft Dataverse. Nothing writes around it.',
    steps: ['Manifest', 'Dry run', 'Approval', 'Write', 'Re-read', 'Audit comment'],
    auto: 'Routine changes are approved automatically',
    human: 'New items, permissions and deactivations go to a human',
    plus: 'Plus a warehouse map and a production-control register.',
    results: 'Results',
    resultsTodo: '{{TODO: 2–3 public numbers from Alex — e.g. users, records per week, hours saved}}',
  },
  mcp: {
    title: 'MCP servers',
    text: 'Custom Model Context Protocol servers that let AI agents work with real company systems. Deployed on Railway.',
    list: ['Exchange administration', 'Google Sheets', 'IMAP mail', 'Google Ads', 'Multi-store Shopify', 'SharePoint lists'],
    open: 'Open source',
  },
  m365: {
    title: 'Microsoft 365',
    text: 'Global Administrator for the company’s whole Microsoft 365 tenant — identity, mail, SharePoint, Teams, security and Microsoft AI tooling (Microsoft Foundry).',
    todo: 'I moved the entire company onto Microsoft on my own, and now run it end to end — Exchange, Entra, Power Apps and Azure — plus the bots and sites built on top.',
  },
  lab: {
    title: 'Homelab',
    text: 'A Proxmox server at home running Home Assistant, n8n automations and Claude Code agents, exposed safely through a Cloudflare tunnel.',
    nodes: { internet: 'Internet', tunnel: 'Cloudflare tunnel', automations: 'Agents & automations', media: 'Media — a hobby' },
  },
  photoAlt: 'Alexandros Kotzegien laughing, holding a garden hose next to a red car',
  svc: {
    title: 'What I can build for your company',
    lead: 'The same work I do at BioPharma, for other companies.',
    items: [
      ['AI consulting', 'Finding where AI agents can take real work off your team.'],
      ['Integration with what you already run', 'Connecting AI to the systems you have: Microsoft 365, ERP, Shopify, Google, mail.'],
      ['Platforms and custom solutions', 'Built around how you work — down to your own Jira-style task system.'],
      ['Faster ERP implementation', 'Hands-on help to get an ERP rollout moving and finished.'],
      ['Your own AI factory', 'Agents that run warehouse and production work, like the system at BioPharma.'],
      ['End-to-end delivery', 'From mapping the process to a system running in production.'],
    ],
    cta: 'Discuss a project',
  },
  map: {
    title: 'Warehouse map',
    text: 'Every storage place across three warehouses with stock, lots and expiry dates. Search by code, item, client, lot or address, and open any record in Power Apps.',
    alt1: 'Warehouse map: a grid of storage places with stock per place and a detail panel for one item',
    open: 'Open the screenshot full size',
    alt2: 'Warehouse map search: matching storage places highlighted in orange',
  },
  career: {
    title: 'Career',
    edu: 'Education',
    eduItems: ['City University of Seattle — Business Administration', 'Product School — Product Manager Certification (2024)'],
  },
  c: {
    mobiPm: 'Launched a new product: customer interviews, A/B testing, monetization, pricing, acquisition and retention.',
    mobiCh: 'Channel strategy, partnerships, team leadership, technical training.',
    gws: 'Technical Support for enterprise customers',
    family: 'Family business',
    familyRole: 'Fashion import & retail — operations',
    familyDetail: 'Introduced an ERP and moved the business to the cloud.',
    ae: 'Software sales and financial markets',
  },
  nowWord: 'now',
  skills: {
    title: 'Skills',
    list: ['Product management', 'Commercial strategy', 'AI agents', 'MCP', 'Process automation', 'Microsoft 365 / Power Platform', 'Dataverse', 'n8n', 'Proxmox'],
  },
  gh: {
    title: 'GitHub',
    contributions: 'contributions in the last year',
    privateNote: 'Includes private work, counted but not named.',
    pending: 'Activity syncs once a day.',
    repos: 'Public repositories',
    pushed: 'pushed',
    less: 'Less',
    more: 'More',
  },
  off: {
    title: 'Off the clock',
    items: ['Camping & airsoft', 'Homelab tinkering', 'Dad, raising a bilingual (EN/BG) kid'],
  },
  contact: {
    title: 'Send me a message',
    lead: 'Consulting on AI in operations, a role, or a homelab question — write here and it reaches me directly.',
    name: 'Name',
    email: 'Your email',
    message: 'Message',
    send: 'Send',
    sending: 'Sending…',
    ok: 'Message sent. I’ll reply to the email you gave.',
    err: 'The message didn’t send. Check the fields and try again in a minute.',
    invalid: 'Fill in your name, a valid email and a message of at least 10 characters.',
    limit: 'Too many messages from this connection. Try again in an hour.',
  },
  footer: { follow: 'Follow' },
};

const bg = {
  lang: 'bg',
  locale: 'bg_BG',
  path: '/bg/',
  title: 'Alexandros Kotzegien — търговия, продукт и AI',
  description:
    'Търговски директор и Chief AI Officer в BioPharma Laboratories. Превръщам начина, по който работи една фирма, в системи — а напоследък и в AI агенти, които вършат работата.',
  nav: { switchLabel: 'English', switchShort: 'EN', switchHref: '/', contact: 'Пиши ми' },
  hero: {
    headline: 'Там, където се срещат търговия, продукт и AI.',
    sub: 'Търговски директор и Chief AI Officer в BioPharma Laboratories. Превръщам начина, по който работи една фирма, в системи — а напоследък и в AI агенти, които вършат работата.',
    cta: 'Пиши ми',
  },
  now: { title: 'Сега', text: 'Изграждам склад и производство, управлявани от AI, за фабрика за козметика.', place: 'Пловдив, България' },
  bio: {
    title: 'AI агенти, които движат фабрика',
    context:
      'BioPharma Laboratories е български производител на козметика — private label и собствени марки. Аз съм единственият технически човек в екипа.',
    bot: 'Бот, с когото екипът говори директно от задачите и чат каналите.',
    executor:
      'Executor — единственият път, по който се пише в производствената система, Microsoft Dataverse. Нищо не минава покрай него.',
    steps: ['Манифест', 'Dry run', 'Одобрение', 'Запис', 'Повторно четене', 'Одит коментар'],
    auto: 'Рутинните промени се одобряват автоматично',
    human: 'Нови артикули, права и деактивации стигат до човек',
    plus: 'Плюс карта на склада и регистър за производствен контрол.',
    results: 'Резултати',
    resultsTodo: '{{TODO: 2–3 public numbers from Alex — e.g. users, records per week, hours saved}}',
  },
  mcp: {
    title: 'MCP сървъри',
    text: 'Собствени Model Context Protocol сървъри, през които AI агентите работят с реалните системи на фирмата. Хостнати в Railway.',
    list: ['Администрация на Exchange', 'Google Sheets', 'IMAP поща', 'Google Ads', 'Shopify с няколко магазина', 'SharePoint списъци'],
    open: 'С отворен код',
  },
  m365: {
    title: 'Microsoft 365',
    text: 'Global Administrator на целия Microsoft 365 tenant на фирмата — идентичност, поща, SharePoint, Teams, сигурност и AI инструментите на Microsoft (Microsoft Foundry).',
    todo: 'Сам прехвърлих цялата фирма на Microsoft и днес я поддържам изцяло — Exchange, Entra, Power Apps и Azure — плюс ботовете и сайтовете върху тях.',
  },
  lab: {
    title: 'Хоумлаб',
    text: 'Proxmox сървър вкъщи с Home Assistant, n8n автоматизации и Claude Code агенти, изложен навън безопасно през Cloudflare tunnel.',
    nodes: { internet: 'Интернет', tunnel: 'Cloudflare tunnel', automations: 'Агенти и автоматизации', media: 'Медия — хоби' },
  },
  photoAlt: 'Alexandros Kotzegien се смее с градински маркуч в ръка до червена кола',
  svc: {
    title: 'Какво мога да изградя за твоята фирма',
    lead: 'Същата работа, която върша в BioPharma — и за други фирми.',
    items: [
      ['AI консултации', 'Откриваме къде AI агентите могат да поемат реална работа от екипа ти.'],
      ['Интеграция със съществуващите системи', 'Свързвам AI с това, което вече ползвате: Microsoft 365, ERP, Shopify, Google, поща.'],
      ['Платформи и решения по поръчка', 'Изградени около начина, по който работите — включително собствена система за задачи като Jira.'],
      ['По-бързо внедряване на ERP', 'Практическа помощ внедряването на ERP да тръгне и да приключи.'],
      ['Собствена AI фабрика', 'Агенти, които движат склада и производството — като системата в BioPharma.'],
      ['Цялостни решения', 'От описването на процеса до система, която работи в реална среда.'],
    ],
    cta: 'Обсъди проект',
  },
  map: {
    title: 'Карта на складовете',
    text: 'Всяко складово място в трите склада с наличност, лотове и срокове на годност. Търсене по код, артикул, клиент, лот или адрес и отваряне на всеки запис в Power Apps.',
    alt1: 'Карта на склада: мрежа от складови места с наличности и панел с детайли за артикул',
    open: 'Отвори снимката в пълен размер',
    alt2: 'Търсене в картата на склада: намерените места са оцветени в оранжево',
  },
  career: {
    title: 'Кариера',
    edu: 'Образование',
    eduItems: ['City University of Seattle — Business Administration', 'Product School — Product Manager Certification (2024)'],
  },
  c: {
    mobiPm: 'Пуснах нов продукт: интервюта с клиенти, A/B тестове, монетизация, ценообразуване, привличане и задържане на потребители.',
    mobiCh: 'Стратегия за каналите, партньорства, ръководство на екип, технически обучения.',
    gws: 'Техническа поддръжка за корпоративни клиенти',
    family: 'Семеен бизнес',
    familyRole: 'Внос и търговия с мода — операции',
    familyDetail: 'Въведох ERP и прехвърлих бизнеса в облака.',
    ae: 'Продажби на софтуер и финансови пазари',
  },
  nowWord: 'днес',
  skills: {
    title: 'Умения',
    list: ['Продуктов мениджмънт', 'Търговска стратегия', 'AI агенти', 'MCP', 'Автоматизация на процеси', 'Microsoft 365 / Power Platform', 'Dataverse', 'n8n', 'Proxmox'],
  },
  gh: {
    title: 'GitHub',
    contributions: 'приноса за последната година',
    privateNote: 'Включва и частна работа — преброена, но без имена.',
    pending: 'Активността се обновява веднъж дневно.',
    repos: 'Публични хранилища',
    pushed: 'обновено',
    less: 'По-малко',
    more: 'Повече',
  },
  off: {
    title: 'Извън работа',
    items: ['Къмпинг и еърсофт', 'Експерименти в хоумлаба', 'Татко — отглеждаме дете на два езика (EN/BG)'],
  },
  contact: {
    title: 'Пиши ми',
    lead: 'Консултация за AI в операциите, предложение за работа или въпрос за хоумлаб — пиши тук и съобщението стига директно до мен.',
    name: 'Име',
    email: 'Твоят имейл',
    message: 'Съобщение',
    send: 'Изпрати',
    sending: 'Изпращане…',
    ok: 'Съобщението е изпратено. Ще ти отговоря на посочения имейл.',
    err: 'Съобщението не беше изпратено. Провери полетата и опитай пак след минута.',
    invalid: 'Попълни име, валиден имейл и съобщение от поне 10 знака.',
    limit: 'Твърде много съобщения от тази връзка. Опитай пак след час.',
  },
  footer: { follow: 'Последвай' },
};

en.careerItems = career(en);
bg.careerItems = career(bg);

export const LANGS = { en, bg };

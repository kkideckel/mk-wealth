/**
 * MK-Wealth — Shared Header & Footer Component
 * Include this script on every page: <script src="header-footer.js"></script>
 * Place the <script> tag as the FIRST child inside <body>.
 *
 * The script:
 *  1. Injects Google Fonts (Open Sans + Playfair Display)
 *  2. Injects all header/footer CSS into <head>
 *  3. Renders the sticky header (logo, hamburger, BrokerCheck bar)
 *  4. Renders the full-screen nav drawer with complete hierarchy
 *  5. Renders the footer (contact info + quick links + legal)
 *  6. Auto-highlights the active nav link based on the current page filename
 */

(function () {
  const NAV = [
    { label: 'Home', href: 'index.html' },
    { label: 'About Us', href: '#', children: [
        { label: 'Guiding Principles', href: 'https://www.mk-wealth.com/our-beliefs' },
        { label: 'Your Team', href: 'https://www.mk-wealth.com/meet-the-team' },
        { label: 'Our RIA Platform', href: 'https://www.mk-wealth.com/about-wealthcare' },
    ]},
    { label: 'Investing', href: '#', children: [
        { label: 'Investment Philosophy', href: 'invest.html' },
        { label: 'Core Strategies', href: 'https://www.mk-wealth.com/core-strategies' },
        { label: 'Advanced Investment Strategies', href: 'https://www.mk-wealth.com/advancedinvestmentsolution2' },
    ]},
    { label: 'Planning', href: '#', children: [
        { label: 'Accumulation Planning', href: 'https://www.mk-wealth.com/accumulation-planning' },
        { label: 'Financial Life Planning', href: 'https://www.mk-wealth.com/planning2' },
        { label: 'Retirement Planning', href: 'https://www.mk-wealth.com/retirement-planning2' },
        { label: 'Legacy Planning', href: 'https://www.mk-wealth.com/legacy-planning' },
    ]},
    { label: 'Viewpoints', href: 'https://www.mk-wealth.com/insights-and-market-commentary', children: [
        { label: 'Blog', href: 'https://www.mk-wealth.com/blog' },
        { label: 'Views', href: 'https://www.mk-wealth.com/insights-and-market-commentary' },
    ]},
    { label: 'Clients', href: '#', children: [
        { label: 'GDX', href: 'https://clientportal.wealthcarecapital.com/login/securelogin/loginbase.aspx', external: true },
        { label: 'Fidelity', href: 'https://digital.fidelity.com/prgw/digital/login/full-page', external: true },
        { label: 'Schwab', href: 'https://www.schwab.com/client-home', external: true },
    ]},
    { label: 'Contact Us', href: 'contactus.html' },
    { label: 'Client Login', href: 'https://app.rightcapital.com/account/login?YNPk8Es', external: true, gold: true },
  ];

  const QUICK_LINKS = [
    { label: 'Guiding Principles', href: 'https://www.mk-wealth.com/our-beliefs' },
    { label: 'Your Team', href: 'https://www.mk-wealth.com/meet-the-team' },
    { label: 'Investment Philosophy', href: 'invest.html' },
    { label: 'Core Strategies', href: 'https://www.mk-wealth.com/core-strategies' },
    { label: 'Accumulation Planning', href: 'https://www.mk-wealth.com/accumulation-planning' },
    { label: 'Retirement Planning', href: 'https://www.mk-wealth.com/retirement-planning2' },
    { label: 'Legacy Planning', href: 'https://www.mk-wealth.com/legacy-planning' },
    { label: 'Blog', href: 'https://www.mk-wealth.com/blog' },
    { label: 'Contact Us', href: 'contactus.html' },
  ];

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&family=Playfair+Display:wght@400;500&display=swap');
    .mkw-header *, .mkw-nav *, .mkw-footer * { box-sizing: border-box; }
    .mkw-header { background: #fff; position: sticky; top: 0; z-index: 1000; width: 100%; font-family: 'Open Sans', sans-serif; }
    .mkw-header__inner { display: flex; align-items: center; justify-content: space-between; height: 60px; padding: 0 20px; position: relative; border-bottom: 1px solid #e8e8e8; }
    .mkw-logo { position: absolute; left: 50%; transform: translateX(-50%); display: flex; align-items: center; text-decoration: none; }
    .mkw-logo__img { height: 44px; width: auto; display: block; }
    .mkw-hamburger { background: none; border: none; cursor: pointer; width: 36px; height: 36px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; padding: 4px; }
    .mkw-hamburger__bar { display: block; width: 22px; height: 2px; background: #111; transition: all 0.28s ease; border-radius: 1px; }
    .mkw-hamburger.is-open .mkw-hamburger__bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .mkw-hamburger.is-open .mkw-hamburger__bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .mkw-hamburger.is-open .mkw-hamburger__bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    .mkw-header__spacer { width: 36px; }
    .mkw-brokercheck { background: #f6f6f6; border-top: 1px solid #ebebeb; height: 40px; display: flex; align-items: center; justify-content: center; }
    .mkw-brokercheck a { display: inline-flex; align-items: center; gap: 6px; text-decoration: none; font-family: 'Open Sans', sans-serif; font-size: 13px; font-weight: 600; color: #E7CA63; }
    .mkw-brokercheck__circle { display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 50%; background: #1a5fa8; flex-shrink: 0; }
    .mkw-brokercheck__circle svg { width: 10px; height: 10px; }
    .mkw-brokercheck__finra { font-weight: 400; font-size: 11px; color: #888; letter-spacing: 0.06em; }
    .mkw-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 1998; }
    .mkw-overlay.is-open { display: block; }
    .mkw-nav { position: fixed; top: 0; left: 0; width: 320px; height: 100vh; background: #111; z-index: 1999; transform: translateX(-100%); transition: transform 0.35s cubic-bezier(0.4,0,0.2,1); overflow-y: auto; overflow-x: hidden; font-family: 'Open Sans', sans-serif; }
    .mkw-nav.is-open { transform: translateX(0); }
    .mkw-nav__close { position: absolute; top: 18px; right: 18px; background: none; border: none; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; color: #888; font-size: 20px; transition: color 0.2s; line-height: 1; }
    .mkw-nav__close:hover { color: #fff; }
    .mkw-nav__list { list-style: none; margin-top: 60px; padding: 0; }
    .mkw-nav__item { border-bottom: 1px solid rgba(255,255,255,0.08); }
    .mkw-nav__row { display: flex; align-items: stretch; }
    .mkw-nav__link { flex: 1; display: block; color: #fff; text-decoration: none; font-size: 15px; font-weight: 400; letter-spacing: 0.06em; padding: 16px 24px; transition: color 0.18s; }
    .mkw-nav__link:hover { color: #E7CA63; }
    .mkw-nav__link.is-active { color: #E7CA63; }
    .mkw-nav__link--gold { color: #E7CA63 !important; }
    .mkw-nav__chevron { background: none; border: none; cursor: pointer; padding: 0 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .mkw-nav__chevron svg { width: 12px; height: 12px; fill: #E7CA63; transition: transform 0.25s ease; }
    .mkw-nav__chevron.is-open svg { transform: rotate(180deg); }
    .mkw-nav__sub { list-style: none; max-height: 0; overflow: hidden; transition: max-height 0.3s ease; background: rgba(255,255,255,0.04); }
    .mkw-nav__sub.is-open { max-height: 500px; }
    .mkw-nav__sub li { border-top: 1px solid rgba(255,255,255,0.05); }
    .mkw-nav__sub a { display: block; color: #ccc; text-decoration: none; font-size: 13px; font-weight: 400; letter-spacing: 0.04em; padding: 12px 24px 12px 40px; transition: color 0.18s, background 0.18s; }
    .mkw-nav__sub a:hover { color: #E7CA63; background: rgba(231,202,99,0.06); }
    .mkw-footer { background: #f8f9fa; border-top: 1px solid #e4e4e4; padding: 48px 50px 28px; font-family: 'Open Sans', sans-serif; }
    .mkw-footer__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 36px; }
    .mkw-footer__col h4 { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 400; color: #000; margin-bottom: 16px; }
    .mkw-footer__col p { font-size: 14px; color: #444; line-height: 1.8; margin-bottom: 2px; }
    .mkw-footer__email { display: inline-block; margin-top: 10px; font-size: 14px; color: #1a5fa8; text-decoration: none; }
    .mkw-footer__email:hover { text-decoration: underline; }
    .mkw-footer__links { list-style: none; }
    .mkw-footer__links li { margin-bottom: 7px; }
    .mkw-footer__links a { font-size: 14px; color: #444; text-decoration: none; transition: color 0.18s; }
    .mkw-footer__links a:hover { color: #E7CA63; }
    .mkw-footer__bottom { border-top: 1px solid #ddd; padding-top: 18px; }
    .mkw-footer__bottom p { font-size: 12px; color: #888; line-height: 1.7; margin-bottom: 4px; }
    @media (max-width: 600px) { .mkw-footer { padding: 36px 24px 24px; } .mkw-footer__grid { grid-template-columns: 1fr; gap: 32px; } }
  `;

  function currentPage() { return window.location.pathname.split('/').pop() || 'index.html'; }
  function isActive(href) { const page = currentPage(); return href === page || href.endsWith('/' + page); }
  function chevronSVG() { return '<svg viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg"><path d="M0 0l5 6 5-6z"/><\/svg>'; }
  function checkSVG() { return '<svg viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4l3 3 5-6" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><\/svg>'; }

  function buildNavItems() {
    return NAV.map(function(item) {
      const active = isActive(item.href) ? ' is-active' : '';
      const gold = item.gold ? ' mkw-nav__link--gold' : '';
      const ext = item.external ? ' target="_blank" rel="noopener"' : '';
      if (item.children && item.children.length) {
        const subItems = item.children.map(function(child) {
          const cExt = child.external ? ' target="_blank" rel="noopener"' : '';
          return '<li><a href="' + child.href + '"' + cExt + '>' + child.label + '<\/a><\/li>';
        }).join('');
        return '<li class="mkw-nav__item"><div class="mkw-nav__row"><a href="' + item.href + '" class="mkw-nav__link' + active + '">' + item.label + '<\/a><button class="mkw-nav__chevron" aria-label="Expand ' + item.label + '">' + chevronSVG() + '<\/button><\/div><ul class="mkw-nav__sub">' + subItems + '<\/ul><\/li>';
      }
      return '<li class="mkw-nav__item"><div class="mkw-nav__row"><a href="' + item.href + '" class="mkw-nav__link' + active + gold + '"' + ext + '>' + item.label + '<\/a><\/div><\/li>';
    }).join('');
  }

  function buildQuickLinks() {
    return QUICK_LINKS.map(function(link) {
      return '<li><a href="' + link.href + '">' + link.label + '<\/a><\/li>';
    }).join('');
  }

  const styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  const wrapper = document.createElement('div');
  wrapper.innerHTML = '<div class="mkw-overlay" id="mkw-overlay"><\/div><nav class="mkw-nav" id="mkw-nav" aria-label="Main navigation"><button class="mkw-nav__close" id="mkw-nav-close" aria-label="Close navigation">\u2715<\/button><ul class="mkw-nav__list">' + buildNavItems() + '<\/ul><\/nav><header class="mkw-header"><div class="mkw-header__inner"><button class="mkw-hamburger" id="mkw-hamburger" aria-label="Open navigation"><span class="mkw-hamburger__bar"><\/span><span class="mkw-hamburger__bar"><\/span><span class="mkw-hamburger__bar"><\/span><\/button><a href="index.html" class="mkw-logo"><img src="https://static.fmgsuite.com/media/TransparentLogo/variantSize/bc1ca633-db6d-4a03-b5c2-1de9580194f5.png" alt="MK-Wealth" class="mkw-logo__img"><\/a><div class="mkw-header__spacer"><\/div><\/div><div class="mkw-brokercheck"><a href="https://brokercheck.finra.org" target="_blank" rel="noopener"><span class="mkw-brokercheck__circle">' + checkSVG() + '<\/span>BrokerCheck<span class="mkw-brokercheck__finra">BY FINRA<\/span><\/a><\/div><\/header>';

  const footerWrapper = document.createElement('div');
  footerWrapper.innerHTML = '<footer class="mkw-footer"><div class="mkw-footer__grid"><div class="mkw-footer__col"><h4>Contact<\/h4><p>Office: 484-282-5267<\/p><p>1065 Andrew Drive<\/p><p>West Chester, PA 19380<\/p><a href="mailto:ron@mk-wealth.com" class="mkw-footer__email">ron@mk-wealth.com<\/a><\/div><div class="mkw-footer__col"><h4>Quick Links<\/h4><ul class="mkw-footer__links">' + buildQuickLinks() + '<\/ul><\/div><\/div><div class="mkw-footer__bottom"><p>Copyright 2026 FMG Suite.<\/p><p>Advisory services provided through Wealthcare Capital Management dba MK-Wealth. Wealthcare Capital Management is an SEC Registered Investment Advisor.<\/p><\/div><\/footer>';

  document.body.insertBefore(wrapper, document.body.firstChild);
  document.body.appendChild(footerWrapper);

  function openNav() { document.getElementById('mkw-nav').classList.add('is-open'); document.getElementById('mkw-overlay').classList.add('is-open'); document.getElementById('mkw-hamburger').classList.add('is-open'); }
  function closeNav() { document.getElementById('mkw-nav').classList.remove('is-open'); document.getElementById('mkw-overlay').classList.remove('is-open'); document.getElementById('mkw-hamburger').classList.remove('is-open'); document.querySelectorAll('.mkw-nav__sub.is-open').forEach(function(s){s.classList.remove('is-open');}); document.querySelectorAll('.mkw-nav__chevron.is-open').forEach(function(c){c.classList.remove('is-open');}); }

  document.getElementById('mkw-hamburger').addEventListener('click', function() { document.getElementById('mkw-nav').classList.contains('is-open') ? closeNav() : openNav(); });
  document.getElementById('mkw-nav-close').addEventListener('click', closeNav);
  document.getElementById('mkw-overlay').addEventListener('click', closeNav);

  document.querySelectorAll('.mkw-nav__chevron').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const li = btn.closest('.mkw-nav__item');
      const sub = li.querySelector('.mkw-nav__sub');
      const isOpen = sub.classList.contains('is-open');
      document.querySelectorAll('.mkw-nav__sub.is-open').forEach(function(s){s.classList.remove('is-open');});
      document.querySelectorAll('.mkw-nav__chevron.is-open').forEach(function(c){c.classList.remove('is-open');});
      if (!isOpen) { sub.classList.add('is-open'); btn.classList.add('is-open'); }
    });
  });
})();

(function () {
  var style = document.createElement('style');
  style.textContent = [
    '* { box-sizing: border-box; }',
    '.mkw-topbar { background: #1a1a1a; color: #ccc; font-size: 13px; font-family: Arial, sans-serif; padding: 6px 30px; display: flex; justify-content: space-between; align-items: center; }',
    '.mkw-topbar span { margin-right: 20px; }',
    '.mkw-topbar a { color: #ccc; text-decoration: none; }',
    '.mkw-nav { background: #fff; border-bottom: 1px solid #eee; padding: 14px 30px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 1000; box-shadow: 0 1px 4px rgba(0,0,0,0.07); font-family: Arial, sans-serif; }',
    '.mkw-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }',
    '.mkw-logo img { height: 44px; width: auto; }',
    '.mkw-nav-links { display: flex; gap: 28px; align-items: center; font-size: 15px; }',
    '.mkw-nav-links a { color: #333; font-weight: 500; text-decoration: none; padding-bottom: 2px; }',
    '.mkw-nav-links a:hover { color: #2a4d8f; }',
    '.mkw-nav-links a.active { color: #2a4d8f; border-bottom: 2px solid #2a4d8f; }',
    '.mkw-btn-contact { background: #c9a84c; color: #fff !important; padding: 10px 20px; font-size: 14px; font-weight: bold; text-decoration: none; border-bottom: none !important; }',
    '.mkw-btn-contact:hover { background: #b8963e; }',
    '@media (max-width: 768px) {',
    '  .mkw-topbar { flex-direction: column; gap: 4px; text-align: center; padding: 8px 16px; }',
    '  .mkw-nav { flex-wrap: wrap; gap: 12px; padding: 12px 16px; }',
    '  .mkw-nav-links { gap: 14px; flex-wrap: wrap; font-size: 13px; }',
    '}'
  ].join('');
  document.head.appendChild(style);

  var page = window.location.pathname.split('/').pop().replace('.html', '');
  var navMap = {
    'about-wealthcare': 'About Us',
    'meet-the-team': 'About Us',
    'our-beliefs': 'About Us',
    'invest': 'Investing',
    'accumulation-planning': 'Planning',
    'legacy-planning': 'Planning',
    'retirement-planning2': 'Planning',
    'viewpoints': 'Viewpoints',
    'clients': 'Clients'
  };
  var activeLabel = navMap[page] || '';

  var links = [
    { label: 'About Us', href: 'about-wealthcare.html' },
    { label: 'Investing', href: 'invest.html' },
    { label: 'Planning', href: 'accumulation-planning.html' },
    { label: 'Viewpoints', href: 'viewpoints.html' },
    { label: 'Clients', href: 'clients.html' }
  ];

  var navLinksHTML = links.map(function(l) {
    return '<a href="' + l.href + '"' + (l.label === activeLabel ? ' class="active"' : '') + '>' + l.label + '</a>';
  }).join('') + '<a href="contact.html" class="mkw-btn-contact">Contact Us</a>';

  var navHTML = '<div class="mkw-topbar"><div>' +
    '<span>&#128205; 1065 Andrew Drive, West Chester, PA 19380</span>' +
    '<span>&#128222; 484-282-5267</span></div>' +
    '<a href="#">&#128274; Client Login</a></div>' +
    '<nav class="mkw-nav">' +
    '<a class="mkw-logo" href="index.html">' +
    '<img src="https://static.fmgsuite.com/media/TransparentLogo/variantSize/bc1ca633-db6d-4a03-b5c2-1de9580194f5.png" alt="MK-Wealth">' +
    '</a><div class="mkw-nav-links">' + navLinksHTML + '</div></nav>';

  document.body.insertAdjacentHTML('afterbegin', navHTML);
})();

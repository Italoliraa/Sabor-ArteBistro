(function () {
  var SITE = window.SITE, DATA = window.DATA;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var DAYS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  var DS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  var brl = function (n) { return 'R$ ' + n.toFixed(2).replace('.', ','); };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var toMin = function (t) { var p = t.split(':'); return +p[0] * 60 + +p[1]; };
  var toTime = function (m) { return pad(Math.floor(m / 60)) + ':' + pad(m % 60); };
  var fmt = function (t) { return t.replace(':00', 'h').replace(':', 'h'); };
  var cap = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };

  var ICONS = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    whatsapp: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>', plus: '<path d="M5 12h14M12 5v14"/>', minus: '<path d="M5 12h14"/>',
    route: '<path d="M3 11 22 2l-9 19-2-8-8-2z"/>', calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>'
  };
  function icon(n, s, c) { return '<svg class="icon ' + (c || '') + '" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[n] + '</svg>'; }
  function hydrate(root) { $$('[data-icon]', root).forEach(function (el) { el.outerHTML = icon(el.getAttribute('data-icon'), el.getAttribute('data-size') || 22, el.className); }); }
  function wa(t) { return 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(t); }

  /* ---------- Dados fixos ---------- */
  $$('[data-wa]').forEach(function (a) { a.href = wa('Olá! Gostaria de falar com o Sabor & Arte Bistro.'); a.target = '_blank'; a.rel = 'noreferrer'; });
  $$('[data-tel]').forEach(function (a) { a.href = 'tel:' + SITE.phoneRaw; });
  $$('[data-ig]').forEach(function (a) { a.href = SITE.instagramUrl; a.target = '_blank'; a.rel = 'noreferrer'; a.textContent = '@' + SITE.instagramUser; });
  $$('[data-site]').forEach(function (el) { el.textContent = SITE[el.getAttribute('data-site')]; });
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  $('#about-text').textContent = DATA.about;

  /* ---------- Mapa ---------- */
  var q = encodeURIComponent(SITE.mapQuery || SITE.address);
  if (SITE.mapQuery) $('#map').innerHTML = '<iframe title="Mapa com a localização do restaurante" src="https://maps.google.com/maps?q=' + q + '&z=16&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
  $('#map-open').href = 'https://www.google.com/maps/search/?api=1&query=' + q;
  $('#map-route').href = 'https://www.google.com/maps/dir/?api=1&destination=' + q;

  /* ---------- Horários e "aberto agora" ---------- */
  function openInfo(now) {
    var d = now.getDay(), m = now.getHours() * 60 + now.getMinutes(), ps = SITE.hours[d] || [];
    for (var i = 0; i < ps.length; i++) if (m >= toMin(ps[i][0]) && m < toMin(ps[i][1])) return { open: true, text: 'Aberto agora, até ' + fmt(ps[i][1]) };
    for (var k = 0; k < 8; k++) {
      var dd = (d + k) % 7, list = SITE.hours[dd] || [];
      for (var j = 0; j < list.length; j++) {
        if (k === 0 && m >= toMin(list[j][0])) continue;
        return { open: false, text: 'Fechado, abre ' + (k === 0 ? 'hoje' : k === 1 ? 'amanhã' : DAYS[dd]) + ' às ' + fmt(list[j][0]) };
      }
    }
    return { open: false, text: 'Fechado' };
  }
  function paint() { var s = openInfo(new Date()); $$('[data-status]').forEach(function (el) { el.classList.toggle('is-open', s.open); $('span', el).textContent = s.text; }); }
  paint(); setInterval(paint, 60000);
  $('#hours-list').innerHTML = [1, 2, 3, 4, 5, 6, 0].map(function (d) {
    var ps = SITE.hours[d];
    return '<li' + (d === new Date().getDay() ? ' class="is-today"' : '') + '><span>' + cap(DAYS[d]) + '</span><span>' + (ps ? ps.map(function (p) { return fmt(p[0]) + ' às ' + fmt(p[1]); }).join(' e ') : 'Fechado') + '</span></li>';
  }).join('');

  /* ---------- Cardápio ---------- */
  var SHAPES = {
    leaf: '<path d="M4 28C4 12 14 4 30 4c0 16-8 26-26 24Z"/>', blob: '<path d="M16 3c8-2 16 4 14 12s-8 14-16 13S2 20 4 12 10 5 16 3Z"/>',
    half: '<path d="M2 20a14 14 0 0 1 28 0Z"/>', drop: '<path d="M16 2C24 12 28 17 28 21a12 12 0 0 1-24 0c0-4 4-9 12-19Z"/>'
  };
  var state = { text: '', tags: {} };
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  function renderTags() {
    $('#tag-filters').innerHTML = Object.keys(DATA.tags).map(function (k) {
      return '<button type="button" class="pill' + (state.tags[k] ? ' is-on' : '') + '" data-tag="' + k + '" aria-pressed="' + !!state.tags[k] + '">' + DATA.tags[k] + '</button>';
    }).join('');
  }
  function renderMenu() {
    var nq = norm(state.text), active = Object.keys(state.tags).filter(function (k) { return state.tags[k]; }), shown = 0;
    var html = DATA.menu.map(function (c) {
      var items = c.items.filter(function (it) {
        return (!nq || norm(it.name + ' ' + it.desc).indexOf(nq) > -1) && active.every(function (t) { return it.tags.indexOf(t) > -1; });
      });
      if (!items.length) return '';
      shown += items.length;
      return '<section class="cat" id="cat-' + c.id + '" data-cat="' + c.id + '"><h3><svg width="30" height="30" viewBox="0 0 32 32" fill="' + c.color + '" aria-hidden="true">' + SHAPES[c.shape] + '</svg>' + c.name + '</h3><ul class="dishes">' +
        items.map(function (it) {
          return '<li class="dish">' + (it.img ? '<img src="' + it.img + '" alt="' + it.name + '" loading="lazy">' : '') + '<div class="dish__top"><h4>' + it.name + '</h4><span class="dish__price">' + brl(it.price) + '</span></div>' +
            '<p>' + it.desc + '</p><div class="dish__meta">' + (it.chef ? '<span class="chef">' + icon('star', 14) + 'Sugestão da casa</span>' : '') +
            it.tags.map(function (t) { return '<span class="tag">' + DATA.tags[t] + '</span>'; }).join('') + '</div></li>';
        }).join('') + '</ul></section>';
    }).join('');
    $('#menu-list').innerHTML = html || '<p class="empty">Nenhum prato encontrado. Tente outra busca ou limpe os filtros.</p>';
    $('#tabs').hidden = !shown;
  }
  $('#tabs').innerHTML = DATA.menu.map(function (c) { return '<a href="#cat-' + c.id + '" data-tab="' + c.id + '">' + c.name + '</a>'; }).join('');
  $('#search').addEventListener('input', function (e) { state.text = e.target.value; renderMenu(); });
  $('#tag-filters').addEventListener('click', function (e) {
    var b = e.target.closest('[data-tag]'); if (!b) return;
    state.tags[b.getAttribute('data-tag')] = !state.tags[b.getAttribute('data-tag')]; renderTags(); renderMenu();
  });
  renderTags(); renderMenu();
  $('#tabs').addEventListener('click', function (e) {
    var a = e.target.closest('a'); if (!a) return; e.preventDefault();
    var t = $('#cat-' + a.getAttribute('data-tab')); if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
  function spy() {
    var cur = null;
    $$('.cat').forEach(function (c) { if (c.getBoundingClientRect().top < 170) cur = c.getAttribute('data-cat'); });
    $$('#tabs a').forEach(function (a) {
      var on = a.getAttribute('data-tab') === cur; a.classList.toggle('is-on', on);
      if (on && a.scrollIntoView && $('#tabs').scrollWidth > $('#tabs').clientWidth) $('#tabs').scrollTo({ left: a.offsetLeft - 20, behavior: 'smooth' });
    });
  }

  hydrate(document);

  /* ---------- Reserva imediata ---------- */
  var dlg = $('#reserve'), rs = { party: 2, date: null, time: '' };
  var days = [];
  for (var i = 0; days.length < 7 && i < 21; i++) { var d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + i); if (SITE.hours[d.getDay()]) days.push(d); }
  function dayLabel(d) { var diff = Math.round((d - new Date(new Date().setHours(0, 0, 0, 0))) / 864e5); return (diff === 0 ? 'Hoje' : diff === 1 ? 'Amanhã' : DS[d.getDay()]) + ' ' + pad(d.getDate()) + '/' + pad(d.getMonth() + 1); }
  $('#r-days').innerHTML = days.map(function (d, i) { return '<label class="chip"><input type="radio" name="day" value="' + i + '"><span>' + dayLabel(d) + '</span></label>'; }).join('');
  function slots(d) {
    var out = [], now = new Date(), today = d.toDateString() === now.toDateString(), min = today ? now.getHours() * 60 + now.getMinutes() + 30 : 0;
    SITE.hours[d.getDay()].forEach(function (p) { for (var m = toMin(p[0]); m + 60 <= toMin(p[1]); m += SITE.slotMinutes) if (m >= min) out.push(toTime(m)); });
    return out;
  }
  function times() {
    rs.time = '';
    if (!rs.date) { $('#r-times').innerHTML = '<p class="hint">Escolha um dia para ver os horários.</p>'; return sum(); }
    var s = slots(rs.date);
    $('#r-times').innerHTML = s.length ? s.map(function (t) { return '<label class="chip chip--sm"><input type="radio" name="time" value="' + t + '"><span>' + t + '</span></label>'; }).join('') : '<p class="hint">Sem horários livres neste dia. Escolha outro dia.</p>';
    sum();
  }
  function sum() {
    var big = rs.party > SITE.maxParty;
    $('#r-count').textContent = rs.party;
    $('#r-minus').disabled = rs.party <= 1; $('#r-plus').disabled = rs.party >= SITE.maxParty + 1;
    $('#r-big').hidden = !big;
    var p = [rs.party + (rs.party === 1 ? ' pessoa' : ' pessoas')]; if (rs.date) p.push(dayLabel(rs.date).toLowerCase()); if (rs.time) p.push('às ' + rs.time);
    $('#r-sum').textContent = p.join(' · ');
    $('#r-btn').disabled = !(rs.date && rs.time && !big);
  }
  $('#r-minus').addEventListener('click', function () { rs.party = Math.max(1, rs.party - 1); sum(); });
  $('#r-plus').addEventListener('click', function () { rs.party = Math.min(SITE.maxParty + 1, rs.party + 1); sum(); });
  $('#r-days').addEventListener('change', function (e) { rs.date = days[+e.target.value]; times(); });
  $('#r-times').addEventListener('change', function (e) { rs.time = e.target.value; sum(); });
  times();

  function openDlg() { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); document.body.style.overflow = 'hidden'; }
  function closeDlg() { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); document.body.style.overflow = ''; }
  $$('[data-reserve]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); setMenu(false); openDlg(); }); });
  $('#r-close').addEventListener('click', closeDlg);
  dlg.addEventListener('close', function () { document.body.style.overflow = ''; });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) closeDlg(); });
  $('#r-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#r-name').value.trim();
    if (name.length < 2) { $('#r-err').textContent = 'Informe o nome para a reserva.'; $('#r-name').focus(); return; }
    $('#r-err').textContent = '';
    var obs = $('#r-obs').value.trim();
    var t = 'Olá! Quero reservar uma mesa no Sabor & Arte Bistro.\nNome: ' + name + '\nPessoas: ' + rs.party + '\nDia: ' + dayLabel(rs.date) + '\nHorário: ' + rs.time + (obs ? '\nObservações: ' + obs : '') + '\nPodem confirmar?';
    window.open(wa(t), '_blank', 'noopener');
  });

  /* ---------- Menu, rolagem, animações ---------- */
  var header = $('.header'), nav = $('#nav'), burger = $('.burger');
  function onScroll() { header.classList.toggle('is-solid', window.scrollY > 24 || nav.classList.contains('is-open')); spy(); }
  function setMenu(o) { nav.classList.toggle('is-open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Fechar menu' : 'Abrir menu'); burger.innerHTML = icon(o ? 'x' : 'menu', 26); document.body.style.overflow = o ? 'hidden' : ''; onScroll(); }
  burger.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  $$('a', nav).concat($$('.logo')).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('scroll', onScroll, { passive: true });
  burger.innerHTML = icon('menu', 26); onScroll();

  var items = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else items.forEach(function (el) { el.classList.add('is-in'); });
})();

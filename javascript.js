  /* ─── THEME SWITCHER ─── */
  const body = document.body;
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      body.dataset.theme = btn.dataset.t;
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ─── HAMBURGER ─── */
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });

  /* ─── SCROLL REVEAL ─── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(r => observer.observe(r));

  /* ─── NAV ACTIVE ─── */
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.style.color = a.getAttribute('href') === `#${cur}` ? 'var(--accent)' : '';
    });
  });

  /* ─── MODAL DE SERVIÇO ─── */
  const backdrop = document.getElementById('modalBackdrop');

  // dados extras por serviço (descrições longas, se quiser foto real por serviço)
  function abrirModal(el) {
    const d = el.dataset;
    document.getElementById('modalNome').textContent  = d.nome;
    document.getElementById('modalEsp').textContent   = '✦ ' + d.esp;
    document.getElementById('modalDesc').textContent  = d.desc;
    document.getElementById('modalPreco').textContent = d.preco;
    document.getElementById('modalTempo').textContent = '⏱ ' + d.tempo;
    document.getElementById('modalIcon').textContent  = d.icon;

    // Link WhatsApp com serviço pré-preenchido
    const msg = encodeURIComponent(`Olá! Quero agendar: ${d.nome} (${d.preco})`);
    document.getElementById('modalWppLink').href = `https://wa.me/5551999999999?text=${msg}`;

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function fecharModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Fechar ao clicar fora
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) fecharModal();
  });

  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();
  });
(() => {
  const navToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const buttons = group.querySelectorAll('button[data-filter]');
    const targetSelector = group.getAttribute('data-target');
    const items = targetSelector ? document.querySelectorAll(targetSelector) : [];

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        buttons.forEach(btn => btn.setAttribute('aria-pressed', btn === button ? 'true' : 'false'));

        items.forEach(item => {
          const status = item.dataset.status || '';
          const tags = item.dataset.tags || '';

          let visible = true;
          if (filter === 'all') {
            visible = true;
          } else if (filter.startsWith('status:')) {
            visible = status === filter.split(':')[1];
          } else if (filter.startsWith('tag:')) {
            visible = tags.includes(filter.split(':')[1]);
          }
          item.style.display = visible ? '' : 'none';
        });
      });
    });
  });

  document.querySelectorAll('[data-tab-group]').forEach(group => {
    const buttons = group.querySelectorAll('[role="tab"]');
    const panels = document.querySelectorAll(group.dataset.target || '');

    const activate = id => {
      buttons.forEach(btn => btn.setAttribute('aria-pressed', btn.dataset.tab === id ? 'true' : 'false'));
      panels.forEach(panel => {
        panel.hidden = panel.id !== id;
      });
    };

    buttons.forEach(btn => {
      btn.addEventListener('click', () => activate(btn.dataset.tab));
    });

    const first = buttons[0];
    if (first) activate(first.dataset.tab);
  });

  document.querySelectorAll('[data-range-output]').forEach(range => {
    const output = document.querySelector(range.dataset.rangeOutput);
    const map = JSON.parse(range.dataset.rangeMap || '{}');
    if (!output) return;

    const update = () => {
      const value = range.value;
      output.textContent = map[value] || map.default || value;
    };

    range.addEventListener('input', update);
    update();
  });
})();

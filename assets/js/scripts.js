
window.MathJax = {
    tex: {
        inlineMath: [["$", "$"], ["\\(", "\\)"]],
        displayMath: [["$$", "$$"], ["\\[", "\\]"]],
        tags: "ams",
        packages: { '[+]': ['noerrors'] }
    },
    options: { skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'] }
};



/* === TOC repliable (mobile) === */
(function () {
    const toc = document.querySelector('.toc');
    if (!toc) return;

    if (!toc.querySelector('.toc__header')) {
        const h = document.createElement('div');
        h.className = 'toc__header';
        h.innerHTML =
            '<strong>Table des matières</strong> ' +
            '<button class="toc__btn" aria-expanded="false" aria-controls="toc-panel">Afficher</button>';
        const panel = document.createElement('div');
        panel.className = 'toc__panel';
        panel.id = 'toc-panel';

        const nav = toc.querySelector('nav');
        if (nav) panel.appendChild(nav);
        toc.prepend(h);
        toc.appendChild(panel);

        const btn = h.querySelector('.toc__btn');
        const toggle = () => {
            const open = toc.classList.toggle('toc--open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            btn.textContent = open ? 'Masquer' : 'Afficher';
        };
        btn.addEventListener('click', toggle, { passive: true });
    }
})();

/* === Surbrillance de la section active === */
(function () {
    // évite double init si le script est inclus 2x
    if (window.__omegaTScrollInit) return;
    window.__omegaTScrollInit = true;

    const secs = Array.from(document.querySelectorAll('main section[id]'));
    const tocAs = Array.from(document.querySelectorAll('.toc nav a'));
    if (!secs.length || !tocAs.length) return;

    const onScroll = () => {
        const y = window.scrollY + 120;
        let current = secs[0]?.id;
        for (const s of secs) {
            const top = s.getBoundingClientRect().top + window.scrollY;
            if (top <= y) current = s.id;
        }
        tocAs.forEach(a =>
            a.classList.toggle('active', a.getAttribute('href') === '#' + current)
        );
    };

    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();
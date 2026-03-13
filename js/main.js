/* ============================================================
   PromptForge — Main Interactions & Scroll Behavior
   js/main.js
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Reading Progress Bar ─────────────────────────────── */
    const progressBar = document.querySelector('.reading-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) progressBar.style.width = pct + '%';
    }, { passive: true });


    /* ── IntersectionObserver — Scroll Reveals ────────────── */
    const revealClasses = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale'];
    const revealEls = document.querySelectorAll(revealClasses.join(','));

    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after first reveal for performance
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

    revealEls.forEach(el => revealObs.observe(el));

    /* Re-observe newly rendered elements (content.js adds them async) */
    setTimeout(() => {
        document.querySelectorAll(revealClasses.join(',')).forEach(el => {
            if (!el.classList.contains('visible')) revealObs.observe(el);
        });
    }, 200);


    /* ── Sidebar Active Link Tracking ─────────────────────── */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item[data-target]');
    const progressFill = document.querySelector('.progress-fill');
    const totalSections = sections.length;

    let activeSectionIndex = 0;

    const sectionObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navItems.forEach(item => {
                    item.classList.toggle('active', item.dataset.target === id);
                });

                // Update progress
                const sectionArr = Array.from(sections);
                const idx = sectionArr.findIndex(s => s.id === id);
                if (idx >= 0) {
                    activeSectionIndex = idx;
                    const pct = ((idx + 1) / totalSections) * 100;
                    if (progressFill) progressFill.style.width = pct + '%';
                }
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(s => sectionObs.observe(s));


    /* ── Smooth Scroll on Nav Click ───────────────────────── */
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.dataset.target;
            const target = document.getElementById(targetId);
            if (!target) return;

            // Close mobile sidebar
            closeSidebar();

            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });


    /* ── Mobile Hamburger ────────────────────────────────── */
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    function openSidebar() {
        sidebar?.classList.add('open');
        overlay?.classList.add('visible');
        hamburger?.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar?.classList.remove('open');
        overlay?.classList.remove('visible');
        hamburger?.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburger?.addEventListener('click', () => {
        sidebar?.classList.contains('open') ? closeSidebar() : openSidebar();
    });
    overlay?.addEventListener('click', closeSidebar);


    /* ── Hero Typing Animation ───────────────────────────── */
    const typingEl = document.getElementById('hero-typing');
    if (typingEl) {
        const phrases = [
            'Master Prompt Engineering.',
            'Unlock AI\'s True Potential.',
            'Craft Perfect AI Instructions.',
            'Build Smarter AI Systems.',
        ];
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let typingTimer = null;

        function typeWrite() {
            const current = phrases[phraseIdx];

            if (!isDeleting) {
                typingEl.textContent = current.slice(0, charIdx + 1);
                charIdx++;
                if (charIdx === current.length) {
                    isDeleting = true;
                    typingTimer = setTimeout(typeWrite, 2000); // pause before delete
                    return;
                }
            } else {
                typingEl.textContent = current.slice(0, charIdx - 1);
                charIdx--;
                if (charIdx === 0) {
                    isDeleting = false;
                    phraseIdx = (phraseIdx + 1) % phrases.length;
                }
            }

            const speed = isDeleting ? 50 : 80;
            typingTimer = setTimeout(typeWrite, speed);
        }

        typeWrite();
    }


    /* ── Stats Counter Animation ─────────────────────────── */
    const statEls = document.querySelectorAll('.stat-num[data-target]');
    const statsObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || '';
            let start = 0;
            const step = Math.ceil(target / 60);
            const timer = setInterval(() => {
                start += step;
                if (start >= target) {
                    el.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    el.textContent = start + suffix;
                }
            }, 20);
            statsObs.unobserve(el);
        });
    }, { threshold: 0.5 });
    statEls.forEach(el => statsObs.observe(el));


    /* ── Smooth keyboard navigation ──────────────────────── */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' && e.altKey) {
            e.preventDefault();
            const sectionArr = Array.from(sections);
            const next = sectionArr[activeSectionIndex + 1];
            if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (e.key === 'ArrowUp' && e.altKey) {
            e.preventDefault();
            const sectionArr = Array.from(sections);
            const prev = sectionArr[Math.max(0, activeSectionIndex - 1)];
            if (prev) prev.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });


    /* ── Tooltip: keyboard shortcut hint ────────────────── */
    const kbHint = document.getElementById('kb-hint');
    if (kbHint) {
        setTimeout(() => { kbHint.style.opacity = '1'; }, 3000);
        setTimeout(() => { kbHint.style.opacity = '0'; }, 7000);
    }

});

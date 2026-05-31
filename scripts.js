document.addEventListener('DOMContentLoaded', () => {
    const tasks = document.querySelectorAll('.task');
    if (tasks.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });
        tasks.forEach(t => observer.observe(t));
    }

    function updateBannerHeight() {
        const banner = document.querySelector('.page-banner');
        const h = banner ? Math.ceil(banner.getBoundingClientRect().height) : 0;
        document.documentElement.style.setProperty('--banner-height', h + 'px');
    }
    updateBannerHeight();
    window.addEventListener('resize', updateBannerHeight, { passive: true });

    const toggle = document.getElementById('page-toggle');
    if (toggle) {
        const fileName = (location.pathname.split('/').pop() || '').toLowerCase();
        toggle.checked = fileName === 'tasca_1_4.html';
        toggle.addEventListener('change', () => {
            const target = toggle.checked ? 'tasca_1_4.html' : 'tasca_1_2.html';
            location.href = target;
        });
    }

    const modal = document.getElementById('task-modal');
    if (modal) {
        const iframe = document.getElementById('task-iframe');
        const openButtons = document.querySelectorAll('[data-src]');

        const openModal = (src) => {
            if (iframe) {
                iframe.src = src || '';
            }
            modal.classList.add('is-open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
        };

        const closeModal = () => {
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
            if (iframe) {
                iframe.src = '';
            }
        };

        openButtons.forEach((button) => {
            button.addEventListener('click', () => {
                openModal(button.getAttribute('data-src'));
            });
        });

        modal.addEventListener('click', (event) => {
            if (event.target && event.target.hasAttribute('data-modal-close')) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('is-open')) {
                closeModal();
            }
        });
    }
});

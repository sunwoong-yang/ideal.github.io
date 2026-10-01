(function () {
    'use strict';
    const slides = Array.from(document.querySelectorAll('.seminar-slide'));
    const previous = document.getElementById('previous');
    const next = document.getElementById('next');
    const count = document.getElementById('slide-count');
    const dots = document.querySelector('.slide-dots');
    const dialog = document.getElementById('sources-dialog');
    let current = 0;

    slides.forEach(function (slide, index) {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', (index + 1) + '번: ' + slide.querySelector('h1,h2').textContent);
        button.addEventListener('click', function () { show(index, true); });
        dots.appendChild(button);
    });

    function show(index, focusHeading) {
        current = Math.max(0, Math.min(index, slides.length - 1));
        slides.forEach(function (slide, position) {
            const active = position === current;
            slide.classList.toggle('active', active);
            slide.classList.toggle('before', position < current);
            slide.inert = !active;
            slide.setAttribute('aria-hidden', String(!active));
            if (active) slide.scrollTop = 0;
            if (active) dots.children[position].setAttribute('aria-current', 'step');
            else dots.children[position].removeAttribute('aria-current');
        });
        previous.disabled = current === 0;
        next.disabled = current === slides.length - 1;
        count.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
        // Keep URL state separate from element IDs so the browser does not scroll
        // the presentation behind the fixed shared navbar during initial load.
        history.replaceState(null, '', '#part-' + (current + 1));
        if (focusHeading) slides[current].querySelector('h1,h2').focus({ preventScroll: true });
    }

    previous.addEventListener('click', function () { show(current - 1, true); });
    next.addEventListener('click', function () { show(current + 1, true); });
    document.addEventListener('keydown', function (event) {
        if (document.querySelector('dialog[open]') || event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
        let target;
        if (event.key === 'ArrowRight' || event.key === 'PageDown') target = current + 1;
        if (event.key === 'ArrowLeft' || event.key === 'PageUp') target = current - 1;
        if (event.key === 'Home') target = 0;
        if (event.key === 'End') target = slides.length - 1;
        if (target !== undefined) { event.preventDefault(); show(target, true); }
    });
    let touchStart = null;
    const windowElement = document.querySelector('.slide-window');
    windowElement.addEventListener('touchstart', function (event) {
        if (event.touches.length !== 1 || event.target.closest('a,button')) { touchStart = null; return; }
        touchStart = [event.touches[0].clientX, event.touches[0].clientY];
    }, { passive: true });
    windowElement.addEventListener('touchend', function (event) {
        if (!touchStart) return;
        const dx = event.changedTouches[0].clientX - touchStart[0];
        const dy = event.changedTouches[0].clientY - touchStart[1];
        if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1), true);
        touchStart = null;
    }, { passive: true });
    document.getElementById('sources-open').addEventListener('click', function () { dialog.showModal(); });
    document.getElementById('sources-close').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); });
    const fundingDialog = document.getElementById('funding-dialog');
    document.getElementById('funding-open').addEventListener('click', function () { fundingDialog.showModal(); });
    document.getElementById('funding-close').addEventListener('click', function () { fundingDialog.close(); });
    fundingDialog.addEventListener('click', function (event) { if (event.target === fundingDialog) fundingDialog.close(); });
    const fullscreen = document.getElementById('fullscreen');
    if (!document.fullscreenEnabled) fullscreen.hidden = true;
    fullscreen.addEventListener('click', async function () {
        try {
            if (document.fullscreenElement) await document.exitFullscreen();
            else await document.querySelector('.seminar').requestFullscreen();
        } catch (_) { fullscreen.textContent = '브라우저 전체화면: F11'; }
    });
    document.addEventListener('fullscreenchange', function () {
        fullscreen.textContent = document.fullscreenElement ? '전체화면 닫기 ⛶' : '전체화면 ⛶';
    });
    function fromHash() {
        const match = location.hash.match(/^#part-(\d+)$/);
        show(match ? Number(match[1]) - 1 : 0, false);
    }
    window.addEventListener('hashchange', fromHash);
    fromHash();
}());

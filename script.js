// HillwoodsNews — shared interactions
document.addEventListener('DOMContentLoaded', () => {

  // Mobile menu toggle
  const navToggle = document.querySelector('.masthead__nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu__close');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  }
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileMenu.classList.remove('open'))
    );
  }

  // Dark mode toggle (session only — no persistence by design)
  const darkToggle = document.querySelector('.js-dark-toggle');
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      darkToggle.setAttribute('aria-pressed', isDark);
      darkToggle.innerHTML = isDark ? sunIcon() : moonIcon();
    });
  }

  // Search overlay
  const searchToggle = document.querySelector('.js-search-toggle');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchClose = document.querySelector('.search-overlay__close');
  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', () => {
      searchOverlay.classList.add('open');
      const input = searchOverlay.querySelector('input');
      if (input) setTimeout(() => input.focus(), 50);
    });
  }
  if (searchClose && searchOverlay) {
    searchClose.addEventListener('click', () => searchOverlay.classList.remove('open'));
  }
  if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) searchOverlay.classList.remove('open');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') searchOverlay.classList.remove('open');
    });
  }

  // Newsletter form (front-end only demo)
  document.querySelectorAll('.newsletter__form, .sidebar-newsletter').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Subscribed ✓';
      setTimeout(() => { btn.textContent = original; form.reset(); }, 2000);
    });
  });

  // Comment form (front-end only demo)
  const commentForm = document.querySelector('.comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const textarea = commentForm.querySelector('textarea');
      if (!textarea.value.trim()) return;
      const list = document.querySelector('.comments-list');
      const item = document.createElement('div');
      item.className = 'comment';
      item.innerHTML = `
        <div class="press-id__avatar">YOU</div>
        <div class="comment__body">
          <b>You</b><span>JUST NOW · PENDING APPROVAL</span>
          <p>${textarea.value.replace(/</g,'&lt;')}</p>
        </div>`;
      list.prepend(item);
      textarea.value = '';
    });
  }
});

function moonIcon(){
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}
function sunIcon(){
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`;
}
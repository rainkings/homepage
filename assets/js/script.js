'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });

  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);

    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn.length ? filterBtn[0] : null;

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Helper: open a portfolio story by slug
function openPortfolioStoryBySlug(slug) {
  if (!slug) return false;
  const target = String(slug).toLowerCase();
  const buttons = document.querySelectorAll('.project-card[data-story-slug]');
  for (let i = 0; i < buttons.length; i++) {
    const attr = (buttons[i].getAttribute('data-story-slug') || '').toLowerCase();
    if (attr === target) { buttons[i].click(); return true; }
  }
  return false;
}

function collapsePortfolioDetail() {
  const detail = document.getElementById('portfolio-detail');
  const grid = document.querySelector('.portfolio .projects');
  if (detail) {
    detail.innerHTML = '';
    detail.style.display = 'none';
  }
  if (grid) grid.style.display = '';
}

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const target = this.innerHTML.toLowerCase();

    // toggle pages
    for (let j = 0; j < pages.length; j++) {
      const isActive = target === pages[j].dataset.page;
      pages[j].classList.toggle("active", isActive);
      if (isActive) {
        window.scrollTo(0, 0);
        try { history.replaceState(null, "", `#${pages[j].dataset.page}`); } catch (e) {}
      }
    }

    // If navigating to Portfolio, ensure cards are visible and detail collapsed
    if (target === 'portfolio') {
      collapsePortfolioDetail();
    }

    // toggle nav links (decoupled from pages index)
    for (let k = 0; k < navigationLinks.length; k++) {
      const match = navigationLinks[k].innerHTML.toLowerCase() === target;
      navigationLinks[k].classList.toggle("active", match);
    }
  });
}

// Activate page from URL hash on load (e.g., #portfolio)
(function activateFromHash() {
  const hash = (location.hash || "").replace(/^#/, "").toLowerCase();
  if (!hash) return;
  const [pageHash, queryStr] = hash.split('?');
  for (let i = 0; i < pages.length; i++) {
    const isTarget = pages[i].dataset.page === pageHash;
    pages[i].classList.toggle("active", isTarget);
  }
  for (let k = 0; k < navigationLinks.length; k++) {
    const match = navigationLinks[k].innerHTML.toLowerCase() === pageHash;
    navigationLinks[k].classList.toggle("active", match);
  }
  if (pageHash === 'portfolio') {
    collapsePortfolioDetail();
    if (queryStr) {
      const params = new URLSearchParams(queryStr);
      const story = params.get('story');
      if (story) {
        // try now; if cards not built yet, defer
        if (!openPortfolioStoryBySlug(story)) {
          window._pendingStorySlug = story;
        }
      }
    }
  }
  window.scrollTo(0, 0);
})();

// Respond to in-app hash changes (e.g., clicking [story] links)
window.addEventListener('hashchange', function(){
  const hashRaw = (location.hash || "").replace(/^#/, "").toLowerCase();
  if (!hashRaw) return;
  const [pageHash, queryStr] = hashRaw.split('?');

  // Toggle pages
  for (let i = 0; i < pages.length; i++) {
    const isTarget = pages[i].dataset.page === pageHash;
    pages[i].classList.toggle("active", isTarget);
  }
  // Toggle nav links
  for (let k = 0; k < navigationLinks.length; k++) {
    const match = navigationLinks[k].innerHTML.toLowerCase() === pageHash;
    navigationLinks[k].classList.toggle("active", match);
  }

  if (pageHash === 'portfolio') {
    collapsePortfolioDetail();
    if (queryStr) {
      const params = new URLSearchParams(queryStr);
      const story = params.get('story');
      if (story) {
        if (!openPortfolioStoryBySlug(story)) {
          window._pendingStorySlug = story;
        }
      }
    }
  }
  window.scrollTo(0, 0);
});

// Portfolio: render story inline on card click
document.addEventListener("click", function (e) {
  const btn = e.target.closest('.project-card');
  if (!btn) return;
  const container = document.getElementById('portfolio-detail');
  if (!container) return;
  const grid = document.querySelector('.portfolio .projects');
  const title = btn.getAttribute('data-story-title') || 'Story';
  const img = btn.getAttribute('data-story-img') || '';
  const caption = btn.getAttribute('data-story-caption') || title;
  const mdInline = btn.getAttribute('data-story-md') || '';
  const mdUrl = btn.getAttribute('data-story-md-url');

  // ensure hover styles exist for the back button
  (function ensurePortfolioStyles(){
    const styleId = 'portfolio-inline-style';
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
#portfolio-detail{position:relative}
#portfolio-actions{position:sticky;bottom:24px;display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:24px;width:100%}
#portfolio-back,#portfolio-top{cursor:pointer;transition:transform .15s ease, box-shadow .15s ease, opacity .15s ease;opacity:.8}
#portfolio-back{margin-left:0 !important;margin-right:auto}
#portfolio-top{margin-left:auto}
#portfolio-back:hover,#portfolio-top:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.25);opacity:1}
/* Constrain images in the story panel */
#portfolio-detail figure{margin:12px 0}
#portfolio-detail img{max-width:100%;height:auto;border-radius:10px}
#portfolio-detail figure img{display:block;width:100%;height:auto;max-height:280px;object-fit:contain}
#portfolio-detail video{max-width:100%;height:auto;border-radius:10px;display:block}
`;
    document.head.appendChild(style);
  })();

  let backBtn = `<button type=\"button\" id=\"portfolio-back\" class=\"form-btn\"><ion-icon name=\"arrow-back\"></ion-icon><span style=\"margin-left:6px;\">Back to list</span></button>`;
  let topBtn = `<button type=\"button\" id=\"portfolio-top\" class=\"form-btn\"><ion-icon name=\"arrow-up\"></ion-icon><span style=\"margin-left:6px;\">Top</span></button>`;
  let headerHtml = `<header><h3 class=\"h3\" style=\"margin:0 0 12px 0;\">${title}</h3></header>`;
  let coverHtml = '';
  let actionsHtml = `<div id=\"portfolio-actions\">${backBtn}${topBtn}</div>`;
  container.innerHTML = headerHtml + coverHtml + `<div id=\"portfolio-body\" class=\"about-text\"></div>` + actionsHtml;
  container.style.display = '';
  if (grid) grid.style.display = 'none';
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const back = document.getElementById('portfolio-back');
  if (back) back.addEventListener('click', function(){
    collapsePortfolioDetail();
  });
  const top = document.getElementById('portfolio-top');
  if (top) top.addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // load markdown (inline or from URL)
  const bodyEl = document.getElementById('portfolio-body');
  const fixRelativeUrls = (container, baseDir) => {
    const needsPrefix = (url) => !!url && !/^([a-z]+:)?\/\//i.test(url) && !url.startsWith('/') && !url.startsWith('#');
    const prefix = (url) => baseDir + url.replace(/^\.\//, '');
    container.querySelectorAll('img[src], video[src], source[src], a[href]').forEach(el => {
      if (el.hasAttribute('src')) {
        const src = el.getAttribute('src');
        if (needsPrefix(src)) el.setAttribute('src', prefix(src));
      }
      if (el.hasAttribute('href')) {
        const href = el.getAttribute('href');
        if (needsPrefix(href)) el.setAttribute('href', prefix(href));
      }
    });
  };
  const renderMd = (mdText) => {
    bodyEl.innerHTML = (window.marked ? marked.parse(mdText) : mdText);
    if (mdUrl) {
      const baseDir = mdUrl.replace(/[^\/]+$/, '');
      fixRelativeUrls(bodyEl, baseDir);
    }
    // Ensure videos reload with updated sources and have controls
    bodyEl.querySelectorAll('video').forEach(v => {
      if (!v.hasAttribute('controls')) v.setAttribute('controls', '');
      try { v.load(); } catch (e) {}
    });
  };
  if (mdUrl) {
    fetch(mdUrl).then(r => r.text()).then(renderMd).catch(() => renderMd('Failed to load story.'));
  } else {
    renderMd(mdInline);
  }
});

// Build Portfolio cards from manifest.json
(function buildPortfolioCards(){
  const list = document.getElementById('portfolio-list');
  if (!list) return;
  fetch('blogs/papers/manifest.json')
    .then(r => r.json())
    .then(items => {
      const html = items.map(it => {
        const mdPath = (it.markdown && typeof it.markdown === 'string')
          ? `blogs/papers/${it.markdown.replace(/^\\.\\\//, '')}`
          : `blogs/papers/${it.slug}/story.md`;
        const baseDir = mdPath.replace(/[^\/]+$/, ''); // e.g., blogs/papers/<slug>/
        const papersRoot = 'blogs/papers/';
        const resolvePath = (p) => {
          if (!p) return '';
          if (/^([a-z]+:)?\/\//i.test(p) || p.startsWith('/')) return p; // absolute or URL
          if (p.startsWith('./')) {
            // Treat './...' as relative to papers root (same as manifest location)
            return papersRoot + p.slice(2);
          }
          // Bare filenames like 'cover.png' resolve next to the markdown file
          return baseDir + p;
        };
        const coverPath = resolvePath(it.cover || 'cover.png');
        const slugAttr = String(it.slug || '').trim().toLowerCase();
        return `
        <li class=\"project-item active\" data-filter-item data-category=\"${(it.category||'paper')}\"> 
          <button class=\"project-card\" data-story-slug=\"${slugAttr}\" data-story-title=\"${it.title}\" data-story-img=\"${coverPath}\" data-story-caption=\"${(it.coverCaption||'')}\" data-story-md-url=\"${mdPath}\"> 
            <figure class=\"project-img\"> 
              <div class=\"project-item-icon-box\"><ion-icon name=\"eye-outline\"></ion-icon></div> 
              <img src=\"${coverPath}\" alt=\"${it.title}\" loading=\"lazy\"> 
            </figure> 
            <h3 class=\"project-title\">${it.title}</h3> 
            <p class=\"project-category\">${(it.category||'Paper')}</p> 
          </button> 
        </li>`;
      }).join('');
      list.innerHTML = html;
      // handle pending story deep link
      if (window._pendingStorySlug) {
        const slug = window._pendingStorySlug; delete window._pendingStorySlug;
        openPortfolioStoryBySlug(slug);
      }
      // Inject [story] links into Resume publications automatically
      try {
        const pubLis = document.querySelectorAll('article.resume li');
        for (let i = 0; i < items.length; i++) {
          const slugRaw = String(items[i].slug || '');
          const slugParam = encodeURIComponent(slugRaw);
          const titleLc = String(items[i].title || '').toLowerCase();
          for (let j = 0; j < pubLis.length; j++) {
            const li = pubLis[j];
            // If a hardcoded story link already exists, skip (backup-only injection)
            if (li.querySelector('a[href^="#portfolio?story="]')) continue;
            if (li.querySelector('a[data-story-link]')) continue;
            const liText = li.textContent.toLowerCase();
            if (!titleLc || !liText.includes(titleLc)) continue;
            const a = document.createElement('a');
            a.href = `#portfolio?story=${slugParam}`;
            a.className = 'web-link';
            a.setAttribute('data-story-link', '');
            a.style.display = 'inline';
            a.style.marginLeft = '8px';
            a.textContent = '[story]';
            li.appendChild(document.createTextNode(' '));
            li.appendChild(a);
            break;
          }
        }
      } catch (e) {}
    })
    .catch(() => { list.innerHTML = '<li><p>Failed to load papers manifest.</p></li>'; });
})();
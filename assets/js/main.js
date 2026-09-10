/**
 * BRAINWAVE TRIVIA — Master JavaScript Foundation
 * Template 2 Interactive Engine
 */

initPageLoader();

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDirection();
  initNavbarScroll();
  initMobileNavigation();
  initDesktopDropdown();
  initBackToTop();
  initActiveNavLink();
  initInteractiveElements();
  initHome1Interactions();
  initHome2Interactions();
  initScheduleInteractions();
  initVenuesInteractions();
  initEventsInteractions();
  initHostInteractions();
  initContactInteractions();
  initPortalInteractions();
  initLeaderboardInteractions();
  initScrollReveal();
  initRadarCountdown();
});

/* --------------------------------------------------------------------------
   0. Attractive Site Preloader Functionality (Snappy ~0.5s Experience)
   -------------------------------------------------------------------------- */
function initPageLoader() {
  const loader = document.getElementById('sitePreloader');
  if (!loader) return;

  const progressBar = loader.querySelector('.preloader-progress-bar');
  const statusEl = loader.querySelector('.preloader-status');

  const steps = [
    { progress: '40%', text: 'INITIALIZING TRIVIA CIRCUIT...', delay: 30 },
    { progress: '80%', text: 'CALIBRATING ARENA...', delay: 150 },
    { progress: '100%', text: '⚡ READY TO PLAY!', delay: 320 }
  ];

  steps.forEach(step => {
    setTimeout(() => {
      if (progressBar) progressBar.style.width = step.progress;
      if (statusEl) statusEl.textContent = step.text;
    }, step.delay);
  });

  function hideLoader() {
    loader.classList.add('fade-out');
    setTimeout(() => {
      if (loader && loader.parentNode) {
        loader.style.display = 'none';
      }
    }, 300);
  }

  // Snappy 0.5s duration
  setTimeout(hideLoader, 500);
}

/* --------------------------------------------------------------------------
   Home 2 Interactive Features (Buzzer Simulation, Flightboard & Vault Selector)
   -------------------------------------------------------------------------- */
function initHome2Interactions() {
  // 1. Smartphone Live Buzzer Simulation
  const buzzerBtn = document.getElementById('h2BuzzerBtn');
  const feedback = document.getElementById('buzzerFeedback');

  if (buzzerBtn && feedback) {
    buzzerBtn.addEventListener('click', () => {
      buzzerBtn.classList.add('buzzer-pressed');

      // Random reaction speed
      const randomLatency = (0.24 + Math.random() * 0.16).toFixed(2);

      feedback.innerHTML = `<span class="buzzer-latency-chip" style="background:rgba(6,214,160,0.25); color:#06D6A0; border-color:#06D6A0;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>⚡ LOCKED IN! Latency: <strong>${randomLatency}s</strong> &bull; +50 Pts</span>
      </span>`;

      // Audio chime trigger using Web Audio API
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880.00, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } catch (e) {}

      setTimeout(() => {
        buzzerBtn.classList.remove('buzzer-pressed');
      }, 350);
    });
  }

  // 2. Flightboard Tour Filter
  const filterBtns = document.querySelectorAll('[data-tour-filter]');
  const flightRows = document.querySelectorAll('.flightboard-row');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-tour-filter');
      flightRows.forEach(row => {
        const city = row.getAttribute('data-tour-city');
        if (filter === 'all' || city === filter) {
          row.style.display = 'grid';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // 3. Vault Theme Split Showcase Selector
  const vaultItems = document.querySelectorAll('.vault-selector-item');
  const stageCat = document.getElementById('vaultStageCat');
  const stageTitle = document.getElementById('vaultStageTitle');
  const stageDesc = document.getElementById('vaultStageDesc');
  const clueTeaser = document.querySelector('.vault-clue-teaser .teaser-text');

  const vaultData = {
    marvel: {
      cat: 'FEATURED COSPLAY SHOWDOWN',
      title: 'Multiverse Heroes: Marvel vs DC Championship',
      desc: 'Suit up in full costume for extra bonus points! Features 60 live stadium video clues, custom character voice acting stings, and comic book easter eggs spanning from 1962 to modern blockbuster hits.',
      clue: '"Identify the fictional metal mined exclusively in Wakanda from this 4-second vibratory audio frequency spectrum."'
    },
    mtv: {
      cat: 'SING-ALONG NOSTALGIA ARENA',
      title: '90s & 2000s MTV Hits & Retro Arcade Lore',
      desc: 'Belt out chorus anthems from Nirvana, Britney Spears, Blink-182, and OutKast. Features reverse audio track puzzles, cartoon theme song deciphering, and Saturday morning arcade lore.',
      clue: '"Name the 1999 hit single by Smash Mouth that opens with a single spoken line before the drum drop."'
    },
    anime: {
      cat: 'FAN FAVORITE ARENA CLASH',
      title: 'Anime Masters & Pixel Legends Championship',
      desc: 'From classic Shonen battles (Dragon Ball, Naruto, One Piece) to modern sensations (Demon Slayer, Jujutsu Kaisen) plus iconic video game boss battle themes and cheat code lore.',
      clue: '"Which mythical notebook requires you to know both the person\'s full name and face to take effect?"'
    },
    scifi: {
      cat: 'GALAXY-SCALE TOURNAMENT',
      title: 'Star Wars Cantina & Sci-Fi Universe Lore',
      desc: 'Deep cuts spanning Star Wars canon, Star Trek starships, Dune spice ecology, The Matrix prophecies, and Blade Runner replicant tests on the big video screen.',
      clue: '"What is the name of the droid co-pilot that helped Anakin Skywalker during the Battle of Naboo?"'
    },
    sitcoms: {
      cat: 'BINGE & COMEDY SHOWDOWN',
      title: 'Sitcom Royalty: The Office, Friends & Cult Classics',
      desc: 'Test your memory on Dunder Mifflin Dundies, Central Perk relationships, Pawnee town halls, and 2000s comedy quotes across 5 high-speed rounds.',
      clue: '"According to Dwight Schrute in The Office, what three things do bears do?"'
    }
  };

  vaultItems.forEach(item => {
    item.addEventListener('click', () => {
      vaultItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const target = item.getAttribute('data-vault-target');
      const data = vaultData[target];

      if (data && stageTitle && stageDesc) {
        if (stageCat) stageCat.textContent = data.cat;
        stageTitle.textContent = data.title;
        stageDesc.textContent = data.desc;
        if (clueTeaser) clueTeaser.textContent = data.clue;
      }
    });
  });
}


/* --------------------------------------------------------------------------
   Scroll Reveal Animations (Intersection Observer)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   Live Radar Countdown Timer (Ticking Every Second)
   -------------------------------------------------------------------------- */
function initRadarCountdown() {
  const hoursEl = document.getElementById('radarTimerHours');
  const minsEl = document.getElementById('radarTimerMins');
  const secsEl = document.getElementById('radarTimerSecs');

  if (!hoursEl || !minsEl || !secsEl) return;

  let totalSeconds = 4 * 3600 + 22 * 60 + 15;

  setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
    } else {
      totalSeconds = 6 * 3600 + 30 * 60; // reset to 6.5 hours
    }

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hoursEl.textContent = String(h).padStart(2, '0') + 'h';
    minsEl.textContent = String(m).padStart(2, '0') + 'm';
    secsEl.textContent = String(s).padStart(2, '0') + 's';
  }, 1000);
}

/* --------------------------------------------------------------------------
   Home 1 Interactive Features (3D Quiz Deck, City Switcher, 3D Flip Cards)
   -------------------------------------------------------------------------- */
function initHome1Interactions() {
  // Interactive 3D Quiz Deck Option Pills (Reference Mockup)
  const quizPills = document.querySelectorAll('.quiz-option-pill');
  const quizFeedback = document.getElementById('heroQuizFeedback');

  quizPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const isCorrect = pill.getAttribute('data-correct') === 'true';

      quizPills.forEach(p => {
        p.classList.remove('active-correct-pill');
        p.classList.remove('wrong');
        p.classList.remove('correct');
      });

      if (isCorrect) {
        pill.classList.add('correct');
        if (quizFeedback) {
          quizFeedback.innerHTML = '<span style="color:#06D6A0; font-weight:800;">⚡ Spot on! +100 Pts</span>';
        }
        playCelebrationSound();
      } else {
        pill.classList.add('wrong');
        if (quizFeedback) {
          quizFeedback.innerHTML = '<span style="color:#FF3366; font-weight:800;">❌ Try Again! Honey is made by bees!</span>';
        }
      }
    });
  });

  function playCelebrationSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      // AudioContext unavailable or blocked
    }
  }

  // City Tab Switcher
  const cityTabBtns = document.querySelectorAll('.city-tab-btn');
  const cityPanes = document.querySelectorAll('.city-tab-pane');

  cityTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCity = btn.getAttribute('data-city');

      cityTabBtns.forEach(b => b.classList.remove('active'));
      cityPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`city-${targetCity}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // 3D Interactive Flip Clue Cards
  document.querySelectorAll('.theme-flip-card-wrap').forEach(wrap => {
    wrap.addEventListener('click', () => {
      wrap.classList.toggle('is-flipped');
      playCelebrationSound();
    });
  });
}

/* --------------------------------------------------------------------------
   1. Theme Management (Light / Dark with dynamic Favicon & localStorage)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('brainwave_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcons(storedTheme);
  updateFavicon(storedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('brainwave_theme', newTheme);
      updateThemeIcons(newTheme);
      updateFavicon(newTheme);
    });
  });
}

function updateFavicon(theme) {
  const favicon = document.getElementById('siteFavicon') || document.querySelector('link[rel="icon"]');
  if (!favicon) return;
  if (theme === 'light') {
    favicon.setAttribute('href', 'assets/images/icons/favicon-light.svg');
  } else {
    favicon.setAttribute('href', 'assets/images/icons/favicon.svg');
  }
}

function updateThemeIcons(theme) {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  themeToggleBtns.forEach(btn => {
    if (theme === 'light') {
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      btn.setAttribute('aria-label', 'Switch to Dark Mode');
      btn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      btn.setAttribute('aria-label', 'Switch to Light Mode');
      btn.setAttribute('title', 'Switch to Light Mode');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Direction Management (LTR / RTL with localStorage)
   -------------------------------------------------------------------------- */
function initDirection() {
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  const storedDir = localStorage.getItem('brainwave_direction') || 'ltr';

  document.documentElement.setAttribute('dir', storedDir);
  updateDirButtons(storedDir);

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';

      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('brainwave_direction', newDir);
      updateDirButtons(newDir);
    });
  });
}

function updateDirButtons(dir) {
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  rtlToggleBtns.forEach(btn => {
    if (dir === 'rtl') {
      btn.innerHTML = `<span style="font-size:0.75rem; font-weight:800;">LTR</span>`;
      btn.setAttribute('aria-label', 'Switch to LTR');
      btn.setAttribute('title', 'Switch to Left to Right');
    } else {
      btn.innerHTML = `<span style="font-size:0.75rem; font-weight:800;">RTL</span>`;
      btn.setAttribute('aria-label', 'Switch to RTL');
      btn.setAttribute('title', 'Switch to Right to Left');
    }
  });
}

/* --------------------------------------------------------------------------
   3. Sticky Navbar with Scroll Blur
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   4. Mobile Menu Drawer with True Scroll Locking & Submenu Reset
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  const dropdownTriggers = document.querySelectorAll('.mobile-dropdown-btn');

  if (!drawer || !overlay) return;

  let savedScrollY = 0;

  const openMobileMenu = () => {
    savedScrollY = window.scrollY;
    document.body.classList.add('mobile-menu-locked');
    drawer.classList.add('active');
    overlay.classList.add('active');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeMobileMenu = () => {
    document.body.classList.remove('mobile-menu-locked');
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');

    // Reset all submenus when closing
    document.querySelectorAll('.mobile-nav-item.dropdown-open').forEach(item => {
      item.classList.remove('dropdown-open');
    });
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = drawer.classList.contains('active');
      if (isActive) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileMenu);
  }

  overlay.addEventListener('click', closeMobileMenu);

  // Close when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // Mobile Dropdown Accordion Toggle
  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const parentItem = trigger.closest('.mobile-nav-item');
      if (parentItem) {
        parentItem.classList.toggle('dropdown-open');
      }
    });
  });

  // Auto close menu when clicking mobile nav links that are not dropdown toggles
  document.querySelectorAll('.mobile-nav-link:not(.mobile-dropdown-btn), .mobile-dropdown-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
}

/* --------------------------------------------------------------------------
   5. Desktop Dropdown Interactions (Hover + Click/Focus Support)
   -------------------------------------------------------------------------- */
function initDesktopDropdown() {
  const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

  dropdownItems.forEach(item => {
    const trigger = item.querySelector('.nav-link');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      // In desktop/laptop/iPad Pro navbar mode (> 1024px)
      if (window.innerWidth > 1024) {
        e.preventDefault();
        e.stopPropagation();
        const isOpened = item.classList.contains('active-open');
        dropdownItems.forEach(other => {
          other.classList.remove('active-open');
          const otherTrigger = other.querySelector('.nav-link');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        });
        if (!isOpened) {
          item.classList.add('active-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      }
    });

    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1024) {
        item.classList.add('active-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    item.addEventListener('mouseleave', () => {
      if (window.innerWidth > 1024) {
        item.classList.remove('active-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Click outside closes desktop dropdown
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item.dropdown')) {
      dropdownItems.forEach(item => {
        item.classList.remove('active-open');
        const trigger = item.querySelector('.nav-link');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/* --------------------------------------------------------------------------
   6. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backBtn = document.querySelector('.back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   7. Active Navigation Link Detection
   -------------------------------------------------------------------------- */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  // Desktop links
  document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      const parentDropdown = link.closest('.nav-item.dropdown');
      if (parentDropdown) {
        parentDropdown.classList.add('active');
      }
    }
  });

  // Mobile links
  document.querySelectorAll('.mobile-nav-link, .mobile-dropdown-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      const parentItem = link.closest('.mobile-nav-item');
      if (parentItem) {
        parentItem.classList.add('active');
      }
    }
  });
}

/* --------------------------------------------------------------------------
   8. Global UI Helpers (Tabs, Accordions, Form Feedback)
   -------------------------------------------------------------------------- */
function initInteractiveElements() {
  // Generic Tab switcher helper
  document.querySelectorAll('[data-tab-group]').forEach(group => {
    const triggers = group.querySelectorAll('[data-tab-target]');
    const contents = group.querySelectorAll('[data-tab-content]');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const targetId = trigger.getAttribute('data-tab-target');

        triggers.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        trigger.classList.add('active');
        const targetContent = group.querySelector(`[data-tab-content="${targetId}"]`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  });

  // Generic & Schedule FAQ Accordion helper
  document.querySelectorAll('.faq-accordion-item').forEach(item => {
    const header = item.querySelector('.faq-accordion-header');
    const body = item.querySelector('.faq-accordion-body');
    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active') || item.classList.contains('open');
      const parentGroup = item.closest('.faq-accordion-group') || item.parentElement;

      // Close sibling items in the same group
      if (parentGroup) {
        parentGroup.querySelectorAll('.faq-accordion-item').forEach(other => {
          if (other !== item) {
            other.classList.remove('active', 'open');
            const otherHeader = other.querySelector('.faq-accordion-header');
            const otherBody = other.querySelector('.faq-accordion-body');
            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
            if (otherBody) otherBody.style.maxHeight = null;
          }
        });
      }

      if (isOpen) {
        item.classList.remove('active', 'open');
        header.setAttribute('aria-expanded', 'false');
        body.style.maxHeight = null;
      } else {
        item.classList.add('active', 'open');
        header.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = (body.scrollHeight + 30) + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. Schedule Page Interactive System (Filtering, Day Tabs, RSVP Modal)
   -------------------------------------------------------------------------- */
function initScheduleInteractions() {
  const dayBtns = document.querySelectorAll('.day-strip-btn');
  const searchInput = document.getElementById('scheduleSearchInput');
  const citySelect = document.getElementById('cityFilterSelect');
  const formatSelect = document.getElementById('formatFilterSelect');
  const prizeSelect = document.getElementById('prizeFilterSelect');
  const resetBtn = document.getElementById('resetFiltersBtn');
  const scheduleCards = document.querySelectorAll('.schedule-card');
  const countLabel = document.getElementById('activeGamesCount');

  if (!scheduleCards.length) return;

  let currentDay = 'all';

  function applyFilters() {
    let visibleCount = 0;
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCity = citySelect ? citySelect.value : 'all';
    const selectedFormat = formatSelect ? formatSelect.value : 'all';
    const selectedPrize = prizeSelect ? prizeSelect.value : 'all';

    scheduleCards.forEach(card => {
      const cardDay = card.getAttribute('data-day');
      const cardCity = card.getAttribute('data-city');
      const cardFormat = card.getAttribute('data-format');
      const cardPrize = card.getAttribute('data-prize');
      const cardText = card.textContent.toLowerCase();

      const matchDay = (currentDay === 'all' || cardDay === currentDay);
      const matchCity = (selectedCity === 'all' || cardCity === selectedCity);
      const matchFormat = (selectedFormat === 'all' || cardFormat === selectedFormat);
      const matchPrize = (selectedPrize === 'all' || cardPrize === selectedPrize);
      const matchQuery = (query === '' || cardText.includes(query));

      if (matchDay && matchCity && matchFormat && matchPrize && matchQuery) {
        card.style.display = 'grid';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countLabel) {
      countLabel.textContent = `Showing ${visibleCount} Featured Venue${visibleCount === 1 ? '' : 's'}`;
    }
  }

  // Day Tab Click Handlers
  dayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dayBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDay = btn.getAttribute('data-day');
      applyFilters();
    });
  });

  // Dropdowns & Search Input Handlers
  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (citySelect) citySelect.addEventListener('change', applyFilters);
  if (formatSelect) formatSelect.addEventListener('change', applyFilters);
  if (prizeSelect) prizeSelect.addEventListener('change', applyFilters);

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (citySelect) citySelect.value = 'all';
      if (formatSelect) formatSelect.value = 'all';
      if (prizeSelect) prizeSelect.value = 'all';
      dayBtns.forEach(b => b.classList.remove('active'));
      const allBtn = document.querySelector('.day-strip-btn[data-day="all"]');
      if (allBtn) allBtn.classList.add('active');
      currentDay = 'all';
      applyFilters();
    });
  }

  // RSVP Table Modal Handlers
  const modal = document.getElementById('rsvpModal');
  const closeBtn = document.getElementById('closeRsvpModalBtn');
  const venueName = document.getElementById('modalVenueName');
  const venueDetails = document.getElementById('modalVenueDetails');
  const rsvpTriggers = document.querySelectorAll('.rsvp-trigger-btn');

  rsvpTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const vName = btn.getAttribute('data-venue') || 'Partner Taproom';
      const vCity = btn.getAttribute('data-city') || 'Metro';
      const vTime = btn.getAttribute('data-time') || '7:00 PM';

      if (venueName) venueName.textContent = vName;
      if (venueDetails) venueDetails.textContent = `${vCity} • ${vTime}`;

      if (modal) {
        modal.classList.add('active');
        document.body.classList.add('mobile-menu-locked');
      }
    });
  });

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      document.body.classList.remove('mobile-menu-locked');
    }
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   Venues & Cities Interactive Engine
   -------------------------------------------------------------------------- */
function initVenuesInteractions() {
  // 1. City Chips & Metro Select Filter
  const metroChips = document.querySelectorAll('.metro-chip');
  const metroSelect = document.getElementById('venueMetroSelect');
  const searchInput = document.getElementById('venueSearchInput');
  const findBtn = document.getElementById('findVenuesBtn');
  const venueCards = document.querySelectorAll('.venue-card');

  let currentMetro = 'all';

  function filterVenues() {
    const query = (searchInput ? searchInput.value.toLowerCase().trim() : '');

    venueCards.forEach(card => {
      const city = (card.getAttribute('data-city') || '').toLowerCase();
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      const address = (card.querySelector('.venue-address') ? card.querySelector('.venue-address').textContent.toLowerCase() : '');

      const matchesCity = (currentMetro === 'all' || city === currentMetro);
      const matchesQuery = (!query || name.includes(query) || city.includes(query) || address.includes(query));

      if (matchesCity && matchesQuery) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  metroChips.forEach(chip => {
    chip.addEventListener('click', () => {
      metroChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      currentMetro = chip.getAttribute('data-metro-chip');
      if (metroSelect) metroSelect.value = currentMetro;
      filterVenues();
    });
  });

  if (metroSelect) {
    metroSelect.addEventListener('change', () => {
      currentMetro = metroSelect.value;
      metroChips.forEach(c => {
        if (c.getAttribute('data-metro-chip') === currentMetro) {
          c.classList.add('active');
        } else {
          c.classList.remove('active');
        }
      });
      filterVenues();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterVenues);
  }

  if (findBtn) {
    findBtn.addEventListener('click', () => {
      filterVenues();
      const grid = document.getElementById('venuesGrid');
      if (grid) grid.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 2. Interactive Seating Capacity Revenue ROI Calculator
  const capSlider = document.getElementById('capacitySlider');
  const capDisplay = document.getElementById('capacityValDisplay');
  const nightsSelect = document.getElementById('nightsSelect');
  const projectedMonthly = document.getElementById('projectedMonthlyRev');
  const projectedAnnual = document.getElementById('projectedAnnualRev');
  const calcAttendance = document.getElementById('calcAttendanceEst');

  function calculateROI() {
    if (!capSlider) return;

    const capacity = parseInt(capSlider.value, 10);
    const nights = nightsSelect ? parseInt(nightsSelect.value, 10) : 1;

    // Estimated attendance is ~75% of seating capacity
    const estimatedPlayers = Math.round(capacity * 0.75);
    
    // Average food & beverage gross spend per player ($22.50)
    // 4.3 weeks per month, minus host turnkey fee ($150 / night)
    const grossDraftAndFoodSalesPerNight = estimatedPlayers * 22.50;
    const weeklyGross = grossDraftAndFoodSalesPerNight * nights;
    const monthlyGrossIncremental = Math.round(weeklyGross * 4.3);
    const annualGrossIncremental = monthlyGrossIncremental * 12;

    if (capDisplay) capDisplay.textContent = `${capacity} Seats`;
    if (calcAttendance) calcAttendance.textContent = `${estimatedPlayers} Players / Night`;
    if (projectedMonthly) projectedMonthly.textContent = `+$${monthlyGrossIncremental.toLocaleString()}`;
    if (projectedAnnual) projectedAnnual.innerHTML = `Estimated <strong>+$${annualGrossIncremental.toLocaleString()}</strong> Annual Draft &amp; Food Sales`;
  }

  if (capSlider) {
    capSlider.addEventListener('input', calculateROI);
  }

  if (nightsSelect) {
    nightsSelect.addEventListener('change', calculateROI);
  }

  calculateROI();

  // 3. Venue Partner FAQ Accordion
  const faqItems = document.querySelectorAll('.venue-faq-accordion .faq-accordion-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-accordion-btn');
    const content = item.querySelector('.faq-accordion-content');

    if (btn && content) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach(other => {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-accordion-btn');
          const otherContent = other.querySelector('.faq-accordion-content');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = content.scrollHeight + 30 + 'px';
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   Corporate & Private Events Interactive Engine (events.html)
   -------------------------------------------------------------------------- */
function initEventsInteractions() {
  // 1. Event Format Switcher Tabs
  const formatTabs = document.querySelectorAll('.format-tab-btn');
  const formatImg = document.getElementById('formatImg');
  const formatChip = document.getElementById('formatChip');
  const formatCategory = document.getElementById('formatCategory');
  const formatTitle = document.getElementById('formatTitle');
  const formatDesc = document.getElementById('formatDesc');
  const formatList = document.getElementById('formatList');

  const formatData = {
    onsite: {
      img: 'assets/images/events/event-large-auditorium-showdown.webp',
      alt: 'In-person corporate trivia event showdown',
      chip: '★ MOST POPULAR FOR OFFSITES',
      category: 'HEADQUARTERS & TAPROOM OFFSITES',
      title: 'In-Person Onsite Office & Taproom Showdowns',
      desc: 'Our master comedian emcee arrives with a full sound kit, wireless microphones, and digital buzzers. We turn your company all-hands, holiday party, or team dinner into an electric TV-style game show.',
      features: [
        'Studio-grade PA sound system & wireless mics included',
        'Smartphone buzzers with real-time leaderboard projection',
        'Dedicated custom company trivia round crafted by our comedy writers',
        'Engraved custom championship team trophy & winner medals'
      ]
    },
    virtual: {
      img: 'assets/images/events/event-virtual-hybrid-zoom.webp',
      alt: 'Virtual corporate trivia broadcast on Zoom and Teams',
      chip: '⚡ ZERO LATENCY ZOOM / TEAMS',
      category: 'REMOTE & DISTRIBUTED TEAMS',
      title: 'Global Virtual & Hybrid Broadcast Tournaments',
      desc: 'Connect distributed teams across multiple continents with live studio broadcast production, interactive cloud buzzers, synchronized breakout room brackets, and automated instant scoring.',
      features: [
        'Broadcast-quality studio host with custom company background branding',
        'Integrated with Zoom, Microsoft Teams, Webex & Google Meet',
        'Automated breakout team rooms with private captain answer submission',
        'Digital gift card prize distribution for winning team members'
      ]
    },
    league: {
      img: 'assets/images/events/event-client-celebration-trophy.webp',
      alt: 'Quarterly inter-department corporate trivia league trophy',
      chip: '🏆 MULTI-WEEK TOURNAMENT',
      category: 'INTER-DEPARTMENT CHAMPIONSHIPS',
      title: 'Quarterly Multi-Office Championship Leagues',
      desc: 'Elevate inter-department camaraderie with a 4-to-8 week seasonal league bracket. Track company-wide standings, division rivalries, and crown the ultimate grand trophy champion.',
      features: [
        'Live seasonal standings dashboard accessible by entire company',
        'Weekly rotating themed rounds (Pop Culture, Tech, Company Milestones)',
        'Division brackets for Sales, Engineering, Product & Marketing',
        'Perpetual traveling champion trophy engraved with winning department'
      ]
    }
  };

  if (formatTabs.length && formatTitle) {
    formatTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        formatTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.getAttribute('data-format-target');
        const data = formatData[target];

        if (data) {
          if (formatImg) {
            formatImg.src = data.img;
            formatImg.alt = data.alt;
          }
          if (formatChip) formatChip.textContent = data.chip;
          if (formatCategory) formatCategory.textContent = data.category;
          if (formatTitle) formatTitle.textContent = data.title;
          if (formatDesc) formatDesc.textContent = data.desc;

          if (formatList) {
            formatList.innerHTML = data.features.map(f => `
              <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06D6A0" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> ${f}</li>
            `).join('');
          }
        }
      });
    });
  }

  // 2. Custom Question Engine Preview Switcher
  const clueItems = document.querySelectorAll('.custom-type-item');
  const clueCatDisplay = document.getElementById('clueCatDisplay');
  const clueMetaDisplay = document.getElementById('clueMetaDisplay');
  const clueTitleDisplay = document.getElementById('clueTitleDisplay');
  const clueOptionsDisplay = document.getElementById('clueOptionsDisplay');

  const clueData = {
    lore: {
      cat: 'CUSTOM COMPANY ROUND PREVIEW',
      meta: 'ROUND 03 • QUESTION 04 • COMPANY LORE',
      title: '"Which co-founder accidentally deployed to production from an airport terminal in 2022?"',
      options: [
        { letter: 'A', text: 'Sarah (VP of Engineering)', correct: true },
        { letter: 'B', text: 'Dave (Chief Product Officer)', correct: false },
        { letter: 'C', text: 'Elena (Head of Design)', correct: false },
        { letter: 'D', text: 'Marcus (Chief Executive Officer)', correct: false }
      ],
      feedback: '84% of engineering teams guessed correctly in under 4.2 seconds!'
    },
    photos: {
      cat: 'EXECUTIVE SPOTLIGHT PREVIEW',
      meta: 'ROUND 02 • QUESTION 03 • PHOTO ROUND',
      title: '"Match this 1998 middle-school garage band bassist to the current C-Suite executive:"',
      options: [
        { letter: 'A', text: 'Chief Financial Officer (Brian)', correct: false },
        { letter: 'B', text: 'Chief Technology Officer (Alex)', correct: true },
        { letter: 'C', text: 'Head of Global Marketing (Rachel)', correct: false },
        { letter: 'D', text: 'VP of Customer Success (Jordan)', correct: false }
      ],
      feedback: 'Over 92% of the team recognized the hairstyle instantly!'
    },
    slack: {
      cat: 'WORKPLACE CULTURE PREVIEW',
      meta: 'ROUND 04 • QUESTION 02 • WATERCOOLER LORE',
      title: '"What is the all-time most reacted custom emoji in the company #random Slack channel?"',
      options: [
        { letter: 'A', text: ':party-parrot-hyper:', correct: false },
        { letter: 'B', text: ':coffee-or-die:', correct: false },
        { letter: 'C', text: ':dumpster-fire-sparkle:', correct: true },
        { letter: 'D', text: ':ship-it-squirrel:', correct: false }
      ],
      feedback: 'Used 14,820 times across 18 team channels this year!'
    },
    industry: {
      cat: 'TECHNICAL & JARGON PREVIEW',
      meta: 'ROUND 01 • QUESTION 05 • RAPID BLITZ',
      title: '"Which competitor launched their disastrous \'AI Smart Toaster\' at the 2024 Tech Summit?"',
      options: [
        { letter: 'A', text: 'OmniCorp Dynamics', correct: false },
        { letter: 'B', text: 'Vortex Cloudware', correct: true },
        { letter: 'C', text: 'Apex Solutions', correct: false },
        { letter: 'D', text: 'Synergy Labs', correct: false }
      ],
      feedback: 'Product & Sales tied for the fastest buzzer response (1.8s)!'
    }
  };

  if (clueItems.length && clueTitleDisplay) {
    clueItems.forEach(item => {
      item.addEventListener('click', () => {
        clueItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const clueKey = item.getAttribute('data-clue-type');
        const data = clueData[clueKey];

        if (data) {
          if (clueCatDisplay) clueCatDisplay.textContent = data.cat;
          if (clueMetaDisplay) clueMetaDisplay.textContent = data.meta;
          if (clueTitleDisplay) clueTitleDisplay.textContent = data.title;

          if (clueOptionsDisplay) {
            clueOptionsDisplay.innerHTML = data.options.map(opt => `
              <div class="preview-opt-card ${opt.correct ? 'opt-correct' : ''}">
                <span class="opt-letter">${opt.letter}</span>
                <span>${opt.text}</span>
              </div>
            `).join('');
          }

          const feedbackBox = document.querySelector('.preview-feedback-box span');
          if (feedbackBox) {
            feedbackBox.textContent = data.feedback;
          }
        }
      });
    });
  }

  // 3. Dynamic Quote Estimator Calculator
  const guestCount = document.getElementById('guestCount');
  const formatPref = document.getElementById('formatPref');
  const quoteTotal = document.getElementById('dynamicQuoteTotal');

  function updateQuoteEstimate() {
    if (!guestCount || !quoteTotal) return;

    const guestVal = guestCount.value;
    const formatVal = formatPref ? formatPref.value : 'office';

    let baseEstimate = 1450;

    if (guestVal === 'tier1') {
      baseEstimate = (formatVal === 'virtual' || formatVal === 'office') ? 750 : 950;
    } else if (guestVal === 'tier2') {
      baseEstimate = (formatVal === 'virtual' || formatVal === 'office') ? 1450 : 1650;
    } else if (guestVal === 'tier3') {
      baseEstimate = (formatVal === 'virtual' || formatVal === 'office') ? 2150 : 2450;
    } else if (guestVal === 'tier4') {
      quoteTotal.textContent = 'Custom Enterprise Quote';
      return;
    }

    quoteTotal.textContent = `$${baseEstimate.toLocaleString()}`;
  }

  if (guestCount) guestCount.addEventListener('change', updateQuoteEstimate);
  if (formatPref) formatPref.addEventListener('change', updateQuoteEstimate);

  // 4. Corporate FAQ Accordion
  const corpFaqItems = document.querySelectorAll('.corporate-faq-accordion .faq-accordion-item');
  corpFaqItems.forEach(item => {
    const btn = item.querySelector('.faq-accordion-btn');
    const content = item.querySelector('.faq-accordion-content');

    if (btn && content) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        corpFaqItems.forEach(other => {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-accordion-btn');
          const otherContent = other.querySelector('.faq-accordion-content');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = content.scrollHeight + 30 + 'px';
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   Host a Trivia Night / Venue Partner Interactive Engine (host.html)
   -------------------------------------------------------------------------- */
function initHostInteractions() {
  // 1. Host FAQ Accordion
  const hostFaqItems = document.querySelectorAll('.host-faq-accordion .faq-accordion-item');
  hostFaqItems.forEach(item => {
    const btn = item.querySelector('.faq-accordion-btn');
    const content = item.querySelector('.faq-accordion-content');

    if (btn && content) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        hostFaqItems.forEach(other => {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-accordion-btn');
          const otherContent = other.querySelector('.faq-accordion-content');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = content.scrollHeight + 30 + 'px';
        }
      });
    }
  });

  // 2. Interactive Venue Partnership Form
  const partnerForm = document.getElementById('partnerInquiryForm');
  if (partnerForm) {
    partnerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const venueName = document.getElementById('venueNameInput') ? document.getElementById('venueNameInput').value : 'your venue';
      alert(`🎉 Thank you! Your partnership inquiry for "${venueName}" has been submitted. Our Regional Director will contact you within 24 hours for your free acoustics and seating walkthrough.`);
      partnerForm.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   Contact Us & Support Interactive Engine (contact.html)
   -------------------------------------------------------------------------- */
function initContactInteractions() {
  // 1. URL Query Parameter Pre-selection (e.g. ?type=audition)
  const urlParams = new URLSearchParams(window.location.search);
  const typeParam = urlParams.get('type');
  const topicSelect = document.getElementById('contactTopicSelect');
  if (typeParam && topicSelect) {
    if (typeParam === 'audition') topicSelect.value = 'audition';
    else if (typeParam === 'venue') topicSelect.value = 'venue';
    else if (typeParam === 'corporate') topicSelect.value = 'corporate';
    else if (typeParam === 'charity') topicSelect.value = 'charity';
  }

  // 2. Channel card click routing
  const channelCards = document.querySelectorAll('.channel-card');
  channelCards.forEach(card => {
    card.addEventListener('click', () => {
      const channel = card.getAttribute('data-channel');
      if (topicSelect) {
        if (channel === 'support') topicSelect.value = 'general';
        else if (channel === 'venues') topicSelect.value = 'venue';
        else if (channel === 'events') topicSelect.value = 'corporate';
        else if (channel === 'auditions') topicSelect.value = 'audition';
      }
    });
  });

  // 3. Main Contact Form Submission Handler
  const contactForm = document.getElementById('mainContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactFullName') ? document.getElementById('contactFullName').value : 'Friend';
      const topic = topicSelect ? topicSelect.options[topicSelect.selectedIndex].text : 'General Inquiry';
      alert(`🎉 Thank you, ${name}! Your message regarding "${topic}" has been received. Our dedicated team will respond within 2 business hours.`);
      contactForm.reset();
    });
  }

  // 4. Master FAQ Category Filter Tabs
  const faqTabs = document.querySelectorAll('.faq-filter-tabs .faq-tab-btn');
  const faqItems = document.querySelectorAll('.master-faq-accordion .faq-accordion-item');

  if (faqTabs.length && faqItems.length) {
    faqTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        faqTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-faq-filter');

        faqItems.forEach(item => {
          const itemCat = item.getAttribute('data-faq-cat');
          if (filter === 'all' || itemCat === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. Master FAQ Accordion Toggles
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-accordion-btn');
    const content = item.querySelector('.faq-accordion-content');

    if (btn && content) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach(other => {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-accordion-btn');
          const otherContent = other.querySelector('.faq-accordion-content');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = content.scrollHeight + 30 + 'px';
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   Player & Host Portal Interactive Engine (login.html & register.html)
   -------------------------------------------------------------------------- */
function initPortalInteractions() {
  // 1. Password Visibility Toggle (for both login and register forms)
  function setupPasswordToggle(btnId, inputId) {
    const btn = document.getElementById(btnId);
    const input = document.getElementById(inputId);
    if (btn && input) {
      btn.addEventListener('click', () => {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';

        const eyeOpen = btn.querySelector('.eye-open');
        const eyeClosed = btn.querySelector('.eye-closed');
        if (eyeOpen && eyeClosed) {
          eyeOpen.style.display = isPassword ? 'none' : 'block';
          eyeClosed.style.display = isPassword ? 'block' : 'none';
        }
        btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      });
    }
  }

  setupPasswordToggle('togglePasswordBtn', 'loginPassword');
  setupPasswordToggle('toggleRegPasswordBtn', 'regPassword');

  // 2. Role Selector Tabs on login.html (Captain vs Host)
  const authRoleTabs = document.querySelectorAll('.auth-role-tab');
  const loginIdLabel = document.getElementById('loginIdLabel');
  const loginEmail = document.getElementById('loginEmail');

  authRoleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authRoleTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const role = tab.getAttribute('data-role');
      if (loginIdLabel && loginEmail) {
        if (role === 'host') {
          loginIdLabel.textContent = 'Host ID / Emcee Email';
          loginEmail.placeholder = 'emcee.host@brainwave.com';
        } else {
          loginIdLabel.textContent = 'Email';
          loginEmail.placeholder = 'you@example.com';
        }
      }
    });
  });

  // 3. Main Login Form Submit Handler
  const mainLoginForm = document.getElementById('mainLoginForm');
  if (mainLoginForm) {
    mainLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('loginEmail');
      const email = emailInput ? emailInput.value : 'captain@team.com';
      const activeTab = document.querySelector('.auth-role-tab.active');
      const role = activeTab ? activeTab.getAttribute('data-role') : 'captain';

      if (role === 'host') {
        alert(`🎤 Verified Access: Welcome Emcee (${email})!\n\n• Sound Check Rig: Calibrated (48kHz Stereo)\n• Live Smartphone Buzzer Hub: ONLINE\n• Tonight's Quiz Deck: Loaded (4 Rounds + Audio Blitz)\n\nLaunching Host Stage Console...`);
      } else {
        alert(`🎉 Welcome back, Captain (${email})!\n\n• Team Division: Division I Masters\n• Live Win Streak: 4 Weeks Active\n• Vegas Championship ELO: 4,310 Pts\n\nRedirecting to your Team Command Dashboard...`);
      }
    });
  }

  // 4. Main Registration Form Submit Handler
  const mainRegisterForm = document.getElementById('mainRegisterForm');
  if (mainRegisterForm) {
    mainRegisterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('regFullName');
      const name = nameInput ? nameInput.value : 'Captain';
      const planSelect = document.getElementById('regPlanSelect');
      const plan = planSelect ? planSelect.options[planSelect.selectedIndex].text : 'Free Captain Pass';

      alert(`🚀 Welcome to the League, ${name}!\n\n• Selected Membership: ${plan}\n• 🎁 Free 3-Round Table Buzzer Trial: ACTIVATED\n• Initial ELO Seed: 1,500 Pts\n\nYour account has been created! Redirecting to table booking...`);
      window.location.href = 'schedule.html';
    });
  }

  // 5. Forgot Password Handler
  const forgotLink = document.getElementById('forgotPasswordLink');
  if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      const email = prompt('Enter your registered team email address for a instant 1-click password reset link:', 'you@example.com');
      if (email) {
        alert(`📧 Reset Instructions Sent!\n\nWe sent a secure password reset link to ${email}. Check your inbox within 2 minutes.`);
      }
    });
  }

  // 6. Fast-Track Table PIN Entry with Audio Chime
  const tablePinForm = document.getElementById('tablePinForm');
  const feedbackMsg = document.getElementById('joinFeedback');

  if (tablePinForm) {
    tablePinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pin = document.getElementById('tablePinInput') ? document.getElementById('tablePinInput').value.toUpperCase() : 'BW-777';

      // Play audio chime
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.2); // C6
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } catch (err) {}

      if (feedbackMsg) {
        feedbackMsg.innerHTML = `<span style="color:#06D6A0; font-weight:800; font-size:0.85rem; margin-top:0.5rem; display:block;">⚡ Connected to Table <strong>${pin}</strong>! Synchronizing buzzer latency... You're live!</span>`;
      }
    });
  }
}


/* --------------------------------------------------------------------------
   Section 26: Leaderboard & Championship Standings Interactions (leaderboard.html)
   -------------------------------------------------------------------------- */
function initLeaderboardInteractions() {
  const standingsTable = document.getElementById('mainStandingsTable');
  if (!standingsTable) return;

  const tableBody = document.getElementById('standingsTableBody');
  const metroPills = document.querySelectorAll('.metro-pill-btn');
  const searchInput = document.getElementById('leaderboardSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const divisionSelect = document.getElementById('divisionFilterSelect');
  const emptyState = document.getElementById('standingsEmptyState');
  const countSummary = document.getElementById('tableCountSummary');
  const resetBtn = document.getElementById('resetTableFiltersBtn');
  const loadMoreBtn = document.getElementById('loadMoreStandingsBtn');

  let activeMetro = 'all';
  let activeDivision = 'all';
  let searchQuery = '';

  // 1. Filter Logic
  function applyFilters() {
    if (!tableBody) return;
    const rows = tableBody.querySelectorAll('tr');
    let visibleCount = 0;

    rows.forEach(row => {
      const rowMetro = row.getAttribute('data-metro');
      const rowDivision = row.getAttribute('data-division');
      const rowText = row.innerText.toLowerCase();

      const matchMetro = (activeMetro === 'all' || rowMetro === activeMetro);
      const matchDivision = (activeDivision === 'all' || rowDivision === activeDivision);
      const matchSearch = (!searchQuery || rowText.includes(searchQuery));

      if (matchMetro && matchDivision && matchSearch) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    if (countSummary) {
      countSummary.textContent = `Showing ${visibleCount} of 12,480 Active National Teams`;
    }
  }

  // Metro Pills Click
  metroPills.forEach(pill => {
    pill.addEventListener('click', () => {
      metroPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');
      activeMetro = pill.getAttribute('data-metro');
      applyFilters();
    });
  });

  // Division Select Change
  if (divisionSelect) {
    divisionSelect.addEventListener('change', (e) => {
      activeDivision = e.target.value;
      applyFilters();
    });
  }

  // Search Input Handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) {
        clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
      }
      applyFilters();
    });
  }

  // Clear Search Button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.style.display = 'none';
      applyFilters();
    });
  }

  // Reset Button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeMetro = 'all';
      activeDivision = 'all';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (divisionSelect) divisionSelect.value = 'all';
      if (clearSearchBtn) clearSearchBtn.style.display = 'none';
      metroPills.forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-metro') === 'all');
        p.setAttribute('aria-selected', p.getAttribute('data-metro') === 'all' ? 'true' : 'false');
      });
      applyFilters();
    });
  }

  // Load More Simulation
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      loadMoreBtn.innerHTML = `
        <svg class="spinner" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg>
        <span>Loading Next 20 Teams...</span>
      `;
      setTimeout(() => {
        loadMoreBtn.innerHTML = `
          <span>All 20 Metro Seeds Loaded</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        `;
        loadMoreBtn.disabled = true;
        loadMoreBtn.style.opacity = '0.7';
      }, 700);
    });
  }

  // 2. Interactive Fan Poll Voting
  const pollItems = document.querySelectorAll('.poll-option-item');
  const voteSuccessMsg = document.getElementById('voteSuccessMsg');

  pollItems.forEach(item => {
    const voteBtn = item.querySelector('.poll-vote-btn');
    if (voteBtn) {
      voteBtn.addEventListener('click', () => {
        pollItems.forEach(pi => pi.classList.remove('voted'));
        item.classList.add('voted');

        // Play positive voting sound chime
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
          osc.frequency.exponentialRampToValueAtTime(880.00, ctx.currentTime + 0.18); // A5
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        } catch (err) {}

        if (voteSuccessMsg) {
          voteSuccessMsg.style.display = 'flex';
        }
      });
    }
  });

  // 3. Live Finals Countdown Clock (Las Vegas Finals)
  function initFinalsCountdown() {
    const daysEl = document.getElementById('countDays');
    const hoursEl = document.getElementById('countHours');
    const minsEl = document.getElementById('countMins');
    const secsEl = document.getElementById('countSecs');

    if (!daysEl) return;

    // Target Vegas Finals date (e.g. 84 days out)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 84);
    targetDate.setHours(19, 0, 0, 0);

    function tick() {
      const now = new Date();
      const diff = Math.max(0, targetDate - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
    }

    tick();
    setInterval(tick, 1000);
  }
  initFinalsCountdown();

  // 4. Team Roster Modal Viewer
  const rosterButtons = document.querySelectorAll('.btn-roster-view');
  const rosterModal = document.getElementById('rosterModal');
  const rosterBackdrop = document.getElementById('rosterModalBackdrop');
  const closeRosterBtn = document.getElementById('closeRosterModalBtn');
  const modalTitle = document.getElementById('rosterModalTitle');
  const modalDivTag = document.getElementById('modalDivTag');
  const modalVenueInfo = document.getElementById('modalVenueInfo');
  const modalEloVal = document.getElementById('modalEloVal');
  const modalMembersList = document.getElementById('modalMembersList');

  const rosterDatabase = {
    '4': {
      name: 'Les Quizzerables',
      division: 'Division I',
      venue: 'Black Sheep Lodge (Austin, TX)',
      elo: '4,310',
      winRate: '90.0%',
      streak: '3 Wins',
      members: [
        { name: 'Elena Rostova', role: 'Captain & Literature Savant' },
        { name: 'Derrick Vance', role: 'History & 80s Rock Specialist' },
        { name: 'Nadia Thorne', role: 'Cinema & Oscar Buff' },
        { name: 'Samir Patel', role: 'Science & Audio Lightning Lead' }
      ]
    },
    '5': {
      name: 'Tequila Mockingbird',
      division: 'Division I',
      venue: 'Wrigley Pub House (Chicago, IL)',
      elo: '4,240',
      winRate: '85.0%',
      streak: '2 Wins',
      members: [
        { name: 'Julian Hayes', role: 'Captain & Pop Culture Expert' },
        { name: 'Chloe Briggs', role: 'Geography & Flags Lead' },
        { name: 'Tyler Ross', role: 'Sports & TV Sitcom Master' },
        { name: 'Alicia Mendez', role: 'Speed Buzzer Specialist' }
      ]
    },
    '6': {
      name: 'Fact Checkers Club',
      division: 'Division I',
      venue: 'Fremont Brewing Co (Seattle, WA)',
      elo: '4,180',
      winRate: '84.2%',
      streak: '3 Wins',
      members: [
        { name: 'Samantha Reed', role: 'Captain & Neuroscience Fellow' },
        { name: 'Brian Sterling', role: '90s Hip Hop & Synth Buff' },
        { name: 'Gordon Zhao', role: 'World Politics & Tech Lead' },
        { name: 'Emily Clark', role: 'Food & Michelin Dining Savant' }
      ]
    },
    '7': {
      name: 'Cloud Quantum Quiz',
      division: 'Corporate Masters',
      venue: 'LoDo Barrelhouse (Denver, CO)',
      elo: '4,120',
      winRate: '88.2%',
      streak: '4 Wins',
      members: [
        { name: 'Kevin Chen', role: 'Team Lead & Cloud Architect' },
        { name: 'Priya Sharma', role: 'Machine Learning & Logic Wizard' },
        { name: 'David Miller', role: 'Ancient History & Mythology' },
        { name: 'Lisa Zhang', role: 'Music Blitz & Audio Speed' }
      ]
    }
  };

  rosterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const teamId = btn.getAttribute('data-team-id') || '4';
      const data = rosterDatabase[teamId] || rosterDatabase['4'];

      if (modalTitle) modalTitle.textContent = data.name;
      if (modalDivTag) modalDivTag.textContent = data.division;
      if (modalVenueInfo) modalVenueInfo.textContent = `Home Pub: ${data.venue}`;
      if (modalEloVal) modalEloVal.textContent = data.elo;

      if (modalMembersList) {
        modalMembersList.innerHTML = data.members.map(m => `
          <div class="roster-member-card">
            <div class="member-avatar">${m.name.split(' ').map(n=>n[0]).join('')}</div>
            <div class="member-info">
              <span class="member-name">${m.name}</span>
              <span class="member-role">${m.role}</span>
            </div>
          </div>
        `).join('');
      }

      if (rosterModal) {
        rosterModal.classList.add('active');
        rosterModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  function closeRosterModal() {
    if (rosterModal) {
      rosterModal.classList.remove('active');
      rosterModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (closeRosterBtn) closeRosterBtn.addEventListener('click', closeRosterModal);
  if (rosterBackdrop) rosterBackdrop.addEventListener('click', closeRosterModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && rosterModal && rosterModal.classList.contains('active')) {
      closeRosterModal();
    }
  });
}




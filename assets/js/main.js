/**
 * Tsukuba Opera Club (つくばオペラ愛好会 & タンゴサロン)
 * Interactive Application Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initPetalCanvas();
  initAudioPlayer();
  initScrollAnimations();
  initWednesdaySalonDates();
  initCalendarDownload();
  initModals();
  initHeaderScroll();
  initContactForm();
});

/* ==========================================================================
   1. Interactive Romantic Rose Petal Particle Canvas
   ========================================================================== */
function initPetalCanvas() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;

  // Check reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const petalCount = window.innerWidth < 768 ? 16 : 28;

  // Rich crimson / velvet rose color variants
  const petalColors = [
    'rgba(180, 25, 45, 0.75)',
    'rgba(145, 18, 35, 0.8)',
    'rgba(215, 40, 70, 0.7)',
    'rgba(110, 12, 26, 0.85)',
    'rgba(235, 75, 95, 0.65)'
  ];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -30;
      this.size = 10 + Math.random() * 16;
      this.speedY = 0.8 + Math.random() * 1.5;
      this.speedX = -0.5 + Math.random() * 1.0;
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = 0.01 + Math.random() * 0.02;
      this.wobble = Math.random() * Math.PI;
      this.wobbleSpeed = 0.02 + Math.random() * 0.03;
      this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
      this.opacity = 0.4 + Math.random() * 0.5;
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.wobble) * 1.2 + this.speedX;
      this.wobble += this.wobbleSpeed;
      this.angle += this.angleSpeed;

      if (this.y > height + 30 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.scale(Math.cos(this.wobble * 0.5), 1);

      ctx.fillStyle = this.color;
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 4;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
      ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Interactive Native Audio Player & Jukebox
   ========================================================================== */
function initAudioPlayer() {
  const tracks = [
    {
      title: '想いの届く日 (El día que me quieras)',
      artist: 'Mari & Luna with 淡路七穂子タンゴトリオ',
      genre: 'Argentine Tango Classic / Carlos Gardel',
      src: 'assets/preview_sample1.mp3',
      length: '0:35'
    },
    {
      title: 'リベルタンゴ ＆ 歌うタンゴ (Libertango & Passions)',
      artist: 'つくばオペラ愛好会 & タンゴトリオ',
      genre: 'Nuevo Tango / Astor Piazzolla',
      src: 'assets/preview_sample2.mp3',
      length: '0:35'
    }
  ];

  let currentTrackIdx = 0;
  const audio = new Audio();
  audio.src = tracks[currentTrackIdx].src;
  audio.preload = 'metadata';

  // Elements
  const heroPlayBtn = document.getElementById('hero-play-btn');
  const heroAudioChip = document.getElementById('hero-audio-chip');
  const mainPlayBtn = document.getElementById('main-play-btn');
  const turntable = document.getElementById('turntable');
  const playingTitle = document.getElementById('playing-title');
  const playingArtist = document.getElementById('playing-artist');
  const currentTimeEl = document.getElementById('current-time');
  const totalTimeEl = document.getElementById('total-time');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const progressBarContainer = document.getElementById('progress-bar-container');
  const trackItems = document.querySelectorAll('.track-item');
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');

  function updateTrackDisplay() {
    const cur = tracks[currentTrackIdx];
    if (playingTitle) playingTitle.textContent = cur.title;
    if (playingArtist) playingArtist.textContent = cur.artist;

    trackItems.forEach((item, idx) => {
      if (idx === currentTrackIdx) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    const chipTitle = document.querySelector('.chip-title');
    const chipArtist = document.querySelector('.chip-artist');
    if (chipTitle) chipTitle.textContent = cur.title;
    if (chipArtist) chipArtist.textContent = cur.artist;
  }

  function setPlayingState(isPlaying) {
    if (isPlaying) {
      if (heroAudioChip) heroAudioChip.classList.remove('paused');
      if (turntable) turntable.classList.remove('paused');
      if (heroPlayBtn) heroPlayBtn.innerHTML = '❚❚';
      if (mainPlayBtn) mainPlayBtn.innerHTML = '❚❚';
    } else {
      if (heroAudioChip) heroAudioChip.classList.add('paused');
      if (turntable) turntable.classList.add('paused');
      if (heroPlayBtn) heroPlayBtn.innerHTML = '▶';
      if (mainPlayBtn) mainPlayBtn.innerHTML = '▶';
    }
  }

  function togglePlay() {
    if (audio.paused) {
      audio.play().then(() => {
        setPlayingState(true);
      }).catch(err => {
        console.warn('Audio play prevented:', err);
      });
    } else {
      audio.pause();
      setPlayingState(false);
    }
  }

  function loadTrack(idx) {
    currentTrackIdx = idx;
    audio.src = tracks[currentTrackIdx].src;
    audio.currentTime = 0;
    updateTrackDisplay();
    audio.play().then(() => {
      setPlayingState(true);
    }).catch(err => {
      console.warn('Playback error:', err);
    });
  }

  if (heroPlayBtn) heroPlayBtn.addEventListener('click', togglePlay);
  if (mainPlayBtn) mainPlayBtn.addEventListener('click', togglePlay);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      let nextIdx = currentTrackIdx - 1;
      if (nextIdx < 0) nextIdx = tracks.length - 1;
      loadTrack(nextIdx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      let nextIdx = (currentTrackIdx + 1) % tracks.length;
      loadTrack(nextIdx);
    });
  }

  trackItems.forEach((item) => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.getAttribute('data-track-index'), 10);
      if (!isNaN(idx)) {
        loadTrack(idx);
      }
    });
  });

  // Timeline & External play triggers
  document.querySelectorAll('.trigger-audio').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const trackId = parseInt(btn.getAttribute('data-track-index') || '0', 10);
      loadTrack(trackId);
      // Smooth scroll to player if requested
      const jukeboxEl = document.getElementById('jukebox');
      if (jukeboxEl) {
        jukeboxEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Time update
  audio.addEventListener('timeupdate', () => {
    const cur = audio.currentTime;
    const dur = audio.duration || 35;
    const pct = (cur / dur) * 100;
    if (progressBarFill) progressBarFill.style.width = `${pct}%`;

    const curMin = Math.floor(cur / 60);
    const curSec = Math.floor(cur % 60);
    if (currentTimeEl) {
      currentTimeEl.textContent = `${curMin}:${curSec < 10 ? '0' : ''}${curSec}`;
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    const dur = audio.duration;
    const durMin = Math.floor(dur / 60);
    const durSec = Math.floor(dur % 60);
    if (totalTimeEl) {
      totalTimeEl.textContent = `${durMin}:${durSec < 10 ? '0' : ''}${durSec}`;
    }
  });

  audio.addEventListener('ended', () => {
    let nextIdx = (currentTrackIdx + 1) % tracks.length;
    loadTrack(nextIdx);
  });

  // Scrubber click
  if (progressBarContainer) {
    progressBarContainer.addEventListener('click', (e) => {
      const rect = progressBarContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const dur = audio.duration || 35;
      audio.currentTime = (clickX / width) * dur;
    });
  }

  updateTrackDisplay();
  setPlayingState(false);
}

/* ==========================================================================
   3. Modern Scroll-Driven Animation & Fallback
   ========================================================================== */
function initScrollAnimations() {
  const supportsNativeScrollAnimation = CSS.supports && 
    CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

  if (!supportsNativeScrollAnimation) {
    const elementsToReveal = document.querySelectorAll(
      '.timeline-event-card, .diva-card, .pillar-item, .gallery-grid-item, .salon-invitation-card'
    );

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15
    });

    elementsToReveal.forEach(el => observer.observe(el));
  }
}

/* ==========================================================================
   4. Calculate Next 2nd and 4th Wednesday Salon Dates
   ========================================================================== */
function initWednesdaySalonDates() {
  const nextDateDisplay = document.getElementById('next-salon-date');
  const countdownEl = document.getElementById('salon-countdown');
  const dateCard = document.getElementById('salon-dates-card');
  if (!nextDateDisplay) return;

  function getNthWednesdayOfMonth(year, month, n) {
    let count = 0;
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      if (date.getDay() === 3) { // 3 = Wednesday
        count++;
        if (count === n) {
          return new Date(date);
        }
      }
      date.setDate(date.getDate() + 1);
    }
    return null;
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // Find candidates for 2nd and 4th wednesdays of this month and next month
  const candidates = [
    getNthWednesdayOfMonth(year, month, 2),
    getNthWednesdayOfMonth(year, month, 4),
    getNthWednesdayOfMonth(year, month + 1, 2),
    getNthWednesdayOfMonth(year, month + 1, 4)
  ].filter(d => d !== null);

  // Set time to 13:30 (1:30 PM)
  candidates.forEach(d => d.setHours(13, 30, 0, 0));

  // Find the earliest upcoming session
  const nextSession = candidates.find(d => d.getTime() > now.getTime()) || candidates[0];

  const monthNum = nextSession.getMonth() + 1;
  const dayNum = nextSession.getDate();
  const daysDiff = Math.ceil((nextSession.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  nextDateDisplay.textContent = `${monthNum}月${dayNum}日 (水) 13:30〜`;
  if (countdownEl) {
    if (daysDiff === 0) {
      countdownEl.textContent = '本日開催中！見学可能';
    } else if (daysDiff === 1) {
      countdownEl.textContent = 'いよいよ明日開催！';
    } else {
      countdownEl.textContent = `次回開催まで あと ${daysDiff} 日`;
    }
  }

  // Pre-fill form selection with this date if available
  const salonDateSelect = document.getElementById('preferred-date');
  if (salonDateSelect) {
    const opt1 = candidates.find(d => d.getTime() > now.getTime());
    const opt2 = candidates.find(d => d.getTime() > (opt1 ? opt1.getTime() : now.getTime()));
    if (opt1) {
      const o1 = document.createElement('option');
      o1.value = `${opt1.getMonth() + 1}月${opt1.getDate()}日(水)`;
      o1.textContent = `${opt1.getMonth() + 1}月${opt1.getDate()}日(水) 13:30〜 定例サロン`;
      salonDateSelect.appendChild(o1);
    }
    if (opt2) {
      const o2 = document.createElement('option');
      o2.value = `${opt2.getMonth() + 1}月${opt2.getDate()}日(水)`;
      o2.textContent = `${opt2.getMonth() + 1}月${opt2.getDate()}日(水) 13:30〜 定例サロン`;
      salonDateSelect.appendChild(o2);
    }
  }
}

/* ==========================================================================
   5. RFC 5545 iCalendar (.ics) Generator & Downloader
   ========================================================================== */
function initCalendarDownload() {
  const downloadBtn = document.getElementById('btn-download-ics');
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Generate iCal RFC 5545 file with recurrence for 2nd and 4th Wednesday
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Tsukuba Opera Club//Salon Calendar//JA',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:つくばオペラ愛好会 水曜サロン',
      'X-WR-TIMEZONE:Asia/Tokyo',
      'BEGIN:VEVENT',
      'UID:tsukuba-opera-salon-' + Date.now() + '@tsukuba-opera.jp',
      'DTSTAMP:20250101T000000Z',
      'DTSTART;TZID=Asia/Tokyo:20250409T133000',
      'DTEND;TZID=Asia/Tokyo:20250409T163000',
      'RRULE:FREQ=MONTHLY;BYDAY=2WE,4WE',
      'SUMMARY:つくばオペラ愛好会 水曜午後の定例オペラサロン',
      'DESCRIPTION:毎月第2・第4水曜午後の定期練習・ベルカント発声法・オペラ重唱・アルゼンチンタンゴ歌唱＆サロンティータイム。見学・新会員歓迎。主催：石井・箕輪',
      'LOCATION:つくばノバホール練習室 / つくば市内文化サロン (茨城県つくば市)',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tsukuba_opera_wednesday_salon.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}

/* ==========================================================================
   6. Modal Dialogs (Video Highlight & Gallery Lightbox)
   ========================================================================== */
function initModals() {
  const modal = document.getElementById('site-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContainer = document.getElementById('modal-media-container');
  const closeBtn = document.getElementById('modal-close');

  if (!modal || !modalContainer) return;

  function openModal(title, mediaHtml) {
    if (modalTitle) modalTitle.textContent = title;
    modalContainer.innerHTML = mediaHtml;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modalContainer.innerHTML = '';
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Watch Concert Highlight Button
  const watchClipBtn = document.getElementById('btn-watch-clip');
  if (watchClipBtn) {
    watchClipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const videoHtml = `
        <video controls autoplay class="modal-video-element">
          <source src="assets/video/nova_hall_highlight.mp4" type="video/mp4">
          Your browser does not support HTML5 video.
        </video>
        <p style="margin-top:1rem; color:#d4af37; font-size:0.9rem; text-align:center;">
          2025.3.22 つくばノバホール公演『歌うアルゼンチンタンゴ』より
        </p>
      `;
      openModal('つくばノバホール公演 ハイライト映像 (Nova Hall Stage Highlight)', videoHtml);
    });
  }

  // Gallery item clicks
  document.querySelectorAll('.gallery-grid-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption-title')?.textContent || 'Stage Moment';
      const sub = item.querySelector('.gallery-caption-sub')?.textContent || '';
      if (!img) return;

      const photoHtml = `
        <img src="${img.src}" alt="${caption}" style="width:100%; max-height:70vh; object-fit:contain; border-radius:8px;">
        <div style="margin-top:1rem; text-align:center;">
          <h4 style="color:#fff; font-family:'Cinzel Decorative', serif; font-size:1.2rem;">${caption}</h4>
          <p style="color:#d4af37; font-size:0.85rem;">${sub}</p>
        </div>
      `;
      openModal(caption, photoHtml);
    });
  });
}

/* ==========================================================================
   7. Header Scroll Behavior & Mobile Nav
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'rgba(10, 4, 12, 0.98)';
      navLinks.style.padding = '1.5rem';
      navLinks.style.borderBottom = '1px solid rgba(212, 175, 55, 0.3)';
    });
  }
}

/* ==========================================================================
   8. Contact & Salon Inquiry Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('salon-inquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('user-name')?.value || '';
    const email = document.getElementById('user-email')?.value || '';
    const date = document.getElementById('preferred-date')?.value || '第2・第4水曜日';
    const message = document.getElementById('user-message')?.value || '';

    const subject = encodeURIComponent(`【見学・参加希望】つくばオペラ愛好会 お問い合わせ (${name}様)`);
    const body = encodeURIComponent(
      `つくばオペラ愛好会 / つくばタンゴクラブ (石井・箕輪 様)\n\n` +
      `ウェブサイトより見学・参加のお問い合わせです。\n\n` +
      `【お名前】: ${name}\n` +
      `【ご連絡先】: ${email}\n` +
      `【希望日程】: ${date}\n\n` +
      `【メッセージ・歌のご経験など】:\n${message}\n\n` +
      `よろしくお願いいたします。`
    );

    // Open mail client to tsukubatango@gmail.com
    window.location.href = `mailto:tsukubatango@gmail.com?subject=${subject}&body=${body}`;

    alert(`ありがとうございます、${name}様。\nメールソフトを起動し、つくばタンゴクラブ・オペラ愛好会（石井・箕輪）へのお問合せメールを作成しました。`);
  });
}

# Tsukuba Opera Club & Tango Salon (つくばオペラ愛好会 ＆ タンゴサロン)

> *“年輪を重ねるほど、歌声は深く、魂は自由に。”*  
> *(“The more rings of life we gather, the deeper the voice resonates, and the freer the soul becomes.”)*  
> — **Everlasting Artistic Soul**

A bespoke, visually luring landing page and digital archive for the **Tsukuba Opera Club** (*つくばオペラ愛好会* / *つくばタンゴクラブ*), an upper-intellectual, elegant, yet delightfully spirited social circle of ladies based in the international Science City of Tsukuba, Ibaraki, Japan.

---

## 🎭 Context & Background (What You Won't Get Just from the Code)

### 1. The Soul of the Tsukuba Opera Circle
Tsukuba Science City is a unique community with an exceptionally high concentration of academics, research scientists, intellectual families, and cosmopolitan cultural patrons. 

This club is not a generic community center senior choir. It is an exclusive, cultivated salon of senior ladies who carry an **everlasting artistic soul** (*永遠の芸術魂*). Rather than treating music as a casual hobby, they approach vocal performance with serious Bel Canto discipline, theatrical glamour, and a sharp, joyful sense of humor. They bridge the gap between classical European opera (Verdi, Puccini, Mozart) and the intense, poetic nostalgia of Argentine Tango (Astor Piazzolla, Carlos Gardel).

### 2. The Significance of "2nd & 4th Wednesday Afternoons"
In the club's routine, **every 2nd and 4th Wednesday afternoon (13:30 – 16:30)** is sacred.
* Members gather at cultural venues such as the rehearsal rooms of **Tsukuba Nova Hall** (*ノバホール*) or local music salons.
* The afternoon follows four distinct rituals:
  1. **Bel Canto Breathwork & Vocal Warmup**: Deep diaphragmatic training that preserves vocal flexibility and promotes lifelong vitality.
  2. **Opera Scene Work & Arias**: Rehearsing solos, duets, and ensembles in Italian, French, and German.
  3. **Argentine Tango Duets**: Singing fiery tango arrangements (*“歌うタンゴ”*).
  4. **High-Tea Salon Discourse**: The session always concludes over fine tea and sweets, where members discuss music history, upcoming performances, and personal reflections.
* **Why the dynamic countdown & `.ics` export exist**: Because members and prospective attendees primarily use smartphones and iPads, the site dynamically calculates the upcoming 2nd or 4th Wednesday and generates a standard RFC 5545 iCalendar (`.ics`) file with a single tap—no account registration or app download needed.

### 3. The Reference Poster & The Landmark Nova Hall Concert
The visual identity of this website was reverse-engineered from the original promotional poster (`1791013924762.jpg` / `assets/images/poster.jpg`) for their sold-out concert on **March 22, 2025**:
* **Event**: *歌うアルゼンチンタンゴ — Tango Argentina en Tsukuba*
* **Venue**: **Tsukuba Nova Hall (Small Hall)** — an acoustical masterpiece designed by Pritzker Prize laureate Arata Isozaki.
* **The Divas**:
  * **Mari** (*Ishii*): Dramatic, rich, soulful mezzo/spinto vocals, wearing an emerald-and-gold peacock gown.
  * **Luna** (*Minowa*): Crystalline, radiant lyric soprano, wearing a midnight sapphire gown and shimmering pink sequin dress.
* **Guest Ensemble**: The distinguished **Nahoko Awaji Tango Trio** (*淡路七穂子タンゴトリオ*):
  * **Nahoko Awaji** (Piano)
  * **Tatsunori Ikeda** (Bandoneon)
  * **Hidenori Senko** (Violin)
* **Repertoire**: *El día que me quieras* (想いの届く日), *La cumparsita*, *Alfonsina y el mar*, *Chiquilín de Bachín*, *Jalousie*, and *Libertango*.

### 4. Parallel DVD Authoring Project & Media Provenance
During the creation of this website, an automated agent concurrently processed the 1.3 GB 1080p master concert recording (`2025 3 22 歌うアルゼンチンタンゴ 筑波ノバホール [TZ3BUqHQQLM].mp4`) into a two-pass NTSC DVD release (`アルゼンチンタンゴ_DVD.iso`).
* The audio previews (`preview_sample1.mp3`, `preview_sample2.mp3`), the 15-second 720p highlight video (`nova_hall_highlight.mp4`), and all high-resolution stage photos in `assets/images/` were extracted and downsampled directly from that live master recording.
* The large master media files (>1 GB) are deliberately ignored in `.gitignore` to keep the repository lightweight and deployment-ready for GitHub Pages.

---

## 🎨 Design Philosophy & Aesthetic System

1. **Color Palette**:
   * **Operatic Velvet Crimson** (`#7a1226`, `#3b0914`): Evoking theatrical opera curtains, vintage roses, and Buenos Aires milongas.
   * **Midnight Stage Sapphire** (`#0e2444`, `#071120`): Evoking evening gowns and dramatic stage backlighting.
   * **Gold Foil & Champagne Silk** (`#d4af37`, `#ffd778`): Representing high-culture elegance and timeless luxury.
2. **Falling Rose Petal Canvas (Canvas 2D)**:
   * A lightweight particle simulation that renders drifting, rotating rose petals inspired by the falling petals on the concert poster.
   * Automatically disables if the user has `prefers-reduced-motion: reduce` enabled.
3. **Typography**:
   * *Cinzel Decorative* & *Playfair Display*: Grand operatic and theatrical titles.
   * *Cormorant Garamond*: Editorial body text.
   * *Noto Serif JP* (*源ノ明朝*): Dignified, cultivated Japanese serif text.
   * *Montserrat*: Clear, high-contrast UI badges and schedule labels.

---

## 💻 Tech Stack & Architectural Decisions

* **Vanilla HTML5, Modern CSS3, ES6+ JavaScript**:
  * **Zero runtime dependencies** (`node_modules`-free).
  * Instantaneous initial load with zero framework hydration lag.
  * Minimal memory footprint, perfectly suited for senior users on iPads and mobile devices.
* **Native CSS Scroll-Driven Animations**:
  * Leverages `@supports ((animation-timeline: view()) and (animation-range: entry))` so that event timeline reveals run directly on the browser's compositor thread (GPU) without JavaScript scroll-jacking.
  * Includes progressive enhancement with an `IntersectionObserver` fallback for older browsers.
* **Integrated Native Audio & Video Engines**:
  * HTML5 Audio Jukebox with spinning turntable vinyl animation, real-time scrubber, and synchronized equalizer.
  * Lightweight modal lightbox for stage photos and the 15-second concert highlight video.

---

## 📁 Repository Structure

```text
opera/
├── index.html                     # Main landing page
├── assets/
│   ├── css/
│   │   └── style.css              # Complete design system & scroll animations
│   ├── js/
│   │   └── main.js                # Particle canvas, audio player, calendar engine
│   ├── images/
│   │   ├── poster.jpg             # Reference concert poster (1076x1522)
│   │   ├── mari_portrait.jpg      # Cropped portrait of Mari (Ishii)
│   │   ├── luna_portrait.jpg      # Cropped portrait of Luna (Minowa)
│   │   ├── mari_luna_duo.jpg      # Duo portrait
│   │   ├── live_mari_gown.jpg     # Live stage photo (Peacock dress solo)
│   │   ├── live_luna_pink.jpg     # Live stage photo (Pink dress solo)
│   │   ├── stage_02.jpg           # Nova Hall wide stage view
│   │   ├── stage_instrumental.jpg # Awaji Nahoko Tango Trio in action
│   │   └── stage_bow.jpg          # Curtain call & flower bouquet presentation
│   ├── preview_sample1.mp3        # Live clip: El día que me quieras (35s)
│   ├── preview_sample2.mp3        # Live clip: Libertango & Passions (35s)
│   └── video/
│       └── nova_hall_highlight.mp4 # 15s stage video highlight (720p, 940 KB)
├── .gitignore                     # Excludes 1GB+ video/ISO files
└── README.md                      # Project manual & background context
```

---

## 🚀 Local Preview & Deployment

### Run Locally
You can run any local static file server:

```bash
# Using Python
python3 -m http.server 8085

# Or using Node
npx serve .
```
Then visit `http://localhost:8085/index.html`.

### Deploy to GitHub Pages
1. Go to repository **Settings** > **Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Set branch to `main` and folder to `/ (root)`, then click **Save**.
4. The site will be live within seconds at `https://azzmmzza.github.io/opera/`.

---

## ✉ Contact & Inquiries
* **Organizers**: Tsukuba Tango Club / Tsukuba Opera Club (石井・箕輪 / Ishii & Minowa)
* **Email**: `tsukubatango@gmail.com`
* **Regular Activities**: 2nd and 4th Wednesday afternoons, Tsukuba, Ibaraki, Japan.

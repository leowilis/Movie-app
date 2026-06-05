# 🎬 Movie Explorer App

> A cinematic movie discovery experience built with React + TypeScript, powered by the TMDB API.

<div align="center">

**[🚀 Live Demo](https://movie-app-seven-wheat.vercel.app/)** &nbsp;·&nbsp; 
**[📂 Repository](https://github.com/leowilis/Movie-app)**

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel&logoColor=white)

</div>

---

## Features

| Feature | Description |
|---|---|
| 🎥 **Hero Carousel** | Auto-rotating banner with backdrop, rating, overview, and trailer button |
| 🔥 **Trending & New Release** | Horizontal sliders with Netflix-style hover popup — trailer preview, add favorite, see detail |
| 🎬 **Now Playing** | Responsive grid with genre filter pills, result count, and Load More pagination |
| 🔍 **Search** | Debounced input, URL deep-linking (`?q=`), genre filtering, and result count |
| ❤️ **Favorites** | Numbered grid with heart badges, persisted in `localStorage` via Zustand |
| 🎞️ **Movie Detail** | Full page with cast, stats, overview, trailer modal, and similar movies carousel |
| 📱 **Responsive** | Mobile, tablet (`lg` breakpoint), and desktop layouts |

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Data Fetching | TanStack Query v5 |
| Animations | Framer Motion |
| State Management | Zustand + persist middleware |
| API | TMDB (The Movie Database) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- TMDB API key — free at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/leowilis/Movie-app.git
cd Movie-app

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your TMDB API key in .env

# 4. Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_BASE_URL=https://api.themoviedb.org/3
```

---

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer
│   └── movie/           # MovieCard, TrailerMovieCard
├── features/
│   ├── home/            # Hero, TrendingSection, NewRelease, SearchBar
│   ├── movie/           # MovieCardPopup, FavoriteMovieCard, hooks, types
│   └── ui/              # Button, Skeleton, icons, BackButton
├── hooks/               # useDebounce, useSlider, usePageTitle, useCardPopup
├── pages/               # HomePage, SearchPage, NowPlayingPage, FavoritesPage, MovieDetailPage
├── services/            # TMDB API service layer (movieService.ts)
├── store/               # Zustand favorites store
├── constants/           # navItems
└── router/              # Route definitions
```

---

## Key Implementation Details

### Netflix-style Hover Popup
`TrailerMovieCard` + `MovieCardPopup` use a **React Portal** with `getBoundingClientRect` for viewport-aware positioning. A 500ms debounced hover delay prevents flicker on fast mouse movement. Trailer is fetched on-demand to conserve TMDB API quota.

### Deep-linked Search
`SearchPage` syncs query state with URL params (`?q=`), enabling shareable URLs and correct browser back/forward navigation. Input is debounced at 400ms before triggering the API call.

### Infinite Pagination
`NowPlayingPage` uses TanStack Query `useInfiniteQuery` to flatten multi-page results into a single array, with client-side genre filtering applied on top.

### Favorites Persistence
Zustand `persist` middleware writes favorites to `localStorage` — survives page refreshes and browser restarts with zero extra setup.

---

## License

MIT
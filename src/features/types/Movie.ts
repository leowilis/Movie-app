export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  popularity: number
  adult: boolean
}

export interface MovieResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  name: string
  logo_path: string | null
  origin_country: string
}

export interface MovieDetail extends Movie {
  genres: Genre[]
  runtime: number
  tagline: string
  status: string
  budget: number
  revenue: number
  production_companies: ProductionCompany[]
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface MovieCredits { 
  id: number
  cast: CastMember[]
}
export interface MovieBase {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}
export interface Movie extends MovieBase {
  Type: string
}
export interface MovieSearchResponse {
  Search?: Movie[]
  totalResults?: string
  Response: 'True' | 'False'
  Error?: string
}
export interface MovieDetail extends Movie {
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Ratings: { Source: string; Value: string }[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  totalSeasons: string
}

export interface CustomMovie extends MovieBase {
  Plot: string
  isCustom: true
}

export type CreateMoviePayload = Omit<CustomMovie, 'imdbID' | 'isCustom'>


export interface UnsplashImage {
  id: string;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    html: string;
  };
  user: {
    name: string;
    portfolio_url: string | null;
  };
}

export interface UnsplashResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

export type Title = {
  type: 'Default' | 'Japanese' | 'English';
  title: string;
};

export type Genres = {
  mal_id: number;
  name: string;
  type: string;
  url: string;
};

export type Streaming = {
  name: string;
  url: string;
};

// relations

export type Entry = {
  mal_id: number;
  name: string;
  type: string;
};

export type Relations = {
  relation: string;
  entry: Entry[];
};

// an anime

export type ItemData = {
  aired?: { from?: Date; to?: Date };
  airing?: boolean;
  approved?: boolean;
  duration?: string;
  mal_id: number;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
      small_image_url: string;
    };
  };
  title?: string;
  title_english?: string;
  title_synonyms?: string[];
  titles: Title[];
  name: string;
  type: string;
  score: number;
  rank: number;
  favorites?: number;
  episodes?: number;
  synopsis?: string;
  streaming?: Streaming[];
  genres?: Genres[];
  relations?: Relations[];
  source?: string;
};

export type PaginationData = {
  current_page: number;
  has_next_page: boolean;
  items: { count: number; total: number; per_page: number };
  last_visible_page: number;
};

export type Title = {
  type: 'Default' | 'Japanese' | 'English';
  title: string;
};

export type ItemData = {
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
  favorites?: number;
  approved?: boolean;
  episodes?: number;
  aired?: { from: Date; to: Date };
  synopsis?: string;
};

export type PaginationData = {
  current_page: number;
  has_next_page: boolean;
  items: { count: number; total: number; per_page: number };
  last_visible_page: number;
};

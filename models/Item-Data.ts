export type ItemData = {
  mal_id: number;
  images: {
    jpg: {
      image_url: string;
    };
  };
  title?: string;
  name: string;
  type: string;
  score: number;
  favorites?: number;
  approved?: boolean;
  episodes?: number;
  aired?: { from: Date; to: Date };
  synopsis?: string;
};

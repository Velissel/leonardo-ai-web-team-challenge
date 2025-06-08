export interface MediaTag {
  name: string;
}

export interface MediaTitle {
  userPreferred: string;
}

export interface MediaItem {
  id: number;
  title: MediaTitle;
  type: string;
  genres: string[];
  tags: MediaTag[];
  averageScore: number | null;
  bannerImage: string;
  description: string;
}

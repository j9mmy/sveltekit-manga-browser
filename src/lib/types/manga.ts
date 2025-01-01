export type Title = {
  english: string | null;
  native: string;
  romaji: string;
};

export type CoverImage = {
  large: string;
};

export type CharacterName = {
  full: string;
  native: string;
};

export type CharacterImage = {
  medium: string;
};

export type Character = {
  name: CharacterName;
  image: CharacterImage;
};

export type Media = {
  id: number;
  title: Title;
  description: string;
  coverImage: CoverImage;
  bannerImage: string;
  chapters: number;
  genres: string[];
  synonyms: string[];
  averageScore: number;
  favourites: number;
  characters: {
    nodes: Character[];
  };
};

export type PartialMedia = {
  title: Title;
  coverImage: CoverImage;
  id: number;
  chapters: number;
};

export type Page = {
  media: PartialMedia[];
};

export type PageMedia = {
  data: {
    GenreCollection: string[];
    Page: Page;
  };
};

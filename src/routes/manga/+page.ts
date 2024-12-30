import type { PageLoad } from "./$types";
import { dev } from "$app/environment";
import { mockMangaData } from "$lib/mock/manga";
import type { Title, CoverImage } from "$lib/types/manga";

type Media = {
  title: Title;
  coverImage: CoverImage;
  id: number;
  chapters: number;
};

type Page = {
  media: Media[];
};

type ApiResponse = {
  data: {
    GenreCollection: string[];
    Page: Page;
  };
};

export const load: PageLoad = async ({ fetch, url: ddd }) => {
  const query = `
  query Query($genre: String, $type: MediaType, $sort: [MediaSort]) {
    GenreCollection
    Page {
      media(genre: $genre, type: $type, sort: $sort) {
        title {
          english
          native
          romaji
        }
      }
    }
  }
  `;

  const variables = {
    genre: null,
    sort: "POPULARITY_DESC",
    type: "ANIME",
  };

  const url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  const fetchManga = async () => {
    if (dev) {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const item = mockMangaData as ApiResponse;
      console.log("Fetched mock data for multiple manga");

      return {
        genres: item.data.GenreCollection.filter((genre) => genre !== "Hentai"),
        media: item.data.Page.media,
      };
    }

    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Failed to fetch data from AniList");

    const item = (await res.json()) as ApiResponse;

    return {
      genres: item.data.GenreCollection,
      media: item.data.Page.media,
    };
  };

  return {
    mangaPromise: fetchManga(),
  };
};

import type { PageLoad } from "./$types";
import { dev } from "$app/environment";
import { mockMangaData } from "$lib/mock/manga";
import type { Media } from "$lib/types/manga";

// prettier-ignore
export const load: PageLoad = async ({ params, data }) => {
  const fetchManga = async () => {
    if (dev) {
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      const items = mockMangaData.data.Page.media as Media[];
      const item = items.find((item) => item.id === parseInt(params.id));
      if (item) {
        console.log("Manga found in mock data");
        return {
          ...item,
        };
      }
    }

    console.log("Item not found, fetching from API");
    const item = mockMangaData.data.Page.media[0] as Media;

    return {
      ...item,
    };
  };

  return {
    id: params.id,
    userManga: data.userManga ?? {
      status: null,
      score: null,
    },
    mangaPromise: fetchManga(),
  };
};

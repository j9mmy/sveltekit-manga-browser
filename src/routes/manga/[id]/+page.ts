import type { PageLoad } from "./$types";
import { mockMangaData } from "$lib/mock/manga";
import type { Media } from "$lib/types/manga";
import { searchMangaSingle } from "$lib/api/services/manga";

export const load: PageLoad = async ({ params, data }) => {
  const promise = async () => {
    const items = mockMangaData.data.Page.media as Media[];
    let item = items.find((item) => item.id === parseInt(params.id));

    if (item) {
      console.log("Manga found in mock data");
    } else {
      console.log("Manga not found in mock data. Fetching from API...");

      item = await searchMangaSingle(parseInt(params.id));
    }

    return item;
  };

  return {
    id: params.id,
    userManga: data.userManga ?? {
      status: null,
      score: null,
    },
    promise: promise(),
  };
};

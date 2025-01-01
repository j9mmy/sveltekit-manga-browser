import { searchMangaAndGenres } from "$lib/api/services/manga";
import type { PageLoad } from "./$types";

// prettier-ignore
export const load: PageLoad = async ({ url, fetch }) => {
  const search = url.searchParams.get("title") || "";
  const genre = url.searchParams.get("genre") || "All";
  const sortBy = url.searchParams.get("sortBy") || "Popularity";

  const item = await searchMangaAndGenres({ search, genre, sortBy });

  return {
    manga: item.Page.media,
    genres: item.GenreCollection.filter((genre: string) => genre !== "Hentai"), // Yes.
    filters: { search, genre, sortBy },
  };
};

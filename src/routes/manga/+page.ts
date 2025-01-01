import { dev } from "$app/environment";
import { mockMangaData } from "$lib/mock/manga";
import type { PageMedia } from "$lib/types/manga";
import type { PageLoad } from "./$types";

// prettier-ignore
export const load: PageLoad = async ({ url, fetch }) => {
  const search = url.searchParams.get("title") || "";
  const genre = url.searchParams.get("genre") || "All";
  const sortBy = url.searchParams.get("sortBy") || "Popularity";

  const query = `
    query ($search: String, $genre: String, $sort: [MediaSort], $type: MediaType, $isAdult: Boolean) {
      GenreCollection
      Page {
        media(search: $search, genre: $genre, sort: $sort, type: $type, isAdult: $isAdult) {
          title {
            english
            native
            romaji
          }
          coverImage {
            large
          }
          id
        }
      }
    }
  `;

  const variables = {
    search: search || null,
    genre: genre != "All" ? genre : null,
    sort: "POPULARITY_DESC",
    type: "MANGA",
    isAdult: false,
  };

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  console.log("X-RateLimit-Remaining: ", Number(res.headers.get("x-ratelimit-remaining")) - 60);

  const item = (await res.json()) as PageMedia;

  return {
    manga: item.data.Page.media,
    genres: item.data.GenreCollection.filter((genre: string) => genre !== "Hentai"), // Yes.
    filters: { search, genre, sortBy },
  };
};

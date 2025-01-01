import {
  SEARCH_MANGA_QUERY,
  SEARCH_MANGA_SINGLE_QUERY,
} from "../queries/manga";
import type { Media, PartialMedia } from "$lib/types/manga";

type SearchParams = {
  search: string;
  genre: string;
  sortBy: string;
};

export async function searchManga(params: SearchParams) {
  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: SEARCH_MANGA_QUERY,
      variables: {
        search: params.search || null,
        genre: params.genre !== "All" ? params.genre : null,
        sort: "POPULARITY_DESC",
        type: "MANGA",
        isAdult: false,
      },
    }),
  });
  if (!res.ok) throw new Error("Failed to fetch manga data");

  console.log(
    "X-RateLimit-Remaining: ",
    Number(res.headers.get("x-ratelimit-remaining")) - 60
  );

  const data = (await res.json()).data.Page.media as PartialMedia[];
  return data;
}

export async function searchMangaSingle(id: number) {
  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: SEARCH_MANGA_SINGLE_QUERY,
      variables: {
        isAdult: false,
        type: "MANGA",
        mediaId: id,
      },
    }),
  });
  if (!res.ok) throw new Error("Failed to fetch manga data");

  console.log(
    "X-RateLimit-Remaining: ",
    Number(res.headers.get("x-ratelimit-remaining")) - 60
  );

  const data = (await res.json()).data.Media as Media;
  return data;
}

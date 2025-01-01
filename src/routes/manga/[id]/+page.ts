import type { PageLoad } from "./$types";
import { dev } from "$app/environment";
import { mockMangaData } from "$lib/mock/manga";
import type { Media } from "$lib/types/manga";
import { error } from "@sveltejs/kit";

// prettier-ignore
export const load: PageLoad = async ({ params, data, fetch }) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const items = mockMangaData.data.Page.media as Media[];
  let item = items.find((item) => item.id === parseInt(params.id));

  if (item) {
    console.log("Manga found in mock data");
  } else {
    console.log("Manga not found in mock data. Fetching from API...");

    const query = `
    query Query($isAdult: Boolean, $type: MediaType, $mediaId: Int) {
      Media(isAdult: $isAdult, type: $type, id: $mediaId) {
        title {
          english
          native
          romaji
        }
        coverImage {
          large
        }
        id
        characters {
          nodes {
            name {
              full
              native
            }
            image {
              medium
            }
          }
        }
        favourites
        averageScore
        synonyms
        genres
        chapters
        bannerImage
        description
      }
    }
    `;
    
    const variables = {
      isAdult: false,
      type: "MANGA",
      mediaId: parseInt(params.id),
    };

    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    console.log("X-RateLimit-Remaining: ", Number(res.headers.get("x-ratelimit-remaining")) - 60);

    const json = await res.json();
    if (json.errors) {
      error(404, "Manga not found");
    }

    item = json.data.Media as Media;
  }

  return {
    id: params.id,
    userManga: data.userManga ?? {
      status: null,
      score: null,
    },
    manga: item,
  };
};

export const SEARCH_MANGA_QUERY = `
  query ($search: String, $genre: String, $sort: [MediaSort], $type: MediaType, $isAdult: Boolean) {
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

export const SEARCH_MANGA_SINGLE_QUERY = `
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

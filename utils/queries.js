import { gql } from "@apollo/client";
import client from "./graphql";

export const ANIME_LIST = async (page) => {
  return await client.query({
    query: gql`
      query {
        Page(page: ${page}, perPage: 10) {
          pageInfo {
            lastPage
            currentPage
          }
          media(type: ANIME, sort: TRENDING_DESC) {
            id
            title {
              romaji
              english
              native
              userPreferred
            }
            coverImage {
              extraLarge
              large
              medium
              color
            }
            bannerImage
            season
            episodes
            genres
            averageScore
          }
        }
      }
    `,
  });
};

export const ANIME_DETAIL = async (id) => {
  return await client.query({
    query: gql`
      query {
        Media(id: ${id}) {
          id,
          description,
          source,
          title {
            romaji
            english
            native
            userPreferred
          },
          coverImage {
            extraLarge
            large
            medium
            color
          },
          genres,
          status,
          averageScore,
          relations {
            edges {
              id
              node {
                id
                title {
                  romaji
                  english
                  native
                  userPreferred
                }
                coverImage {
                  extraLarge
                  large
                  medium
                  color
                }
                type
              }
            }
          },
          characters {
            edges {
              id
              node {
                id
                name {
                  full
                }
                image {
                  large
                  medium
                }
                gender
                image {
                  large
                  medium
                }
                media {
                  edges {
                    characters {
                      id
                    }
                    characterRole
                    
                  }
                }
              }
              voiceActors {
                id
                name {
                  full
                }
                languageV2
                image {
                  large
                  medium
                }
              }
            }
          },
          staff {
            edges {
              id
              node {
                id
                name {
                  full
                }
                image {
                  large
                  medium
                }
                gender
                description
              }
            }
          },
          trailer {
            id
            site
            thumbnail
          },
          recommendations {
            edges {
              node {
                id
                rating
                userRating
                media {
                  id
                  title {
                    romaji
                    english
                    native
                    userPreferred
                  }
                  coverImage {
                    extraLarge
                    large
                    medium
                    color
                  }
                  averageScore
                }
              }
            }
          },
          format,
          episodes,
          duration,
          season,
          studios {
            edges {
              id
              node {
                id
                name
              }
            }
          },
          source,
          tags {
            id 
            name
          },
          externalLinks {
            id
            url
            site
            icon
          }
        }
      }
    `,
  });
};

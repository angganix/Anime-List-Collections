import { gql } from "@apollo/client";
import client from "./graphql";

export const ANIME_LIST = async (page) => {
  return await client.query({
    query: gql`
      query {
        Page(page: ${page}, perPage: 10) {
          media(type: ANIME, sort: TRENDING_DESC) {
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

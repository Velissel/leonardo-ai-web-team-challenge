import { gql } from "@apollo/client";
import createApolloClient from "./apollo-client";

export default async function queryAniList(page: number, offset: number) {
  const client = createApolloClient();
  const query = gql`
    query Page($perPage: Int!, $page: Int!) {
      Page(perPage: $perPage, page: $page) {
        pageInfo {
          currentPage
          perPage
          total
        }
        media {
          id
          type
          format
          status
          description
          updatedAt
          genres
          averageScore
          tags {
            name
          }
          title {
            userPreferred
          }
        }
      }
    }
  `;
  return client.query({
    query,
    variables: {
      page: page,
      perPage: offset
    }
  });
}

import { gql } from '@apollo/client';

export const ALL_POSTS = gql`
  query allPosts($where: WherePost) {
    allPosts(where: $where) {
      edges {
        node {
          title
          preview
          date
          cover_image
          _meta {
            uid
          }
        }
      }
      totalCount
    }
  }
`;

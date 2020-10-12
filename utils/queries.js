import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query allPosts($where: WherePost) {
    allPosts(where: $where, sortBy:date_DESC) {
      edges {
        node {
          title
          preview
          date
          cover_image
          _meta {
            id
            uid
          }
        }
      }
      totalCount
    }
  }
`;

export const GET_ALL_POST_UIDS = gql`
  query allPosts($where: WherePost) {
    allPosts(where: $where) {
      edges {
        node {
          _meta {
            uid
          }
        }
      }
      totalCount
    }
  }
`;

export const GET_POST = gql`
  query allPosts($uid: String) {
    allPosts(uid: $uid) {
      edges {
        node {
          title
          preview
          date
          cover_image
          show_cover_image
          body {
            __typename
            ... on PostBodyText {
              type
              primary {
                text
              }
            }
            ... on PostBodyQuote {
              type
              primary {
                quote
              }
            }
            ... on PostBodyImage_with_caption {
              type
              primary {
                image
                caption
              }
            }
          }
          _meta {
            id
            uid
          }
        }
      }
      totalCount
    }
  }
`;

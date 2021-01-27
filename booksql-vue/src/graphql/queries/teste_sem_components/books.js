import gql from "graphql-tag";

export const BOOKS = gql`
    query {
        books {
            id
            title
            author
            image
        }
    }
`;

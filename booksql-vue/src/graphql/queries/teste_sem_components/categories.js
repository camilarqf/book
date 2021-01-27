import gql from "graphql-tag";

export const CATEGORIES = gql`
    query categories {
        categories {
            id
            name
        }
    }
`;

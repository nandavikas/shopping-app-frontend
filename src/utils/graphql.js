import {gql} from "@apollo/client";

import {VARIABLES_TO_FETCH} from "../constants";

const ITEMS_QUERY = gql`
    query GetItems($category: String, $pageNumber: Int) {
        getItems(category: $category, pageNumber: $pageNumber) {
            ${VARIABLES_TO_FETCH}
        }
    }
`;

const ORDER_MUTATION = gql`
mutation Mutation($orderInput: OrderInput) {
        createOrder(orderInput: $orderInput) {
            id
        }
    }
`;

export {
    ORDER_MUTATION,
    ITEMS_QUERY
};

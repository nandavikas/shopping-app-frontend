import {gql} from "@apollo/client";

const ITEMS_QUERY = gql`
    query GetItems($category: String, $pageNumber: Int) {
        getItems(category: $category, pageNumber: $pageNumber) {
            category
            description
            item
            stock
            price
            image
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

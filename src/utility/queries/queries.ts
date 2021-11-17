import { gql } from 'apollo-boost';

export const GET_CATEGORIES = {
  query: gql`
    {
      categories {
        name
      }
    }
  `,
};

export const GET_CURRENCIES = {
  query: gql`
    {
      currencies
    }
  `,
};

export const getCategoryItems = (category: string) => ({
  query: gql`
  {
    category(input: { title: "${category}" }) {
      products {
        id
        name
        inStock
        gallery
        prices {
          currency
          amount
        }
        brand
      }
    }
  }
  `,
});

export const getCategoryItemById = (id: string) => ({
  query: gql`
  {
    product(id:"${id}") {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency
        amount
      }
      brand
    }
  }
  `,
});

export const getCategoryItemPhotosById = (id: string) => ({
  query: gql`
  {
    product(id:"${id}") {
      id
      gallery
    }
  }
  `,
});

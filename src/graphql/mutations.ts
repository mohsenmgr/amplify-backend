/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const makeTodo = /* GraphQL */ `
  mutation MakeTodo(
    $id: ID!
    $title: String!
    $description: String
    $photo: String
  ) {
    makeTodo(id: $id, title: $title, description: $description, photo: $photo) {
      id
      title
      description
      photo
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      title
      description
      photo
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      title
      description
      photo
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      title
      description
      photo
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;

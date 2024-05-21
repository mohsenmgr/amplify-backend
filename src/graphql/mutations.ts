/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const makeTodo = /* GraphQL */ `mutation MakeTodo(
  $id: ID!
  $userId: String!
  $title: String!
  $description: String
  $photo: String
  $createdAt: AWSDateTime
  $updatedAt: AWSDateTime
  $dueDate: AWSDateTime
  $done: Boolean
) {
  makeTodo(
    id: $id
    userId: $userId
    title: $title
    description: $description
    photo: $photo
    createdAt: $createdAt
    updatedAt: $updatedAt
    dueDate: $dueDate
    done: $done
  ) {
    id
    userId
    title
    description
    photo
    done
    dueDate
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.MakeTodoMutationVariables,
  APITypes.MakeTodoMutation
>;
export const modifyTodo = /* GraphQL */ `mutation ModifyTodo(
  $id: ID!
  $title: String
  $description: String
  $photo: String
  $dueDate: AWSDateTime
  $done: Boolean
) {
  modifyTodo(
    id: $id
    title: $title
    description: $description
    photo: $photo
    dueDate: $dueDate
    done: $done
  ) {
    id
    userId
    title
    description
    photo
    done
    dueDate
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.ModifyTodoMutationVariables,
  APITypes.ModifyTodoMutation
>;
export const removeTodo = /* GraphQL */ `mutation RemoveTodo($id: ID!) {
  removeTodo(id: $id)
}
` as GeneratedMutation<
  APITypes.RemoveTodoMutationVariables,
  APITypes.RemoveTodoMutation
>;
export const createTodo = /* GraphQL */ `mutation CreateTodo(
  $input: CreateTodoInput!
  $condition: ModelTodoConditionInput
) {
  createTodo(input: $input, condition: $condition) {
    id
    userId
    title
    description
    photo
    done
    dueDate
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTodoMutationVariables,
  APITypes.CreateTodoMutation
>;
export const updateTodo = /* GraphQL */ `mutation UpdateTodo(
  $input: UpdateTodoInput!
  $condition: ModelTodoConditionInput
) {
  updateTodo(input: $input, condition: $condition) {
    id
    userId
    title
    description
    photo
    done
    dueDate
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTodoMutationVariables,
  APITypes.UpdateTodoMutation
>;
export const deleteTodo = /* GraphQL */ `mutation DeleteTodo(
  $input: DeleteTodoInput!
  $condition: ModelTodoConditionInput
) {
  deleteTodo(input: $input, condition: $condition) {
    id
    userId
    title
    description
    photo
    done
    dueDate
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTodoMutationVariables,
  APITypes.DeleteTodoMutation
>;

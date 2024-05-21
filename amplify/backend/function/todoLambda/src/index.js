/* Amplify Params - DO NOT EDIT
	API_RECBACKEND_GRAPHQLAPIIDOUTPUT
	API_RECBACKEND_TODOTABLE_ARN
	API_RECBACKEND_TODOTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import { listAllTodos, addTodo, modifyTodo } from "./myimports/DBQueries.js";

const execMutation = async (fieldName, args) => {
  try {
    switch (fieldName) {
      case "makeTodo":
        return await addTodo(args);
      case "modifyTodo":
        return await modifyTodo(args);
      default:
        throw new Error("Mutation not found!");
    }
  } catch (error) {
    throw error;
  }
};

const execQuery = async (userId) => {
  try {
    const response = await listAllTodos(userId);
    return response;
  } catch (error) {
    throw error;
  }
};

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const { typeName, fieldName } = event;
  const args = event.arguments;

  const userId = args.userId !== undefined ? args.userId : "";
  console.log(`event type is ${typeName}`);

  switch (typeName) {
    case "Mutation":
      return await execMutation(fieldName, args);
    case "Query":
      return await execQuery(userId);
    default:
      return await execQuery(userId);
  }
};

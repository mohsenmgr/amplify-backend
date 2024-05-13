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

import { listAllTodos, addTodo } from "./myimports/DBQueries.js";

const execMutation = async (args) => {
  try {
    return await addTodo(args);
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
  const args = event.arguments;
  const { userId } = args;
  const eventType = event.typeName;

  switch (eventType) {
    case "Mutation":
      return await execMutation(args);
    case "Query":
      return await execQuery(userId);
    default:
      return await execQuery(userId);
  }
};

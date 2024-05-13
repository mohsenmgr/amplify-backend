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

import { listAllTodos } from "./myimports/DBQueries.js";

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const args = event.arguments;
  const { userId } = args;

  try {
    const response = await listAllTodos(userId);
    return response;
  } catch (error) {
    throw error;
  }
};

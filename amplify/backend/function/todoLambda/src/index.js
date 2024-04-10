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

const { listAllTodos } = require('./DBQueries');


exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {

        const response =  await listAllTodos();
        return response;

    } catch (error) {
        throw error;
    }
};

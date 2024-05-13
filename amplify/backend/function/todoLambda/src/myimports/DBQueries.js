import { DynamoDBClient } from "@aws-sdk/client-dynamodb"; // ES Modules import
import { TODOS_TABLE } from "../constants.js";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.REGION,
});

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: true,
  convertClassInstanceToMap: false,
};
const unmarshallOptions = {
  wrapNumbers: false,
};

const ddbDocClient = DynamoDBDocumentClient.from(client, {
  marshallOptions,
  unmarshallOptions,
});

const listAllTodos = async (userIdParam) => {
  const input = {
    TableName: TODOS_TABLE,
    IndexName: "byOwner",
    KeyConditionExpression: "#userId = :userId",
    ExpressionAttributeNames: {
      "#userId": "userId",
    },
    ExpressionAttributeValues: {
      ":userId": userIdParam,
    },
  };

  const command = new QueryCommand(input);
  const response = await ddbDocClient.send(command);
  console.log("Data from DynamoDB:", response);

  if (response.Items.length) {
    return response.Items;
  } else {
    return [];
  }
};

export { listAllTodos };

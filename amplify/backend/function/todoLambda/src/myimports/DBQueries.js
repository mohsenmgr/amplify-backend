import { DynamoDBClient } from "@aws-sdk/client-dynamodb"; // ES Modules import
import { TODOS_TABLE } from "../constants.js";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

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

const addTodo = async (args) => {
  const { id, userId, title, description, photo } = args;
  const currentDate = new Date().toISOString();

  const item = {
    id: id,
    userId: userId,
    title: title,
    description: description,
    photo: photo,
    createdAt: currentDate,
    updatedAt: currentDate,
  };

  const params = {
    TableName: TODOS_TABLE,
    Item: item,
  };

  const command = new PutCommand(params);
  const response = await ddbDocClient.send(command);

  return response ? item : null;
};

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

export { listAllTodos, addTodo };

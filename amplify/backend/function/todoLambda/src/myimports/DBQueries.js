import { DynamoDBClient } from "@aws-sdk/client-dynamodb"; // ES Modules import
import { TODOS_TABLE } from "../constants.js";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
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
  const { id, userId, title, description, photo, dueDate, done } = args;
  const currentDate = new Date().toISOString();

  const item = {
    id: id,
    userId: userId,
    title: title,
    description: description,
    photo: photo,
    dueDate: dueDate,
    done: done,
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
  }

  return [];
};

const modifyTodo = async (args) => {
  const { id, title, description, photo, dueDate, done } = args;
  const currentDate = new Date().toISOString();

  console.log(`MY ARGS ARE ${JSON.stringify(args)}`);

  /*TODO ADD THIS */
  // Filter out attributes with empty string values
  const newValues = {
    title: title,
    description: description,
    photo: photo,
    dueDate: dueDate,
    done: done,
    updatedAt: currentDate,
  };

  const validNewValues = {};
  for (const [key, value] of Object.entries(newValues)) {
    if (value) {
      validNewValues[key] = value;
    }
  }

  if (Object.keys(validNewValues).length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No valid attributes to update",
      }),
    };
  }

  /* FINISH */

  const params = {
    TableName: TODOS_TABLE,
    Key: { id: id },
    UpdateExpression: "SET",
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
    ReturnValues: "ALL_NEW",
  };

  // Build the UpdateExpression and ExpressionAttributeNames/Values
  Object.keys(validNewValues).forEach((key, index) => {
    const attributeName = `#attr${index}`;
    const attributeValue = `:val${index}`;
    params.UpdateExpression += ` ${attributeName} = ${attributeValue},`;
    params.ExpressionAttributeNames[attributeName] = key;
    params.ExpressionAttributeValues[attributeValue] = validNewValues[key];
  });

  // Remove the trailing comma from the UpdateExpression
  params.UpdateExpression = params.UpdateExpression.slice(0, -1);

  console.log(`MY params ARE ${JSON.stringify(params)}`);

  try {
    const result = await ddbDocClient.send(new UpdateCommand(params));
    console.log(`END RESULT IS ${JSON.stringify(result)}`);
    return result.Attributes;
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Record updated successfully",
        updatedAttributes: result.Attributes,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to update record",
        error: error.message,
      }),
    };
  }
};

const removeTodo = async (args) => {
  const { id } = args;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Failed to delete record",
        error: "ID not passed",
      }),
    };
  }

  const params = {
    TableName: TODOS_TABLE,
    Key: { id: id },
  };
  try {
    const result = await ddbDocClient.send(new DeleteCommand(params));
    console.log(`END RESULT IS ${JSON.stringify(result)}`);
    return "SUCCESS";
  } catch (error) {
    return JSON.stringify({
      message: "Failed to delete record, id not found",
      error: error,
    });
  }
};

export { listAllTodos, addTodo, modifyTodo, removeTodo };

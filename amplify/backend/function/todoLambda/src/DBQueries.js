const { DynamoDBClient } = require("@aws-sdk/client-dynamodb"); // ES Modules import
const { TODOS_TABLE } = require("./constants");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const ddbClient = new DynamoDBClient({
  region: process.env.REGION
})
const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: true,
  convertClassInstanceToMap: false,
};
const unmarshallOptions = {
  wrapNumbers: false,
};

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, {
  marshallOptions,
  unmarshallOptions,
});

const listAllTodos = async () => {

    const input = {
        TableName: TODOS_TABLE
    }
    
      let result = [];

        let items;

        do {
            items =  await ddbDocClient.send(new ScanCommand(input));
            items.Items.forEach((item) => result.push(item));
            input.ExclusiveStartKey = items.LastEvaluatedKey;
        } while (typeof items.LastEvaluatedKey != "undefined");

        return result;
}

module.exports = {
    listAllTodos
}
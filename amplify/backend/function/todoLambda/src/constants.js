const environment = process.env.ENV;
const apiGraphQLAPIIdOutput = process.env.API_RECBACKEND_GRAPHQLAPIIDOUTPUT;

exports.TODOS_TABLE = `Todo-${apiGraphQLAPIIdOutput}-${environment}`;
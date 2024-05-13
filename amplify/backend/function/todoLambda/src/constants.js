const environment = process.env.ENV;
const apiGraphQLAPIIdOutput = process.env.API_RECBACKEND_GRAPHQLAPIIDOUTPUT;

const TODOS_TABLE = `Todo-${apiGraphQLAPIIdOutput}-${environment}`;
const SECONDARY_INDEX = "userId";

export { TODOS_TABLE, SECONDARY_INDEX };

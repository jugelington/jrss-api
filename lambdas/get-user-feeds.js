import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

module.exports.main = async (event, context) => {
  const params = {
    TableName: 'jrss-db',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId,
    },
  };

  try {
    const result = await dynamoDbLib.call('query', params);
    return success(result.Items);
  } catch (error) {
    return failure({ status: false, error: error });
  }
};

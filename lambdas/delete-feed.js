import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

module.exports.main = async (event, context) => {
  const params = {
    TableName: 'jrss-db',
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      feedId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDbLib.call('delete', params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false, error: error });
  }
};

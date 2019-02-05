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
    const result = await dynamoDbLib.call('get', params);
    if (result.Item) {
      return success(result.Item);
    } else {
      return failure({ status: false, error: 'Item not found.' });
    }
  } catch (error) {
    return failure({ status: false, error: error });
  }
};

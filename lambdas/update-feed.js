import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

module.exports.main = async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'jrss-db',
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      feedId: event.pathParameters.id,
    },
    UpdateExpression:
      'SET objName = :objName, displayName = :displayName, tags = :tags, #feed_url = :url',
    ExpressionAttributeValues: {
      ':objName': data.objName || null,
      ':displayName': data.displayName || null,
      ':tags': data.tags || null,
      ':url': data.url || null,
    },
    ExpressionAttributeNames: {
      '#feed_url': 'url',
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDbLib.call('update', params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false, error: error });
  }
};

import uuid from 'uuid';
import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

module.exports.main = async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'jrss-db',
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      feedId: uuid.v1(),
      displayName: data.displayName,
      tags: data.tags,
      url: data.url,
      createdAt: Date.now(),
    },
  };
  try {
    await dynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (error) {
    return failure({ status: false, error: error });
  }
};

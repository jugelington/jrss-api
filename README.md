# JRSS API

This repo contains the Lambda functions for the serverless back end of [JRSS](https://github.com/jugelington/jrss) that allow interaction between JRSS and the DynamoDB database that stores user feeds; it uses Serverless to deploy the functions to AWS.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [An AWS account](https://aws.amazon.com/cli/)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
- [Serverless](https://serverless.com/framework/docs/getting-started/)
- A [DynamoDB](https://aws.amazon.com/dynamodb/) database
- [AWS Cognito](https://aws.amazon.com/cognito/) User and Identity pools

If you are unsure how to setup anything AWS-related, I highly recommend following the guide at [serverless-stack.com](https://serverless-stack.com/).

## Setup

Assuming you already have all of the prequisites set up, deploying this should be straightforward.

All you should need to do is ensure the provider region in serverless.yml matches the region your database is in, and that the TableName in each of the Lambda functions is the name of your table.

Once you have done that, run the deploy command in bash:

```
$ sls deploy
```

Once deployment is complete, make a note of the endpoints generated, which you will need for the front end.

## Endpoints

### POST - https://[...].execute-api.eu-west-1.amazonaws.com/prod/feeds

Takes an object of the format, and saves it to the database with the user as as one of its keys, and a generated feed ID as the other.

```json
{
  "displayName": string,
  "url": string,
  "tags": array
}
```

### GET - https://[...].execute-api.eu-west-1.amazonaws.com/prod/feeds/{id}

Retrieves a feed by ID

### GET - https://[...].execute-api.eu-west-1.amazonaws.com/prod/feeds

Retrieves all the feeds by the currently authenticated user.

### PUT - https://[...].execute-api.eu-west-1.amazonaws.com/prod/feeds/{id}

Takes the same object as POST, but modifies the feed with the ID specified.

### DELETE - https://[...].execute-api.eu-west-1.amazonaws.com/prod/feeds/{id}

Deletes the feed with the ID specified.

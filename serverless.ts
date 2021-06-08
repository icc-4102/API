import type { AWS } from '@serverless/typescript';

import functions from './src/functions'
import cloudFormationResources from './serverles.config'


const { roomTable,userTable } = cloudFormationResources

const serverlessConfiguration: AWS = {
  service: 'icc4220-scrum-poker',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      packager: 'yarn',
      includeModules: true,
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline',
    'serverless-dynamodb-local'
  ],
  resources: {
    Resources: {
      userTable,
      roomTable
    }
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'us-east-1',
    stage: 'dev',
    profile: 'abstract',
    httpApi: {
      cors: true,
      payload: '1.0'
    },
    logs: {
      httpApi: true
    },
    iamRoleStatements: [{
      Effect: 'Allow',
      Action: ['dynamodb:*'],
      Resource: ['arn:aws:dynamodb:us-east-1:591842942740:table/icc4220-user-table']
    }]
    ,
    // iamRoleStatements:
    // - Effect: 'Allow'
    //   Action:
    //     - 'dynamodb:*'
    //   Resource:
    //     // - ${self:custom.common.userTable.ARN}
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions,
};

module.exports = serverlessConfiguration;
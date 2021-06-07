import type { AWS } from '@serverless/typescript';

import functions from './src/functions'
import userTable from './UserTable'
import roomTable from './RoomTable'

const serverlessConfiguration: AWS = {
  service: 'icc4220-scrum-poker',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
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
    profile:'abstract',
    httpApi: {
      cors: true,
      payload: '1.0'
    },
    logs: {
      httpApi: true
    },
    // iamRoleStatements: {
    //   Effect: 'Allow',
    // }
    // ,
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions,
};

module.exports = serverlessConfiguration;
export default {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: 'icc4220-room-table',
      AttributeDefinitions: [
        { AttributeName: 'roomId', AttributeType: 'S' }
      ],
      KeySchema: [
        { AttributeName: 'roomId', KeyType: 'HASH' },
      ],
      BillingMode: 'PAY_PER_REQUEST'
    }
  }
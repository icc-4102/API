export const roomTable  = {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: 'icc4220-room-table',
      AttributeDefinitions: [
        { AttributeName: 'roomName', AttributeType: 'S' },
      ],
      KeySchema: [
        { AttributeName: 'roomName', KeyType: 'HASH' },
      ],
      BillingMode: 'PAY_PER_REQUEST'
    }
  }
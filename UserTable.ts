export default {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: 'icc4220-user-table',
    AttributeDefinitions: [
      { AttributeName: 'username', AttributeType: 'S' }
    ],
    KeySchema: [
      { AttributeName: 'username', KeyType: 'HASH' },
    ],
    BillingMode: 'PAY_PER_REQUEST'
  }
}
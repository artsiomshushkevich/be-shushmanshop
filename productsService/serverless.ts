import type { AWS } from '@serverless/typescript';
import { getProductList } from '@functions/getProductList';
import { getProductById } from '@functions/getProductById';
import { createProduct } from '@functions/createProduct';

// as task 2 is not reviewed, using eu-west-1 instead eu-central-1
const REGION = 'eu-west-1';

const PRODUCTS_TABLE = 'ProductsTable';
const STOCKS_TABLE = 'StocksTable';

const serverlessConfiguration: AWS = {
    service: 'productsService',
    frameworkVersion: '3',
    plugins: ['serverless-auto-swagger', 'serverless-esbuild'],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        region: REGION,
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
            STOCKS_TABLE,
            PRODUCTS_TABLE
        },
        iam: {
            role: {
                statements: [
                    {
                        Effect: 'Allow',
                        Action: [
                            'dynamodb:DescribeTable',
                            'dynamodb:Query',
                            'dynamodb:Scan',
                            'dynamodb:GetItem',
                            'dynamodb:PutItem',
                            'dynamodb:UpdateItem',
                            'dynamodb:DeleteItem'
                        ],
                        Resource: `arn:aws:dynamodb:${REGION}:*:table/*`
                    }
                ]
            }
        }
    },
    resources: {
        Resources: {
            ProductsTable: {
                Type: 'AWS::DynamoDB::Table',
                Properties: {
                    TableName: 'ProductsTable',
                    AttributeDefinitions: [
                        {
                            AttributeName: 'id',
                            AttributeType: 'S'
                        }
                    ],
                    KeySchema: [
                        {
                            AttributeName: 'id',
                            KeyType: 'HASH'
                        }
                    ],
                    ProvisionedThroughput: {
                        ReadCapacityUnits: 1,
                        WriteCapacityUnits: 1
                    }
                }
            },
            StocksTable: {
                Type: 'AWS::DynamoDB::Table',
                Properties: {
                    TableName: 'StocksTable',
                    AttributeDefinitions: [
                        {
                            AttributeName: 'productId',
                            AttributeType: 'S'
                        }
                    ],
                    KeySchema: [
                        {
                            AttributeName: 'productId',
                            KeyType: 'HASH'
                        }
                    ],
                    ProvisionedThroughput: {
                        ReadCapacityUnits: 1,
                        WriteCapacityUnits: 1
                    }
                }
            }
        }
    },
    functions: { getProductList, getProductById, createProduct },
    package: { individually: true },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node14',
            define: { 'require.resolve': undefined },
            platform: 'node',
            concurrency: 10
        }
    }
};

module.exports = serverlessConfiguration;

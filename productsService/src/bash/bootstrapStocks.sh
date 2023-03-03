#! usr/bin/bash

aws dynamodb put-item --table-name StocksTable --region eu-west-1 --item "{\"productId\":{\"S\":\"1\"},\"amount\":{\"N\":\"100\"}}"
aws dynamodb put-item --table-name StocksTable --region eu-west-1 --item "{\"productId\":{\"S\":\"2\"},\"amount\":{\"N\":\"0\"}}"
aws dynamodb put-item --table-name StocksTable --region eu-west-1 --item "{\"productId\":{\"S\":\"3\"},\"amount\":{\"N\":\"120\"}}"
aws dynamodb put-item --table-name StocksTable --region eu-west-1 --item "{\"productId\":{\"S\":\"4\"},\"amount\":{\"N\":\"140\"}}"
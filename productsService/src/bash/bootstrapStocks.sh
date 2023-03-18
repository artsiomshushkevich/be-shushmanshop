#! usr/bin/bash

aws dynamodb put-item --table-name StocksTable --region eu-central-1 --item "{\"productId\":{\"S\":\"d00e60f2-5132-4bfe-9a72-5fc1fe33bf62\"},\"count\":{\"N\":\"100\"}}"
aws dynamodb put-item --table-name StocksTable --region eu-central-1 --item "{\"productId\":{\"S\":\"4a07b17a-c9a2-47d1-9de9-348f2f52f3ee\"},\"count\":{\"N\":\"0\"}}"
aws dynamodb put-item --table-name StocksTable --region eu-central-1 --item "{\"productId\":{\"S\":\"85c91010-7080-436d-908e-17f53bb57cf1\"},\"count\":{\"N\":\"120\"}}"
aws dynamodb put-item --table-name StocksTable --region eu-central-1 --item "{\"productId\":{\"S\":\"d00e60f2-5132-4bfe-9a72-5fc1f223bf11\"},\"count\":{\"N\":\"140\"}}"
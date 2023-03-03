#! usr/bin/bash

aws dynamodb put-item --table-name ProductsTable --region eu-west-1 --item "{\"id\":{\"S\":\"1\"},\"title\":{\"S\":\"Tesla\"},\"description\":{\"S\":\"Model S\"},\"price\":{\"N\":\"45000\"}}"
aws dynamodb put-item --table-name ProductsTable --region eu-west-1 --item "{\"id\":{\"S\":\"2\"},\"title\":{\"S\":\"Audi\"},\"description\":{\"S\":\"E-Tron\"},\"price\":{\"N\":\"50000\"}}"
aws dynamodb put-item --table-name ProductsTable --region eu-west-1 --item "{\"id\":{\"S\":\"3\"},\"title\":{\"S\":\"Nissan\"},\"description\":{\"S\":\"Leaf\"},\"price\":{\"N\":\"12000\"}}"
aws dynamodb put-item --table-name ProductsTable --region eu-west-1 --item "{\"id\":{\"S\":\"4\"},\"title\":{\"S\":\"BYD\"},\"description\":{\"S\":\"Excellence\"},\"price\":{\"N\":\"40000\"}}"
#! usr/bin/bash

aws dynamodb put-item --table-name ProductsTable --region eu-west-1 --item "{\"id\":{\"S\":\"d00e60f2-5132-4bfe-9a72-5fc1fe33bf62\"},\"title\":{\"S\":\"Tesla\"},\"description\":{\"S\":\"Model S\"},\"price\":{\"N\":\"45000\"}}"
aws dynamodb put-item --table-name ProductsTable --region eu-west-1 --item "{\"id\":{\"S\":\"4a07b17a-c9a2-47d1-9de9-348f2f52f3ee\"},\"title\":{\"S\":\"Audi\"},\"description\":{\"S\":\"E-Tron\"},\"price\":{\"N\":\"50000\"}}"
aws dynamodb put-item --table-name ProductsTable --region eu-west-1 --item "{\"id\":{\"S\":\"85c91010-7080-436d-908e-17f53bb57cf1\"},\"title\":{\"S\":\"Nissan\"},\"description\":{\"S\":\"Leaf\"},\"price\":{\"N\":\"12000\"}}"
aws dynamodb put-item --table-name ProductsTable --region eu-west-1 --item "{\"id\":{\"S\":\"d00e60f2-5132-4bfe-9a72-5fc1f223bf11\"},\"title\":{\"S\":\"BYD\"},\"description\":{\"S\":\"Excellence\"},\"price\":{\"N\":\"40000\"}}"
#!/bin/bash

echo "Running Initialization Scripts"

echo "Configuing AWS configure"

aws configure set aws_access_key_id default_access_key
aws configure set aws_secret_access_key default_secret_key
aws configure set region eu-west-1

echo "Creating Table"

aws dynamodb \
--endpoint-url http://dynamodb-local:8000 create-table \
--table-name table \
--attribute-definitions AttributeName=pk,AttributeType=S AttributeName=sk,AttributeType=S AttributeName=createdBy,AttributeType=S \
--key-schema AttributeName=pk,KeyType=HASH AttributeName=sk,KeyType=RANGE \
--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
--global-secondary-indexes \
        "[
            {
                \"IndexName\": \"authIndex\",
                \"KeySchema\": [{\"AttributeName\":\"sk\",\"KeyType\":\"HASH\"},
                                {\"AttributeName\":\"pk\",\"KeyType\":\"RANGE\"}],
                \"ProvisionedThroughput\": {\"ReadCapacityUnits\": 1, \"WriteCapacityUnits\": 1 },
                \"Projection\":{
                    \"ProjectionType\":\"ALL\"
                }
            },
            {
                \"IndexName\": \"ticketIndex\",
                \"KeySchema\": [{\"AttributeName\":\"createdBy\",\"KeyType\":\"HASH\"},
                                {\"AttributeName\":\"pk\",\"KeyType\":\"RANGE\"}],
                \"ProvisionedThroughput\": {\"ReadCapacityUnits\": 1, \"WriteCapacityUnits\": 1 },
                \"Projection\":{
                    \"ProjectionType\":\"ALL\"
                }
            }
        ]"

echo "Finished Creating Table"
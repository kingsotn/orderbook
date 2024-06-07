#!/bin/bash

# Test the /api/hello endpoint
echo "Testing /api/hello endpoint"
curl -X GET http://localhost:3000/api/hello
echo -e "\n"

# Test creating a new auction item (POST)
echo "Testing /api/auctions endpoint - Create new auction item"
curl -X POST http://localhost:3000/api/auctions \
  -H "Content-Type: application/json" \
  -d '{
        "gpuCount": 8,
        "startTime": "2024-06-01T00:00:00Z",
        "endTime": "2024-06-10T00:00:00Z",
        "minBid": 100
      }'
echo -e "\n"

# Test getting all auction items (GET)
echo "Testing /api/auctions endpoint - Get all auction items"
curl -X GET http://localhost:3000/api/auctions
echo -e "\n"

# Test creating a new bid (POST)
echo "Testing /api/bidsAsks endpoint - Create new bid"
curl -X POST http://localhost:3000/api/bidsAsks \
  -H "Content-Type: application/json" \
  -d '{
        "auctionItemId": "auction-item-id",
        "userId": "user1",
        "amount": 150,
        "type": "bid"
      }'
echo -e "\n"

# Test creating a new ask (POST)
echo "Testing /api/bidsAsks endpoint - Create new ask"
curl -X POST http://localhost:3000/api/bidsAsks \
  -H "Content-Type: application/json" \
  -d '{
        "auctionItemId": "auction-item-id",
        "userId": "user2",
        "amount": 200,
        "type": "ask"
      }'
echo -e "\n"

# Test getting all bids and asks for an auction item (GET)
echo "Testing /api/bidsAsks endpoint - Get all bids and asks for an auction item"
curl -X GET "http://localhost:3000/api/bidsAsks?auctionItemId=auction-item-id"
echo -e "\n"


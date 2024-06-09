#!/bin/bash

# Base URL of the API
BASE_URL="http://localhost:3000/api/bidsAsks"

# Function to create a new bid
create_bid() {
  curl -X POST $BASE_URL \
    -H "Content-Type: application/json" \
    -d '{
      "userId": "user1",
      "type": "bid",
      "price": 100,
      "gpuCount": 4,
      "durationDesired": "2 days",
      "start": "2024-06-07T12:00:00Z",
      "end": "2024-06-09T12:00:00Z"
    }'
}

# Function to create a new ask
create_ask() {
  curl -X POST $BASE_URL \
    -H "Content-Type: application/json" \
    -d '{
      "userId": "user2",
      "type": "ask",
      "price": 120,
      "gpuCount": 2,
      "durationDesired": "1 day",
      "start": "2024-06-08T12:00:00Z",
      "end": "2024-06-09T12:00:00Z"
    }'
}

# Function to get the current state of the order book
get_order_book() {
  curl -X GET $BASE_URL
}

# Create a bid
echo "Creating a new bid..."
create_bid
echo -e "\n"

# Create an ask
echo "Creating a new ask..."
create_ask
echo -e "\n"

# Get the current state of the order book
echo "Getting the current state of the order book..."
get_order_book
echo -e "\n"


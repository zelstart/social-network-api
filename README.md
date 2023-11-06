# Social Media API
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table Of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [License](#license)

## Description
This is a simple Social Media API, built using MongoDB and Mongoose. It allows you to create users, where each user can have friends, thoughts, and reactions. 

## Installation
Follow these steps to set up the project on your local machine:

1. Clone the repository to your local machine.
2. Open the repository in your preferred Integrated Development Environment (IDE).
3. In the terminal, run the following commands:
    ```
    npm install
    npm run seed
    npm start
    ```
   This will install all the necessary dependencies, seed the database with sample data, and start the server.
4. Use a program like Insomnia or Postman to interact with the API endpoints for creating, editing, and deleting users, thoughts, and reactions.

## Usage
[Demo Video](https://watch.screencastify.com/v/UpfiXEihjj1ELPXGTyQe)  
If the demo video here is unavailable, you can also find one in /assets/demo-video.

### USERS
- `GET` route to get all users
- `POST` route to create a new user
- `GET` route to get one user by ID
- `PUT` route to update user email or name
- `DELETE` route to delete user
- `POST` route to add friends by ID
- `DELETE` route to delete friends by ID

__Routes__:
- GET all, POST `http://localhost:3001/api/users`
- GET single, PUT, DELETE `http://localhost:3001/api/users/:userId`
- POST friend, DELETE friend `http://localhost:3001/api/users/:userId/friends/:friendId`
  - Body for user POST and PUT routes:
    ```json
    {
        "username": "",
        "email": ""
    }
    ```

### THOUGHTS
- `GET` route to get all thoughts
- `POST` route to create a new thought
- `GET` route to get thought by ID
- `PUT` route to update a thought by ID
- `DELETE` route to delete a thought by ID
- `POST` route to create a reaction
- `DELETE` route to delete a reaction by ID

__Routes__:
- GET all, POST `http://localhost:3001/api/thoughts`
- GET single, PUT, DELETE `http://localhost:3001/api/thoughts/:thoughtId`
- POST reaction `http://localhost:3001/api/thoughts/:thoughtId/reactions`
- DELETE reaction `http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId`
  - Body for thought POST and PUT routes:
    ```json
    {
        "thoughtText": "",
        "username": "",
        "userId": ""
    }
    ```

      - Body for reaction POST route:
    ```json
    {
        "reactionBody": "",
        "username": ""
    }
    ```

## Dependencies
- node.js
- express.js
- npm
- date-fns
- mongoose

## License
MIT
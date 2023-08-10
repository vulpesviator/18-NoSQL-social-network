# NoSQL: Social Network API

## Description

This project uses MongoDB along with Mongoose ODM, Express.js, and DayJS to create an API for a social network web app where users can share their thoughts, add friends to their friend list, and react to the thoughts of others. Users are also able to update their account information, remove reactions, and even delete their accounts along with all associated thoughts.

## Table of Contents 

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Badges](#badges)
- [Questions](#questions)

## Installation

To run this application locally, clone or download the repo which contains the necessary models, routes, and other associated js files.

## Usage

You can view video walkthroughs for the testing of these routes at the following links: 
[User Routes](https://drive.google.com/file/d/1er5nv8TKVPsGcpJRTJezsmtefHFO2Mf8/view?usp=sharing)
[Thought Routes](https://drive.google.com/file/d/1hhjPnKM83g6c_WAWoISUfI23ADUllUoQ/view?usp=sharing) 

![NoSQL: Social Network API](/assets/18.gif)

1. After downloading, open a new command line and navigate to the folder.
2. You will need to install packages by running `npm i`.
3. You can then start the server by running `npm run dev`.
4. Once the server is running, you will need to use an API client like Insomnia to test the different routes.
     - `/api/user` is the route to get all users and create a new user.
     - `/api/user/:userId` is the route to get, update, or delete a single user by their database ID. Deleting a user will delete their associated thoughts.
     - `/api/thoughts` is the route to get all thoughts and create a new thought.
     - `/api/thoughts/:thoughtId` is the route to get, update, or delete a single thought.
     - `/api/thoughts/:thoughtId/reactions` is the route to post a reaction to a thought.
     - `/api/thoughts/:thoughtId/reactions/:reactionId` is the route to delete a specific reaction to a specific thought by their IDs.


## Contributing

- [Day.js](https://day.js.org/docs/en/installation/installation)
- [How to Build an API with Mongoose and Express.js](https://dev.to/franciscomendes10866/setup-mongodb-with-mongoose-and-express-4c58)
- [Building a REST API with Express, Node, and MongoDB](https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial)
- Module 18 Mini-Project


## License
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  The MIT License

## Questions

Created by [vulpesviator](http://github.com/vulpesviator)

[Contact Me](vulpesviator@gmail.com)

Copyright (c) [2023] [Travis Hoffman]
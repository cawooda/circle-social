# Circle Social

## Description

A social network api

![license](https://img.shields.io/badge/license-MIT-blue)

## Table of Contents (Optional)

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Guidelines](#guidelines)
- [Testing](#testing)
- [License](#license)

## Installation Instructions

npm run start

## Usage

In the directory of the repo, initialise by using `npm i`

Use `NPM run start` to start the server

Server will be serving from [http://localhost:3001/api](http://localhost:3001/api)

The routes for the API can be accessed as follows:

## API

The api is designed to return information about itself. You will see this in the object returned for most requests. It will look like this:
`{
	"message": "Message related to request. May be error message",
	"actions": [
		{
			"action": "getUsers",
			"method": "GET",
			"uri": "api/users/",
			"auth": [
				"logged_in",
				"admin"
			]
		},
        {further objects in the same format explaining the routes for the api}
	]
}`

### api/users

#### Get All Users

GET: http://localhost:3001/api/users
server returns a list of all users.

#### Get Single User by Id

GET: http://localhost:3001/api/users/:id
returns a single user if they are found.

#### Update User by ID

PUT: http://localhost:3001/api/users/:id
returns a single user if they are found.

#### Delete User by ID

DELETE: http://localhost:3001/api/users/:id
returns a single user if they are found.

#### Create User

POST: http://localhost:3001/api/users/
BODY: {first,last,username,email,password}
Creates a new user from the information provided

#### Login User

POST: http://localhost:3001/api/users/login
BODY: {email,password}
logs in a user from the information provided

#### Logout User

POST: http://localhost:3001/api/users/logout
logs a user out

#### Authenticate User

This route provides the ability to check a user's status at points in their use of the API, for example if they try to access or change sensitive data. To use this, two requests are needed.

1. One sets the token and sends a sms to the user with a code.
2. allows the user to submit the code verifying they are the owner of the phone, registered to them.
   there are some known security risks with such an appproach, however most of them relate to large scale complex attachs on mobile infrastructure typically used to target high value targets.

##### Request Token

POST: http://localhost:3001/api/users/auth/:id
requests a sms be sent to the user with auth code. text will contain a clickable link and code.

##### Validate Token

POST: http://localhost:3001/api/users/auth/:id
Body: {
"token": "35545",
"userId": "6683700f7c8227495f0f5610"
}
checks to see if the token is right and therefore obtained from accessing the users phone.

### api/thoughts

#### Get All Thoughts

GET: http://localhost:3001/api/thoughts
server returns a list of all users.

#### Get Single Thought by ID

GET: http://localhost:3001/api/thoughts/:id
server returns a single thought matching the id.

#### Create Thought

POST: http://localhost:3001/api/thoughts/:id
BODY: {content:"content of thought"}
server returns a single thought matching the id.

#### Delete Thought

DELETE: http://localhost:3001/api/thoughts/:id

Deletes the thought matching that id. Pre hooks ensure the thought is removed from the user who has them in their thoughts array.

### api/thoughts/:thoughtId/reactions

#### Create Reaction

POST: http://localhost:3001/api/thoughts/:thoughtId/reactions
Body:{username}
create a reaction based on the thoughtId and set the username

#### Delete Reaction

DELETE: http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
delete a reaction based on the thoughtId and set the username

### Screenshot

![alt text](./assets/images/screenshot.png)

## Features

## Guidelines

## Testing

## Questions

For questions, please contact <mailto:cawooda@gmail.com> or

view github:
(
[![General badge](https://img.shields.io/badge/Github-profile-green.svg)](https://github.com/github.com/cawooda)
)
<github.com/cawooda>

## License

<https://choosealicense.com/licenses/MIT/>

MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.;

---

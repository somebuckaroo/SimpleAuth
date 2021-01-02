# Simple Auth Example

A simple example of authentication in [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) using [Passport](http://www.passportjs.org/) local strategy with a JSON flat file for users. The login page is cobbled together using examples from [Bootstrap v4](https://getbootstrap.com/).

## Getting Started

These instructions are for running on your local machine for development and testing purposes.

### Prerequisites

You will need a recent version of Node.js. This project was built with v14.15.1.

### Installing

First, install the dependency packages, which are listed in [package.json](package.json) by executing this command from within the project directory.

```
npm install
```

Now, generate a local test user with password 'default'. This will create the users.json file.

```
npm run adduser test default
```

To remove a user, run the following command.
```
npm run deluser [username]
```

## Running
Start the server and then navigate to http://localhost:3000.
```
npm run start
```

## Built With

* [Node.js](https://nodejs.org/en/) - back-end, JavaScript runtime
* [Express](https://expressjs.com/) - web application framework
* [Pug](https://pugjs.org/api/) - templating engine
* [Passport](http://www.passportjs.org/) - authentication middleware
* [Bootstrap](https://getbootstrap.com/) - CSS framework

I tried to limit the dependencies to only mainstream modules. [connect-flash](https://github.com/jaredhanson/connect-flash) is perhaps the only exception.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgments

There are many good articles on this subject, but I found [Building a Login System in Node.js](https://medium.com/better-programming/build-a-login-system-in-node-js-f1ba2abd19a) by Hussain Arif to be the most helpful.


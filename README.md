
# Flavorful cuisine

Welcome

> MERN is a fullstack implementation in MongoDB, Expressjs, React/Redux, Nodejs.

MERN stack is the idea of using Javascript/Node for fullstack web development.
So we have written this document to help guide you on our best practices.

## Technologies

- MongoDB

- Express.js

- React js

- Node.js


## Clone or download
```terminal
$ git clone https://github.com/krishabb0605/Food_delivery.git
```

# Usage (Run Fullstack app on your machine)

## Prerequisites
- [MongoDB](https://www.mongodb.com/try/download/compass)
- [Node](https://nodejs.org/en/download/) ^20.12.0
- [npm](https://nodejs.org/en/download/package-manager/)

## Notice

You need client and server runs concurrently in different terminal session, in order to make them talk to each other

# Client-side usage (PORT : 5173)
```terminal
$ cd frontend          // Go to frontend folder
$ yarn # or npm install    // Install packages
$ npm run dev        // Run it locally
$ npm run build       // this will build the frontend code to es5 js codes and generate a dist file
```

# Server-side usage (PORT : 4001)

## Stripe Payment Setup

**To set up Stripe payment gateway, follow these steps:**
1. Create a Stripe account and obtain your Stripe secret key.
2. Add the Stripe secret key to your .env file: STRIPE_SECRET_KEY = "YOUR_STRIPE_SECRET_KEY"
3. Install the Stripe library by running npm install stripe or yarn add stripe in your project root directory.

## Nodemailer Setup (For Sending Mail)

**To set up Nodemailer for sending emails, follow these steps:**
1. Install Nodemailer by running npm install nodemailer or yarn add nodemailer in your project root directory.
2. Add email configuration variables to your .env file:  EMAIL_USERNAME, and EMAIL_PASSWORD.
3. Create transporter Object using that email.
4. Configure mailoptions object.
5. Deliver message with sendmail().

## ENV Variables

Make Sure to Create a .env file in root directory and add appropriate variables in order to use the app.

**Essential Variables**

- STRIPE_SECRET_KEY = " "         // Stripe API authentication secret key here.
- JWT_SECRET = " "         // Secure secret key for JSON Web Tokens.
- MONGO_URL = " "         // MongoDB connection URL for database access.
- ENV = "Development"         // If backend is running locally set ENV as Development otherwise set as Production 
- PORT= "4001"         // Backend API listening port number , Default run on port 4001 

_fill each filed with your info respectively_

### Start

```terminal
$ cd backend       // Go to backend folder
$ yarn # or npm install       // Install packages
$ npm run server       // run it locally
$ npm run build       // this will build the frontend code to es5 js codes and generate a dist file
```

# Dependencies
Frontend side | Backend side
--- | ---
axios: ^1.7.2 | bcrypt: ^5.1.1
file-saver: ^2.0.5| multer: ^1.4.5-lts.1
lodash: ^4.17.21 | cors: ^2.8.5
react: ^18.2.0 | dotenv: ^16.4.5
react-dom: ^18.2.0 | express: ^4.19.2
react-icons: ^5.2.1 | nodemailer: ^6.9.14
react-router-dom: ^6.23.1 | mongoose: ^8.4.1
react-toastify: ^10.0.5 | nodemon: ^3.1.2
framer-motion: ^11.2.12 | stripe : ^15.8.0
moment: ^2.30.1 | validator : ^13.12.0
@chakra-ui/react: ^2.8.2
@choc-ui/chakra-autocomplete: ^5.5.1
@emotion/react: ^11.11.4
@emotion/styled: ^11.11.5
@react-oauth/google: ^0.12.1
@react-pdf/renderer: ^3.4.4
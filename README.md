# Express Server with MongoDB and HTTPS Support

This project demonstrates setting up a secure Express server with MongoDB integration. The example functionality here is a simple URL shortener service.


## Disclaimer

This project assumes that the reader has a basic understanding of the following concepts:

- **JavaScript Promises:** Familiarity with asynchronous programming using Promises in JavaScript.
- **Async/Await:** Understanding how to work with asynchronous code using the `async` and `await` keywords.
- **HTTP Requests:** Knowledge of how HTTP requests function, including concepts related to request methods (GET, POST, etc.) and status codes.

These concepts are fundamental to effectively utilizing and modifying this URL shortener application. If you are not familiar with these topics, it is recommended to review the relevant documentation or tutorials before proceeding.

## Prerequisites

- **Node.js** (v14 or later)
- **MongoDB** (Running locally or with a connection string)
- **OpenSSL** (Optional, for generating SSL certificates in local development)

## Project Setup

1. **Clone the Repository**

   Clone the project repository to your local machine:

   ```bash
   git clone https://github.com/rizkyngrh23/building-server-for-newbie.git
   cd shorten-url

2. **Install Dependencies**

   Install the required packages using npm:

   ```bash
   npm install

3. **Set Up MongoDB**

   Make sure MongoDB is running on your local machine (default URL: ```mongodb://localhost:27017```). The project uses a database named ```link-short```. If necessary, adjust the MongoDB connection string in ```server.js``` to match your setup.

4. **Generate SSL Certificates (Optional)**

   To use HTTPS locally, generate self-signed SSL certificates. Run the following command to create ```server.key``` (private key) and ```server.cert``` (certificate):

    ```bash
    openssl req -nodes -new -x509 -keyout server.key -out server.cert
    ```
      These files will enable HTTPS locally. If you're using this setup in production, replace these with valid certificates.

## File Structure

  - ```server.js```: Main server file that initializes Express and MongoDB connection.
  - ```models/url.js```: Defines the URL schema for MongoDB.
  - ```routes/urlRoutes.js```: Contains API routes for creating and retrieving shortened URLs.

## Usage

1. Start the Server

   Run the following command to start the server in development mode:

   ```bash
   npm run dev
    ```

    The server will start at ```http://localhost:3001``` (or ```https://localhost:3001``` if you configured HTTPS).

2. API Endpoint

   - POST/shorten
     Shortens a given URL.

     **Request Body**:

     ```html
     {
        "destination": "https://example.com"
     }
     ```

     **Response**
     ```html
     {
      "originalUrl": "https://example.com",
      "shortUrl": "https://localhost:3001/<shortenedUrl>"
     }
     ```
   - Get
     Redirects to the original URL based on the shortened URL path.

## Testing in Postman

To test the API in Postman:

- Use POST ```http://localhost:3001/shorten``` to create a shortened URL.
- Use GET ```http://localhost:3001/<shortenedUrl>``` to test the redirection.

## Dependencies

- express - Web server framework
- mongoose - MongoDB ORM for data modeling
- shortid - Generates short unique IDs
- nodemon - Development utility for automatic restarts
- cors - Middleware for enabling CORS (optional)

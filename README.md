# NodeJSMongoMSSQL
An example Node.JS API, fetching data from MSSQL and MongoDB.

Authentication and authorization with Bearer JWT.

Swagger URL: `/api-docs`

The project was created using [expressjs generator](https://expressjs.com/en/starter/generator.html).

* Clone the project.
* Install [yarn](https://yarnpkg.com/lang/en/docs/install/). (because yarn is beautiful)
* Install [Node.js](https://nodejs.org/en/download/).
* Run `yarn`.
* After the downloads are done, open `main-service.js` and edit the connection strings (`dbconfig` and `mongoUrl`).
* Run `yarn start`
* Now you can reach the service from `localhost:3000`. An example call would be `localhost:3000/api/products` which you can find inside `index.js`

You will have to create your databases or arrange the connection strings according to yourself, the connection data is created as an example.

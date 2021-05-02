import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
     console.log("Connected to the database");
     import("./index");
  })
  .catch(() => console.log("Unable to connect to the database"));
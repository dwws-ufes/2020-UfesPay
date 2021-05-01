import express from 'express';
import cors from 'cors';
import './database';
import routes from './routes';

import 'dotenv/config';

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Set JSON as the default response/request data type
app.use(express.json());

app.use(routes);

app.listen(process.env.PORT, () => console.log(`Server up on port ${process.env.PORT}.`));
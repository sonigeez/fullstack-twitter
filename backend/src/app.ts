import express from 'express';
import routesV1 from './routes/v1'
import morgan from 'morgan';



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/v1', routesV1);


export default app;

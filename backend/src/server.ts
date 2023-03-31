import { config } from 'dotenv';
import app from './app';



config();


app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`);
})   
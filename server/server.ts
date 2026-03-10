import express from 'express';
import cors from 'cors';
import dontenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import connectToDb from './Database/Database';
import router from './Routes/Routes';

dontenv.config();
const app = express();
const PORT = process.env.PORT || 8070;

const DIRNAME = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use('/api', router);

app.use(express.static(path.join(DIRNAME, '/client/dist')));
app.use('*', (_, res) => {
  res.sendFile(path.resolve(DIRNAME, 'client', 'dist', 'index.html'));
});

connectToDb().then(() => {
  app.listen(PORT, () => {
    console.log(`its alive on port ${PORT}`);
    console.log(`its alive on http://localhost:${PORT}`);
  });
});

import 'dotenv/config';
import express from 'express';
import { produtosRouter } from './routes/produtos.routes';

const app = express();
app.use(express.json());

app.use('/produto', produtosRouter);

const { PORT } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on change localhost:${PORT}`);
});

import { Router } from 'express';
import {
  deleteProduct,
  findProducts,
  findUniqueProduct,
  insertProduct,
  updateProduct,
} from '../controllers/produtos.controller';

const produtosRouter = Router();

produtosRouter.get('/list', findProducts);
produtosRouter.get('/unique/:id', findUniqueProduct);
produtosRouter.post('/new', insertProduct);
produtosRouter.patch('/update', updateProduct);
produtosRouter.delete('/delete/:id', deleteProduct);

export { produtosRouter };

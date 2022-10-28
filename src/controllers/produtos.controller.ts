import type { Request, Response } from 'express';
import { HTTP_STATUS } from '../dict/https.status';
import { prisma } from '../lib/prisma';

const findProducts = async (_req: Request, res: Response) => {
  const products = await prisma.produto.findMany();

  return res.status(HTTP_STATUS.sucesso).json(products);
};

const findUniqueProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(HTTP_STATUS.req_mal_formada).json({
      status: 'erro',
      mensagem: 'id obrigatorio',
    });
  }

  const product = await prisma.produto.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });

  if (!product) {
    return res.status(HTTP_STATUS.nao_encontrado).json({
      status: 'erro',
      mensagem: 'produto nao encontrado',
    });
  }

  return res.status(HTTP_STATUS.sucesso).json({
    status: 'sucesso',
    produto: product,
  });
};

const insertProduct = async (req: Request, res: Response) => {
  const { descricao } = req.body;

  const newProduct = await prisma.produto.create({
    data: {
      descricao,
    },
  });

  return res.status(HTTP_STATUS.criado).json({
    status: 'sucesso',
    produto: newProduct,
  });
};

const updateProduct = async (req: Request, res: Response) => {
  const { id, descricao } = req.body;

  if (!id || !descricao) {
    return res.status(HTTP_STATUS.req_mal_formada).json({
      status: 'erro',
      mensagem: 'id e descricao obrigatorio',
    });
  }

  const product = await prisma.produto.update({
    where: { id },
    data: {
      descricao,
    },
  });

  return res.status(HTTP_STATUS.alterado).json(product);
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.json({
      status: 'erro',
      mensagem: 'id obrigatorio',
    });
  }

  const product = await prisma.produto.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });

  if (!product) {
    return res.json({
      status: 'erro',
      mensagem: `produto com id ${id} não encontrado`,
    });
  }

  await prisma.produto.delete({
    where: {
      id: parseInt(id, 10),
    },
  });

  return res.status(HTTP_STATUS.deletado).json({
    status: 'sucesso',
    mensagem: `produto id ${id} excluido com sucesso`,
  });
};

export {
  findUniqueProduct,
  findProducts,
  insertProduct,
  deleteProduct,
  updateProduct,
};

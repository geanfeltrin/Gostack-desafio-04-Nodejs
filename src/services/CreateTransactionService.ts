import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import CreateCategoryService from './CreateCategoryService';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const { total } = await transactionRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('You do not have enough balance');
    }

    const categoryService = new CreateCategoryService();
    const categoryResult = await categoryService.execute({
      title: category,
    });

    const transaction = transactionRepository.create({
      type,
      title,
      value,
      category: categoryResult,
    });

    if (!transaction) {
      throw new AppError('Can not possible create transaction');
    }

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;

import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Category from '../models/Category';

interface Request {
  title: string;
}

export default class CreateCategoryService {
  public async execute({ title }: Request): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const category = categoryRepository.create({ title });
    if (!category) {
      throw new AppError('Not went possible to create a category', 401);
    }
    await categoryRepository.save(category);

    return category;
  }
}

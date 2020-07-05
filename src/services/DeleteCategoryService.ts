import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Category from '../models/Category';

interface Request {
  id: string;
}

class DeleteCategoryService {
  public async execute({ id }: Request): Promise<void> {
    const categoryRepository = getRepository(Category);

    const category = await categoryRepository.findOneOrFail(id);

    if (!category) {
      throw new AppError(
        'Can not possible remove category because it not exist',
        400,
      );
    }
    await categoryRepository.remove(category);
  }
}

export default DeleteCategoryService;

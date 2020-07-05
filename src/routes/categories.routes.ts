import { Router } from 'express';
import CreateCategoryService from '../services/CreateCategoryService';
import DeleteCategoryService from '../services/DeleteCategoryService';

const categoriesRouter = Router();

categoriesRouter.post('/', async (request, response) => {
  const { title } = request.body;
  const categoryService = new CreateCategoryService();

  const category = await categoryService.execute({ title });

  return response.json(category);
});

categoriesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteCategoryService = new DeleteCategoryService();

  await deleteCategoryService.execute({ id });

  return response.json();
});

export default categoriesRouter;

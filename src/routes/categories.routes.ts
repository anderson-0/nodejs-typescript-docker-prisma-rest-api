import { Router } from "express";

import { CreateCategoryController } from "@modules/categories/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "@modules/categories/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post("/", createCategoryController.handle);

export { categoriesRoutes };

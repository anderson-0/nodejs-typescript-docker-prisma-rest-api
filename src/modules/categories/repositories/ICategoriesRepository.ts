import { ICreateCategoryDTO } from "@modules/categories/dtos/ICreateCategoryDTO";
import { ICategory } from "./ICategory";

interface ICategoriesRepository {
  findByName(name: string): Promise<ICategory>;
  list(): Promise<ICategory[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<ICategory>;
}

export { ICategoriesRepository };

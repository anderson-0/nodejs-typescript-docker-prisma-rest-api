import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { ICategory } from "@modules/categories/repositories/ICategory";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(): Promise<ICategory[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}

export { ListCategoriesUseCase };

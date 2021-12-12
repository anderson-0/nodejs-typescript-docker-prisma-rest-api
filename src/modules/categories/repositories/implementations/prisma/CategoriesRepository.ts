import { Category } from "@prisma/client";
import { prisma } from "@shared/infra/orm/prisma";

import { ICreateCategoryDTO } from "@modules/categories/dtos/ICreateCategoryDTO";

import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { ICategory } from "@modules/categories/repositories/ICategory";

class CategoriesRepository implements ICategoriesRepository {
  async create({ name, description }: ICreateCategoryDTO): Promise<ICategory> {
    const category = prisma.category.create({
      data: {
        name,
        description,
      },
    });

    return category;
  }

  async list(): Promise<Category[]> {
    const categories = await prisma.category.findMany();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await prisma.category.findFirst({
      where: {
        name,
      },
    });
    return category;
  }
}

export { CategoriesRepository };

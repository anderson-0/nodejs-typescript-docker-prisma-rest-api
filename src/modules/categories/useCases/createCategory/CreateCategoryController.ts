import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    // Injects all dependencies into the Use case. Check shared/container/index.ts
    // If you want to change from the real repository to the inMemory one, that is the place.
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    await createCategoryUseCase.execute({ name, description });

    return res.status(201).send();
  }
}
export { CreateCategoryController };

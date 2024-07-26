import { Product } from "@/interfaces/products.interface";
import { Request, Response, NextFunction } from "express";

export class AdminController {
  public async CreateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200);
    } catch (error) {
      next(error);
    }
  }
}

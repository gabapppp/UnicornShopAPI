import { HttpException } from "@/exceptions/HttpException";
import { Product } from "@/interfaces/products.interface";
import { ProductModel } from "@/models/product.model";
import { Service } from "typedi";

@Service()
export class ProductService {
  public async fetchProductAll(): Promise<Product[]> {
    const products: Product[] = await ProductModel.find();
    return products;
  }

  public async findByPrroductId(productId: string): Promise<Product> {
    const productByID: Product = await ProductModel.findById(productId);
    if (!productByID) throw new HttpException(409, "Product doesn't exist");
    return productByID;
  }
  public descreaseProductStockByID = async (
    productId: string
  ): Promise<Product> => {
    const productByID: Product = await ProductModel.findById(productId);
    if (!productByID) throw new HttpException(409, "Product doesn't exist");
    if (productByID.stock === 0)
      throw new HttpException(409, "Product is out of stock");
    const newStock: number = productByID.stock - 1;
    const updatedProduct: Product = await ProductModel.findOneAndUpdate(
      productByID,
      { stock: newStock }
    );
    return updatedProduct;
  };
}

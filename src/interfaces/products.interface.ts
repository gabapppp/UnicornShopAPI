export interface Product {
  productID: number;
  name: string;
  color: string;
  image: number;
  category: string;
  department: string;
  size: string;
  description: string;
  price: number;
  stock: number;
  rateAvg: number;
}

export interface Review {
  _id?: string;
}

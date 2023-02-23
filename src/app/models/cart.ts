import { Product } from './product';

export interface Cart{
  id: number;
  quantity: number;
  total: number;
  products: Product;
}

export interface AddCart{
  userId: number;
  productId: number;
}

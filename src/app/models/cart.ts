import { Product } from './product';

export interface Cart{
  id: number;
  quantity: number;
  total: number;
  products: Product;
}

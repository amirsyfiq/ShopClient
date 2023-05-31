import { Cart } from "./cart";

export class Checkout{
  name = '';
  email = '';
  address1 = '';
  address2 = '';
  city = '';
  postalCode = '';
  state = '';
}

export interface AddCheckout{
  name: string;
  email: string;
  address: string;
}

export interface GetCheckout{
  id: number;
  name: string;
  email: string;
  address: string;
  payment: number;
  paid: boolean;
  carts: Cart;
}

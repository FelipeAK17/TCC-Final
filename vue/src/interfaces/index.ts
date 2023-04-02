export interface IUser {
  id: string;
  role: string;
  email: string;
  creditCard: string | null;
  cellphone: string | null;
  address: string | null;
}

export interface IShoppingCart {
  clientId: string;
  id: string;
  product: IProduct;
  productId: string;
  quantity: number;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}
export interface ISchedule {
  id: string;
  status: boolean;
  schedule: Date;
  hour: string;
  cellphone: string;
  address: string;
  client: string;
  services: string;
}

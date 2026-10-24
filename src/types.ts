export type User = { id:string; name:string; phone:string; email:string; address:string };
export type ProductVariant = { color:string; colorHex:string; capacities:number[] };
export type Product = {
  id:number;
  slug:string;
  name:string;
  tagline:string;
  price:number; 
  oldPrice:number;
  rating:string;
  category:string;
  image:string;
  variants:ProductVariant[];
  features:string[];
};
export type CartItem = {
  id:number;
  name:string;
  price:number;
  image:string;
  qty:number;
  color:string;
  capacity:number;
};
export type OrderItem = CartItem;
export type Order = {
  id:string;
  items:OrderItem[];
  total:number;
  name:string;
  phone:string;
  email:string;
  address:string;
  status:'new'|'cancelled';
  createdAt:string;
};

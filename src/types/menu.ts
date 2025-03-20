
export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  isAvailable?: boolean;
  preparationTime?: number;
  created?: string;
  updated?: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: {
    menuItemId: string;
    quantity: number;
    price: string;
    name: string;
  }[];
  totalAmount: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  pickupTime?: string;
  created: string;
  updated: string;
}

export interface CartItem {
  menuItemId: string;
  quantity: number;
  price: string;
  name: string;
  image: string;
}

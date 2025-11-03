export type OrderItemStatus =
  | 'Created'
  | 'Ordered'
  | 'invoiced'
  | 'Paid'
  | 'Picked'
  | 'Packed'
  | 'Received'
  | 'Completed';

export interface OrderItem {
  id: number;
  orderId: number;
  customerId: number;
  customerName: string;
  productId: number;
  productName: string;
  productDescription: string;
  productCategoryName: string;
  productImageFile: string;
  productUnitOfMeasure: string;
  quantity: number;
  price: number;
  status: OrderItemStatus;
  created?: string;
  lastUpdated?: string;
}



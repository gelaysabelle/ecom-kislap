export interface Product {
  id: number;
  name: string;
  description: string;
  categoryName: string;
  imageFile: string;
  unitOfMeasure: string;
  price: string | number;
}

export interface ProductCategory {
  categoryName: string;
  products: Product[];
}



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: false
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
  selectedImage = '';
  selectedQuantity = 1;

  constructor(private route: ActivatedRoute, private api: ApiService, private cart: CartService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')) || 0;
    if (!id) { return; }
    this.api.getProduct(id).subscribe({
      next: (p: any) => {
        // Map backend Product to UI model
        this.product = {
          id: p.id,
          name: p.name,
          price: parseFloat(p.price) || 0,
          originalPrice: null,
          image: p.imageFile || 'assets/products/placeholder.png',
          description: p.description,
          longDescription: p.description,
          category: p.categoryName,
          rating: 5,
          reviews: 0,
          badge: null,
          inStock: true,
          quantity: 1,
          images: [p.imageFile || 'assets/products/placeholder.png']
        };
        this.selectedImage = this.product.image;
      },
      error: () => {
        this.product = null;
      }
    });
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  updateQuantity(change: number) {
    this.selectedQuantity = Math.max(1, this.selectedQuantity + change);
  }

  addToCart() {
    if (!this.product) { return; }
    this.cart.addItem({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      quantity: this.selectedQuantity,
      image: this.product.image
    });
  }

  buyNow() {
    // Buy now logic here
    console.log('Buy now:', this.product.name, 'Quantity:', this.selectedQuantity);
  }
}

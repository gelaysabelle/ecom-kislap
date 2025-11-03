import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {
  featuredProducts: any[] = [];

  testimonials = [
    {
      name: 'Maria Santos',
      location: 'Manila',
      text: 'Kislap products are perfect for Filipino skin! The hybrid formula gives me that natural glow I\'ve always wanted.',
      rating: 5
    },
    {
      name: 'Ana Dela Cruz',
      location: 'Cebu',
      text: 'Finally found makeup that doesn\'t break me out. The skincare benefits are amazing!',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      location: 'Davao',
      text: 'Love how Kislap combines makeup and skincare. Perfect for busy Filipinas like me!',
      rating: 5
    }
  ];

  constructor(private api: ApiService, private cart: CartService) {}

  ngOnInit(): void {
    // Try backend first to mirror Product List; fallback to a small hardcoded set
    this.api.getProductCategories().subscribe({
      next: (categories: any[]) => {
        const flattened: any[] = [];
        categories.forEach((c: any) => {
          (c.products || []).forEach((p: any) => {
            flattened.push({
              id: p.id,
              name: p.name,
              price: parseFloat(p.price) || 0,
              image: p.imageFile || 'assets/products/placeholder.png',
              description: p.description,
              badge: null
            });
          });
        });
        // pick top 4
        this.featuredProducts = flattened.slice(0, 4);
      },
      error: () => {
        this.featuredProducts = [
          { id: 1, name: 'Kislap Glow Serum', price: 899, image: 'assets/products/glow-serum.png', description: 'Hybrid makeup-skincare serum for that perfect Filipino glow', badge: 'Best Seller' },
          { id: 2, name: 'Kislap Foundation', price: 1299, image: 'assets/products/foundation.png', description: 'Full coverage foundation with skincare benefits', badge: 'New' },
          { id: 3, name: 'Kislap Lip Tint', price: 599, image: 'assets/products/lip-tint.png', description: 'Long-lasting lip tint with moisturizing properties', badge: 'Popular' },
          { id: 4, name: 'Kislap Eye Cream', price: 799, image: 'assets/products/eye-cream.png', description: 'Anti-aging eye cream with subtle shimmer', badge: 'Limited' }
        ];
      }
    });
  }

  addToCart(product: any) {
    this.cart.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  cartCount = 0;
  menus: any[] = [];

  constructor(private cart: CartService, private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.cart.getCount$().subscribe(count => {
      this.cartCount = count;
    });
    this.api.getMenus().subscribe({ next: (m) => this.menus = m as any[], error: () => this.menus = [] });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}

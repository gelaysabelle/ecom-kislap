# Kislap Ecommerce - Hybrid Makeup & Skincare

A beautiful ecommerce website for Kislap, a Filipino brand specializing in hybrid makeup and skincare products.

## Features

- **Responsive Design**: Mobile-first approach with beautiful pink color palette
- **Modern UI**: Clean, elegant interface designed for Filipino beauty enthusiasts
- **Complete Ecommerce Flow**: Home, About, Products, Product Detail, Checkout, and Support pages
- **Product Management**: Product listing with filtering, search, and sorting
- **Shopping Cart**: Full checkout process with order summary
- **Customer Support**: Contact form, FAQ, and support information

## Pages

- **Home**: Hero section, featured products, testimonials, and call-to-action
- **About Us**: Company story, mission, values, and team information
- **Products**: Product listing with search, filtering, and sorting capabilities
- **Product Detail**: Detailed product information with image gallery and specifications
- **Checkout**: Complete order form with shipping and payment options
- **Support**: Contact form, FAQ, and customer service information

## Technology Stack

- **Angular 20**: Modern Angular framework
- **TypeScript**: Type-safe development
- **CSS3**: Custom styling with CSS variables and modern features
- **Responsive Design**: Mobile-first approach

## Getting Started

1. Navigate to the project directory:
   ```bash
   cd kislap-ecommerce
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/app/
├── header/                 # Header component with navigation
├── footer/                 # Footer component with links and info
├── pages/
│   ├── home/              # Home page with hero and featured products
│   ├── about/             # About us page with company story
│   ├── product-list/      # Product listing with filters
│   ├── product-detail/    # Individual product details
│   ├── checkout/          # Order checkout process
│   └── support/           # Customer support and FAQ
├── app.ts                 # Main app component
├── app.html               # App template
├── app.css                # App styles
├── app-routing-module.ts  # Routing configuration
└── app-module.ts          # App module configuration
```

## Design Features

- **Pink Color Palette**: Carefully chosen pink shades that represent Filipino beauty
- **Typography**: Clean, readable fonts with proper hierarchy
- **Animations**: Subtle hover effects and transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Mobile Responsive**: Optimized for all device sizes

## Customization

The design uses CSS custom properties (variables) for easy theming:

```css
:root {
  --primary-pink: #E91E63;
  --secondary-pink: #F8BBD9;
  --light-pink: #FCE4EC;
  /* ... more color variables */
}
```

## Future Enhancements

- User authentication and accounts
- Shopping cart persistence
- Payment gateway integration
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard for product management

## Support

For questions or support, please contact the development team or refer to the support page in the application.

---

Built with ❤️ for Filipino beauty enthusiasts
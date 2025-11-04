# Kislap E‑Commerce (Angular + Spring Boot + MySQL)

A simple e‑commerce demo showcasing a full stack: Angular frontend, Spring Boot REST backend, and MySQL. Features products, dynamic header menu, cart, checkout, and order persistence.

## Contents
- Architecture & Data Flow
- Prerequisites
- Database Schema & Seeding
- Run Backend
- Run Frontend
- Endpoints
- Frontend Features
- Images/Assets
- Troubleshooting
- Code Map
- Demo Script (5 minutes)

---

## Architecture & Data Flow
- Angular calls Spring REST endpoints (JSON over HTTP)
- Spring maps JPA entities ↔ models; persists to MySQL
- Product images are served by Angular from `src/assets` via DB `imageFile` paths (e.g., `assets/products/glow-serum.png`)

Data flow examples:
- Products page → GET `/api/products` → returns categories with product arrays
- Product detail → GET `/api/products/{id}` → returns full product
- Add to cart (frontend) → localStorage + best‑effort sync to backend (status `Created`)
- Checkout → PUT `/api/orderitems` with status `Ordered` → saved in `order_item_data`

---

## Prerequisites
- Node 18+ and npm
- Java 17+ and Maven 3.8+
- MySQL 8+

---

## Setup (Local, no Docker)
1) Create database
```sql
CREATE DATABASE IF NOT EXISTS ecomdbkislap;
```
2) Configure backend DB connection
- File: `ecommerce/src/main/resources/application.yml`
  - `spring.datasource.url=jdbc:mysql://localhost:3306/ecomdbkislap?allowPublicKeyRetrieval=true&createDatabaseIfNotExist=true&useSSL=false`
  - Set `username`/`password` to your local MySQL credentials

3) Seed data (minimal)
- Products (see schema below). Ensure `imageFile` uses Angular asset paths like `assets/products/glow-serum.png`

---

## Database Schema & Seeding
Tables used:
- `product_data(id, name, description, categoryName, unitOfMeasure, price, imageFile, created, lastUpdated)`
- `menu_data(id, name, description, routerPath, categoryName, icon)`
- `order_item_data(id, orderId, customerId, customerName, productId, productName, productDescription, productCategoryName, productImageFile, productUnitOfMeasure, quantity, price, status, created, lastUpdated)`

Example product seed:
```sql
USE ecomdbkislap;
INSERT INTO product_data (id, name, description, categoryName, unitOfMeasure, price, imageFile) VALUES
(1,'Kislap Glow Serum','Hybrid makeup-skincare serum for a natural Filipino glow','Skincare','piece','899.00','assets/products/glow-serum.png')
ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description), categoryName=VALUES(categoryName), unitOfMeasure=VALUES(unitOfMeasure), price=VALUES(price), imageFile=VALUES(imageFile);
```

Menu seed (matches Angular routes):
```sql
INSERT INTO menu_data (id, name, description, routerPath, categoryName, icon) VALUES
(1,'Home','Welcome to Kislap','', 'main','home.svg'),
(2,'Products','Browse all products','products','main','product.svg'),
(3,'About','Learn about us','about','main','about.svg'),
(4,'Support','Get support','support','main','support.svg'),
(5,'Checkout','Checkout your cart','checkout','main','checkout.svg')
ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description), routerPath=VALUES(routerPath), categoryName=VALUES(categoryName), icon=VALUES(icon);
```

---

## Run Backend
```bash
cd ecommerce
mvn -q -DskipTests spring-boot:run
# Server: http://localhost:8080
```

---

## Run Frontend
```bash
cd exercise/kislap-ecommerce
npm install
npm start
# App: http://localhost:4200
```

---

## Endpoints
- Products
  - GET `/api/products` → `[ { categoryName, products: Product[] }, ... ]`
  - GET `/api/products/{id}` → `Product`
- Menus
  - GET `/api/menu` → `Menu[]`
- Order Items
  - GET `/api/orderitem/{customerId}?status=0|1` → `OrderItem[]` (0 = cart, 1 = ordered)
  - PUT `/api/orderitems` → `OrderItem[]` (bulk create)

`OrderItem.status` is an enum: `Created`, `Ordered`, `invoiced`, `Paid`, `Picked`, `Packed`, `Received`, `Completed`.

---

## Frontend Features
- Product List: loads from backend with fallback to hardcoded data if backend is down
- Product Detail: fetches `/api/products/{id}`, uses the same image/price as the list
- Home: shows featured products (first 4 from backend flatten); Add to Cart works
- Header: dynamic menu from `/api/menu`, reactive cart count
- Cart/Checkout:
  - Cart saved in localStorage and synced to backend as `Created`
  - Checkout posts to backend with `Ordered` status
  - Totals: Subtotal + 12% VAT + Shipping

---

## Images/Assets
- Put images in `exercise/kislap-ecommerce/src/assets/products/`
- In DB `product_data.imageFile`, store relative paths like `assets/products/glow-serum.png`
- Angular copies `src/assets` to `/assets` (configured in `angular.json`)

---

## Troubleshooting
- Images not showing
  - Ensure `angular.json` includes assets mapping for `src/assets`
  - DB `imageFile` matches actual filenames under `src/assets/products/`
- Orders not in DB
  - Check you’re looking at the same schema as Spring (`ecomdbkislap`)
  - Verify payload status is a string: `Created`/`Ordered` (not numbers)
  - Check logs for `OrderItemController : created product >> ...` and query:
    ```sql
    USE ecomdbkislap;
    SELECT id, productId, productName, productCategoryName, price, status
    FROM order_item_data ORDER BY id DESC LIMIT 10;
    ```
- Quick View price/image incorrect
  - Ensure `/api/products/{id}` returns full product fields (backend mapping fixed)

---

## Code Map
- Backend: `ecommerce/src/main/java/com/stamaria`
  - Controllers: `controller/*.java`
  - Entities: `entity/*.java`
  - Services: `service/*.java`, `serviceimpl/*.java`
  - Repos: `repository/*.java`
- Frontend: `exercise/kislap-ecommerce/src/app`
  - Pages: `pages/*`
  - Services: `services/*`
  - Models: `model/*`
  - Layout: `header/*`, `footer/*`

---




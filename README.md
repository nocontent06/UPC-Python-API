# UPC Database API

A simple and lightweight RESTful API for storing, retrieving, adding, and deleting UPC (Universal Product Code) product information. The API can be run with Node.js and Express, making it a great choice for small-scale applications, prototypes, or as a starting point for a more comprehensive product lookup service.

## Features

- **GET /api/upc/:upc**  
  Look up a product by its UPC code. Returns product details if found.

- **GET /api/upc**  
  List all products currently stored in the in-memory database.

- **POST /api/upc**  
  Add a new product. Requires a JSON body containing a `upc` string and a `product` object.

- **DELETE /api/upc/:upc**  
  Remove a product from the database by its UPC code.

## Example Product Object

```json
{
  "upc": "012345678905",
  "product": {
    "name": "Milk",
    "brand": "DairyBest",
    "size": "1L"
  }
}
```

## Running the API

1. **Install dependencies:**
   ```
   npm install
   ```

2. **Start the server:**
   ```
   node upc_api.js
   ```
   By default, the API runs on `http://localhost:8000`.

3. **Production deployment:**  
   Use a process manager like `pm2` and a reverse proxy (such as Nginx) to expose the API on ports 80/443 and a custom subdomain.

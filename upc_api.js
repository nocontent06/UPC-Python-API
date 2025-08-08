const express = require('express');
const app = express();
app.use(express.json());

const upcDb = {
  "012345678905": { name: "Milk", brand: "DairyBest", size: "1L" },
  "098765432109": { name: "Bread", brand: "Baker's", size: "500g" },
  "123456789012": { name: "Chocolate Bar", brand: "ChocoYum", size: "100g" }
};

app.get('/api/upc/:upc', (req, res) => {
  const product = upcDb[req.params.upc];
  if (product) {
    res.json({ upc: req.params.upc, product });
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.post('/api/upc', (req, res) => {
  const { upc, product } = req.body;
  if (!upc || !product) {
    return res.status(400).json({ error: "Both 'upc' and 'product' required" });
  }
  if (upcDb[upc]) {
    return res.status(409).json({ error: "UPC already exists" });
  }
  upcDb[upc] = product;
  res.status(201).json({ message: "Product added", upc });
});

app.delete('/api/upc/:upc', (req, res) => {
  if (upcDb[req.params.upc]) {
    delete upcDb[req.params.upc];
    res.json({ message: "Product deleted" });
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.get('/api/upc', (req, res) => {
  res.json(Object.entries(upcDb).map(([upc, product]) => ({ upc, product })));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`UPC API running on port ${PORT}`));
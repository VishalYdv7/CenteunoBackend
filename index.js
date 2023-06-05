const express = require('express');
const app = express();
const itemList = require('./item_list.json');

//1 API for products per page

app.get('/api/products/list', (req, res) => {
  const size = parseInt(req.query.size);
  const page = parseInt(req.query.page);

  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;

  const pageItems = itemList.slice(startIndex, endIndex).map(item => {
    return {
      id: item.id,
      item_name: item.item_name,
      item_image: item.item_image,
      item_price: item.item_price
    };
  });
  res.send(pageItems);
});


//2 To get a product by id

app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    const product = itemList.find(item => item.id === productId);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.send(product);
});
  

app.listen(3000, () => {
  console.log('Server up and running on port 3000');
});

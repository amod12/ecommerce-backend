const express = require('express');
const admin = require('../middleware/admin');
const adminRouter = express.Router();

const Product = require('../models/product');

// add product
// adminRouter.post('/admin/add-product', admin, async (req, res) => {
//     // authorization is done using admin midleware
//     try{
//         const {name, description, images, quantity, price, category} = req.body;
//         let product = new Product({ // let will mkae us change var name or value later on
//             name,
//             description,
//             images,
//             quantity,
//             price,
//             category,
//         });
//         // saving in database
//         product = await product.save();
//         res.json(product);
//     }
//     catch(e){
//         res.status(500).json({error: e.message});
//     }
// })
// module.exports = adminRouter;


// Add product
adminRouter.post("/admin/add-product", admin, async (req, res) => {
  // written admin middleware beacuse only admin should be able to access it
  try {
    const { name, description, images, quantity, price, category } = req.body;
    let product = new Product({
      name,
      description,
      images,
      quantity,
      price,
      category,
    });
    product = await product.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// Get all your products
adminRouter.get("/admin/get-products", admin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
    // sending json(product data) back to client side
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// // Delete the product
// adminRouter.post("/admin/delete-product", admin, async (req, res) => {
//   try {
//     const { id } = req.body;
//     let product = await Product.findByIdAndDelete(id);
//     res.json(product);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// adminRouter.get("/admin/get-orders", admin, async (req, res) => {
//   try {
//     const orders = await Order.find({});
//     res.json(orders);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// adminRouter.post("/admin/change-order-status", admin, async (req, res) => {
//   try {
//     const { id, status } = req.body;
//     let order = await Order.findById(id);
//     order.status = status;
//     order = await order.save();
//     res.json(order);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// adminRouter.get("/admin/analytics", admin, async (req, res) => {
//   try {
//     const orders = await Order.find({});
//     let totalEarnings = 0;

//     for (let i = 0; i < orders.length; i++) {
//       for (let j = 0; j < orders[i].products.length; j++) {
//         totalEarnings +=
//           orders[i].products[j].quantity * orders[i].products[j].product.price;
//       }
//     }
//     // CATEGORY WISE ORDER FETCHING
//     let mobileEarnings = await fetchCategoryWiseProduct("Mobiles");
//     let essentialEarnings = await fetchCategoryWiseProduct("Essentials");
//     let applianceEarnings = await fetchCategoryWiseProduct("Appliances");
//     let booksEarnings = await fetchCategoryWiseProduct("Books");
//     let fashionEarnings = await fetchCategoryWiseProduct("Fashion");

//     let earnings = {
//       totalEarnings,
//       mobileEarnings,
//       essentialEarnings,
//       applianceEarnings,
//       booksEarnings,
//       fashionEarnings,
//     };

//     res.json(earnings);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// async function fetchCategoryWiseProduct(category) {
//   let earnings = 0;
//   let categoryOrders = await Order.find({
//     "products.product.category": category,
//   });

//   for (let i = 0; i < categoryOrders.length; i++) {
//     for (let j = 0; j < categoryOrders[i].products.length; j++) {
//       earnings +=
//         categoryOrders[i].products[j].quantity *
//         categoryOrders[i].products[j].product.price;
//     }
//   }
//   return earnings;
// }

module.exports = adminRouter;
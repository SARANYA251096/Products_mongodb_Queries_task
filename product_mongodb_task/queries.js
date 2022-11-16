// 1.Find all the information about each products
db.products.find();

// 2.Find the product price which are between 400 to 800
db.products.find({ product_price: { $gte: 400, $lte: 800 } });

// 3.Find the product price which are not between 400 to 600
db.products.find({
  $and: [
    { $or: [{ product_price: { $lt: 400 } }, { product_price: { $gt: 600 } }] },
  ],
});
// 4.List the four product which are grater than 500 in price
db.products.find({ product_price: { $gt: 500 } });

// 5.Find the product name and product material of each products
db.products.find({ id: "15" }, { product_name: 1, product_material: 1 });

// 6.Find the product with a row id of 10
db.products.find({ id: { $eq: "10" } });

// 7.Find only the product name and product material
db.products.find({ id: "10" }, { product_name: 1, product_material: 1 });

// 8.Find all products which contain the value of soft in product material
db.products.find({ product_material: { $eq: "Soft" } });

// 9.Find products which contain product color indigo  and product price 492.00
db.products.find({
  $and: [
    {
      $or: [
        { product_color: { $eq: "indigo" } },
        { product_price: { $eq: 492.0 } },
      ],
    },
  ],
});

// 10.Delete the products which product price value are same
db.products
  .aggregate([
    { $group: { _id: "$product_price", count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } },
  ])
  .forEach((doc) => {
    db.products.remove({ product_price: doc._id });
  });

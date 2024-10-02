const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  // console.log("Product", req.query)
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (featured) {
    queryObject.featured = featured;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let apiData = Product.find(queryObject);

  if (sort) {
    // let sortFix = sort.replace(",", " ");                     changes only one (,) to ( ) s
    let sortFix = sort.split(",").join(" ");                  // OR - let selectFix = select.replaceAll(",", " "); 
    // queryObject.sort = sortFix
    apiData = apiData.sort(sortFix);
  }

  // select=name,prices
  if (select) {
    // let selectFix = select.replace(",", " ");
    // let selectFix = select.replaceAll(",", " ");
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  console.log(queryObject);

  const myData = await apiData;
  res.status(200).json({ myData });
};

const getAllProductsTesting = async (req, res) => {
  const myData = await Product.find(req.query).select("name price");
  // sort=name,price

  res.status(200).json({ myData });
};

module.exports = { getAllProducts, getAllProductsTesting };

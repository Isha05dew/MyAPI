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

  
  
  let page = Number(req.query.page) || 1
  let limit = Number(req.query.limit) || 10 
  let skip = (page - 1) * limit

  // page  = 2
  // limit = 3
  // skip = 1 * 3 = 3

  apiData = apiData.skip(skip).limit(limit);



  console.log(queryObject);

  const Products = await apiData;
  res.status(200).json({ Products, nbHits: Products.length });
};


const getAllProductsTesting = async (req, res) => {
  console.log("Product Testing", req.query)  
  const Products = await Product.find(req.query).skip(2) 
  // const Products = await Product.find(req.query).select("name price");
  // sort=name,price

  res.status(200).json({ Products });
};

module.exports = { getAllProducts, getAllProductsTesting };

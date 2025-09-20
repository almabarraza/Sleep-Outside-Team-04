import ProductData from "./ProductData.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();
loadHeaderFooter();

// add to cart button event handler
//async function addToCartHandler(e) {
//const product = await dataSource.findProductById(e.target.dataset.id);
//  addProductToCart(product);
//}

// add listener to Add to Cart button
//document
// .getElementById("addToCart")
// .addEventListener("click", addToCartHandler);

// getParam function is called
// getParam()

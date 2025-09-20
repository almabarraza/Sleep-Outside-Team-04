import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const listElement = document.getElementById("listElement");
const productList = new ProductList("tents", dataSource, listElement);

loadHeaderFooter();

productList.init();

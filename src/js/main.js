import { loadHeaderFooter } from "./utils.mjs";
import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import alert from "./alert.js";

// Load header and footer
loadHeaderFooter();

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, element);
productList.init();

const alertModule = new alert("alerts.json");
alertModule.init();

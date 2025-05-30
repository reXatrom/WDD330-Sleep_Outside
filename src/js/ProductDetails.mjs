import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  // fetch product data
  async init() {
    // use the dataSource to fetch product data
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails("main");
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }


  // add product to cart
  addToCart() {
    let cartContents = getLocalStorage("so-cart");
    //check to see if there was anything there
    if (!cartContents) {
      cartContents = [];
    }
    // then add the current product to the list
    cartContents.push(this.product);
    setLocalStorage("so-cart", cartContents);
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
  }
  // addProductToCart() {
  //   const cartItems = getLocalStorage("so-cart") || [];
  //   const existing = cartItems.find(item => item.Id === this.product.Id);

  //   if (!existing) {
  //     cartItems.push(this.product);
  //     setLocalStorage("so-cart", cartItems);
  //   } else {
  //     alert("Item already in cart");
  //   }
  // }

  // render product details
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML("afterbegin", productDetailsTemplate(this.product));
  }
}


// function productDetailsTemplate(product) {
//   document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
//   document.querySelector("#p-brand").textContent = product.Brand.Name;
//   document.querySelector("#p-name").textContent = product.NameWithoutBrand;

//   const productImage = document.querySelector("#p-image");
//   productImage.src = product.Images.PrimaryExtraLarge;
//   productImage.alt = product.NameWithoutBrand;
//   const euroPrice = new Intl.NumberFormat('de-DE',
//     {
//       style: 'currency', currency: 'EUR',
//     }).format(Number(product.FinalPrice) * 0.85);
//   document.querySelector("#p-price").textContent = `${euroPrice}`;
//   document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
//   document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

//   document.querySelector("#add-to-cart").dataset.id = product.Id;
// }



// function ProductDetailsTemplate(product) {
//     document.querySelector('h2').textContent = product.Brand.Name;
//     document.querySelector('h3').textContent = product.NameWithBrand;

//     const productImage = document.getElementById('productImage');
//     productImage.src = product.Image;
//     productImage.alt = product.NameWithBrand;

//     document.getElementById('productPrice').textContent = product.FinalPrice;
//     document.getElementById('productColor').textContent = product.Colors[0].ColorName;
//     document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

//     document.getElementById('addToCart').dataset.id = product.Id;
// }
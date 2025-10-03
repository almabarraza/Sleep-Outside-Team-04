import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        console.log("entra a product details");
        this.product = await this.dataSource.findProductById(this.productId);
        console.log(this.product);
        this.renderProductDetails();

        document.getElementById('add-to-cart').addEventListener('click', this.addProductToCart.bind(this));

        //await this.renderProductDetails();

    }

    addProductToCart() {

        let products = getLocalStorage("so-cart") || [];

        if (!products) {
            products = [];
        }

        products.push(this.product);
        setLocalStorage("so-cart", products);

        //alert Message when the add to cart button has been clicking
        alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
        
        //logo animation
        const cartLogo = document.getElementById("cart-logo");
        cartLogo.classList.add("logo-animated");

        cartLogo.addEventListener("animationend", function handler() {
            cartLogo.classList.remove("logo-animated");
            cartLogo.removeEventListener("animationend", handler);
        })

    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
    document.getElementById('p-brand').textContent = product.Brand.Name;
    document.getElementById('p-name').textContent = product.NameWithoutBrand;


    document.getElementById("imgLarge").srcset = product.Images.PrimaryExtraLarge;
    document.getElementById("imgMedium").srcset = product.Images.PrimaryLarge;
    document.getElementById("p-image").src = product.Images.PrimaryMedium;
    document.getElementById("p-image").alt = product.NameWithoutBrand;




    //let productImage = document.getElementById('imgExtL');
    // productImage.src = product.Images.PrimaryExtraLarge;
    // productImage.alt = product.NameWithoutBrand;

    // productImage = document.getElementById('imgLarge');
    // productImage.src = product.Images.PrimaryLarge;
    // productImage.alt = product.NameWithoutBrand;

    // productImage = document.getElementById('p-image');
    // productImage.src = product.Images.PrimaryMedium;
    //productImage.alt = product.NameWithoutBrand;
    const euroPrice = new Intl.NumberFormat('de-DE',
        {
            style: 'currency', currency: 'EUR',
        }).format(Number(product.FinalPrice) * 0.85);

    document.getElementById('p-price').textContent = `${euroPrice}`;
    document.getElementById('p-color').textContent = product.Colors[0].ColorName;
    document.getElementById('p-description').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('add-to-cart').dataset.id = product.Id;

}


















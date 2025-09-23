import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {

        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();

        document.getElementById('addToCart').addEventListener('click', this.addProductToCart.bind(this));

        await this.renderProductDetails();

    }

    addProductToCart() {
        console.log(this.product);
        const products = getLocalStorage("so-cart") || [];
        products.push(this.product);
        setLocalStorage("so-cart", products);

    }

    renderProductDetails() {
        ProductDetailsTemplate(this.product);
    }
}

function ProductDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.Category.chartArt(0).toUpperCase() + product.Category.slice(1);
    document.querySelector('#p-brand').textContent = product.Brand.Name;
    document.querySelector('#p-name').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Image.PrimaryExtraLarge;
    productImage.alt = product.NameWithoutBrand;
    const euroPrice = new Intl.NumberFormat('de-DE',
        {
            style: 'currency', currency: 'EUR',
        }).format(Number(product.FinalPrice) * 0.85);

    document.getElementById('productPrice').textContent = `${euroPrice}`;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}


















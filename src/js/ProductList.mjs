import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
    <picture>
        <source srcset="${product.Images.PrimaryLarge}" media="(min-width: 1024px)"/>
        <source srcset="${product.Images.PrimaryMedium}" media="(min-width: 600px)"/>
        <img src="${product.Images.PrimarySmall}" alt="${product.Name}"/>
    </picture>
    <h3 class="card_brand">${product.Brand.Name}</h3>
    <h2 class="card_name">${product.NameWithoutBrand}</h2>
    <p class="product-card_price">${product.FinalPrice}</p>
    </a>
    </li>`;

}


export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;

    }


    async init() {
        console.log("entra a product list");
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        document.querySelector(".title").textContent = this.category;


    }

    //"afterbegin", "true"
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }


}
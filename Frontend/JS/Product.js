//CLASS PRODUIT

export class Product {
    constructor(id, name, price, description, imageUrl) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._description = description;
        this._imageUrl = imageUrl;
    }

    get name() {
        return this._name
    }

    set name(_name) {
        this._name = this.name
    }

    get price() {
        return this._price
    }

    set price(_price) {
        this._price = this.price
    }

    get description() {
        return this._description
    }

    set description(_description) {
        this._description = this.description
    }

    get imageUrl() {
        return this._imageUrl
    }

    set imageUrl(_imageUrl) {
        this._imageUrl = this.imageUrl
    }
}
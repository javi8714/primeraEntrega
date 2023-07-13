import {__dirname} from "../utils";
import path from "path";
import fs from "fs";

export class ProductManager {
  constructor(fileName) {
    this.path=path.join(__dirname,`/files/${fileName}`); //src/files/products.json
    this.products = [];
    this.loadProducts();
  }
   
  async loadProducts() {
    // Carga los productos del archivo especificado por This en el arreglo products
    try {
      const data = await fs.prommises.readFile(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (err) {
      console.error(`Error loading products: ${err}`);
      return [];
    }
  }

  async saveProducts() {
    // Guardamos los productos 
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
  } catch (err) {
      console.error('Error saving products:', err);
  }
  }

  addProduct(product) {
    // Asignamos  el auto-incrementable id
    const id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    product.id = id;
    this.products.push(product);
    this.saveProducts();
  }

    const newProduct = {
      id: this.generateId(),
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
      status: product.status,
      category: product.category
    };

    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  getProducts() {
    // Devovolvemos los productos en formato arreglo
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  updateProduct(id, updatedProduct) {
    // Recibe un Id y un objeto con los atributos a actualizar
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      console.error(`Product with id ${id} not found`);
      return;
    }
    this.products[index] = { ...this.products[index], ...updatedProduct };
    this.saveProducts();
  }

  deleteProduct(id) {
    // Recibe un Id y eleimina el producto del arreglo 
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      console.error(`Product with id ${id} not found`);
      return;
    }
    this.products.splice(index, 1);
    this.saveProducts();
  }
}

//export { ProductManager };



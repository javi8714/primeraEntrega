import { Router } from "express"; 
import { ProductManager } from "../datao/ProductManager";
import { __dirname } from '../utils.js';


const productService = new ProductManager('/products.json')

const validateFields = (req,res,next)=>{
    const productInfo = req.body
    if (!productInfo.title || !productInfo.description || !productInfo.price || !productInfo.code || !productInfo.stock || !productInfo.status || !productInfo.category) {
        return res.json({ status: "error", message: "Campos incompletos! Completar." })
    } else {
        next();
    }
}

const router = Router();

router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        const products =  await productService.getProducts();
        let resultado = 0;
        if (limit) {
            
            //devolver productos de acuerdo al limite
            const limite = parseInt(req.query.limit);
            console.log("limite: ", limite);
            if (limite > 0) {
                resultado = products.slice(0,limite);
            } else {
                resultado = products;
            }
            res.send(resultado);

        } else {
            res.json({ status: "success", data: products });
        }
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});



router.get("/:pid",(req,res)=>{});

router.post("/",validateFields,async (req,res)=>{
    //Agregar el producto
    try {
        const productInfo = req.body;
        const productsCreate = await productService.save(productInfo);
        res.json({status:"succcess", data:productsCreate, message:"producto creado"})
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});

router.put("/:pid",validateFields,(req,res)=>{
    const productInfo = req.body;
    //actualizar el producto  
})

router.delete("/:pid",(req,res)=>{});


export {router as productsRouter}



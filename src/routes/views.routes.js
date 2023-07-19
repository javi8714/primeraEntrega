import { Router } from "express";


const router = Router();


//routes
router.get("/index", (req,res)=>{
    
    //indicar la vista
    res.render("index");
});
router.get("/realtimeproducts",(req,res)=>{
    //indicar la vista
    res.render("realtimeproducts");
});


export {router as viewsRouter};
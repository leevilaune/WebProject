import product from "../model/product-model.js";

const getAllProducts = async (req, res) => {
    const products = await product.findAll({where:{default_product:true}});
    if(products.length > 0){
        res.json(products);
    }else{
        res.status(404).json({message: "Products is empty"})
    }
};

const addProduct = async (req, res) => {
    const newProduct = req.body;
    console.log(newProduct);
    try{
        await product.create(newProduct);
        res.json({success: true, new: newProduct});
    }catch(error){
        res.status(400).json({message: error.message});
    }
};

export {getAllProducts, addProduct};
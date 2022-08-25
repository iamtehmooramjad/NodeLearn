const db = require('../models');

/** Main Model */
const Product = db.products;


/** Create Product */
const addProduct = async (req,res)=>{

    let newProduct={
      title:req.body.title,
      price:req.body.price,
      description:req.body.description,
      published:req.body.published,
    };

    const product = await Product.create(newProduct);
    res.status(200).send(product);
    console.log(product);
};


/** Get All Products */
const getAllProducts = async (req,res)=>{
/*    let products = await Product.findAll({
        attributes:[
            'title',
            'price'
        ]
    });*/

     let products = await Product.findAll({});
     res.status(200).send(products);
};



/** Get Product By id */
const getProductById = async (req,res)=>{
    let id = req.params.id;
    let product = await Product.findOne({where: {id: id}});
    res.status(200).send(product);
};


/** Update Product */
const updateProduct = async (req,res)=>{
    let id = req.params.id;
    const product = await Product.update(req.body,{ where: { id: id}});
    res.status(200).send(product);
};

/** Delete Product */
const  deleteProductById = async (req,res)=>{

    let id = req.params.id;
    const product = await Product.destroy({where: {id: id}});
    res.status(200).send('Product is delete');
};


/** GetPublished Products */
const getPublishedProducts = async (req,res)=>{
    let products = await Product.findAll({ where: { published: true}});
    res.send(200).send(products);
};

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProductById,
    getPublishedProducts
}
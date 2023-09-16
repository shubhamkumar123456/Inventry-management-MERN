const express = require('express');
const { createProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const adminMiddleware = require('../utils/adminmiddleware');
const router = express.Router();

router.post('/create',adminMiddleware,createProduct);
router.get('/getall',getProduct);
router.put('/update/:id',adminMiddleware,updateProduct);
router.delete('/delete/:id',adminMiddleware,deleteProduct);
module.exports = router; 
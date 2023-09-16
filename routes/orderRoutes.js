const express =require('express');
const { createOrder, getOrder, updateOrder, deleteOrder, getAllorders } = require('../controllers/orderController');
const userMiddleware = require('../utils/usermiddleware')
const router = express.Router();

router.post('/create',userMiddleware,createOrder);
router.get('/getall',userMiddleware,getOrder);
router.get('/getallorders',getAllorders)
router.put('/update/:id',updateOrder);
router.delete('/delete/:id',userMiddleware,deleteOrder);

module.exports =router;
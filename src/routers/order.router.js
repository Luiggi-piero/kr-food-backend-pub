//   /api/orders

import { Router } from 'express';
import handler from 'express-async-handler';
import auth from '../middleware/auth.mid.js';
import { BAD_REQUEST, UNAUTHORIZED } from '../constants/httpStatus.js';
import { OrderModel } from '../models/order.model.js';
import { ORDERSTATUS } from '../constants/orderStatus.js';
import { UserModel } from '../models/user.model.js';
import { sendEmailReceipt } from '../helpers/mail.helper.js';
import admin from '../middleware/admin.mid.js';

const router = Router();
router.use(auth);

router.post('/create', handler(async (req, res) => {
    const order = req.body;

    if (order.items.length <= 0) {
        res.status(BAD_REQUEST).send("Cart is empty!");
    }

    // Solo puede existir una orden nueva por usuaio
    // Es por ello que se borra si ya existe otra previamente
    await OrderModel.deleteOne({
        user: req.user.id,
        status: ORDERSTATUS.NEW
    });

    // crear nueva orden
    const newOrder = new OrderModel({ ...order, user: req.user.id });
    // Guardar en la bd
    await newOrder.save();
    res.send(newOrder);
}));

router.get(
    '/allstatus',
    (req, res) => {
        const allstatus = Object.values(ORDERSTATUS);
        res.send(allstatus);
    }
);

export default router;
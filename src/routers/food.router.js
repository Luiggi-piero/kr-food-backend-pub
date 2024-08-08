//        /api/foods

import { Router } from 'express';
import handler from 'express-async-handler';
import { FoodModel } from '../models/food.model.js';
import admin from '../middleware/admin.mid.js';

const router = Router();

router.get('/', handler(async (req, res) => {
    const foods = await FoodModel.find({});
    res.send(foods);
}));

router.post(
    '/',
    admin,
    handler(async (req, res) => {
        const { name, price, tags, favorite, imageUrl, origins, cookTime } = req.body;

        const food = new FoodModel({
            name,
            price,
            tags: tags.split ? tags.split(',') : tags,
            favorite,
            imageUrl,
            origins: origins.split ? origins.split(',') : origins,
            cookTime
        });

        await food.save();
        res.send(food);
    })
);

router.delete(
    '/:foodId',
    admin,
    handler(async (req, res) => {
        const { foodId } = req.params;
        await FoodModel.deleteOne({ _id: foodId });
        res.send();
    })
);

export default router;
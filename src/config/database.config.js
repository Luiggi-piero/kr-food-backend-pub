import { connect, set } from 'mongoose';
import { UserModel } from '../models/user.model.js';
import { FoodModel } from '../models/food.model.js';
import { sample_foods, sample_users } from '../data.js';
import bcrypt from 'bcryptjs';

// Número de veces que se aplicará el hash/encriptación
const PASSWORD_HASH_SALT_ROUNDS = 10;

// obliga a usar la estructura del esquema
set('strictQuery', true);

export const dbconnect = async () => {
    try {
        await connect(process.env.MONGO_URI);
        await seedUsers();
        await seedFoods();
        console.log('✅ connect successfully');
    } catch (error) {
        console.log(error);
    }
};

// Crear usuarios en la bd usando sample_users
async function seedUsers() {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
        console.log('Users seed is already done');
        return;
    }

    for (const user of sample_users) {
        user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
        await UserModel.create(user);
    }

    console.log('Users seed is done 👌');
}

// Crear food en la bd usando sample_foods

async function seedFoods() {
    const foods = await FoodModel.countDocuments();
    if (foods > 0) {
        console.log('Foods seed is already done');
        return;
    }
    for (const food of sample_foods) {
        food.imageUrl = `/foods/${food.imageUrl}`;
        await FoodModel.create(food);
    }
    console.log('Foods seed is done 👌');
}
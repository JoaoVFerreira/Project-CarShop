import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// const MONGO_DB_URL = 'mongodb://localhost:27017/CarShop';
const MONGO_DB_URL = 'mongodb://mongodb:27017/CarShop';

const connectToDatabase = () => mongoose.connect(MONGO_DB_URL);

export default connectToDatabase;

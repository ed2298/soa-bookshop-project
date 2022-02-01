import * as mongoose from 'mongoose';

export const BookshopSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: String,
  old_price: String,
  rating: Number,
  image_url: String,
  user_email: String
});

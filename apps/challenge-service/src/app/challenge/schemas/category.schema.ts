import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema(
  {
    category: { type: String, unique: true },
    description: String,
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
  },
  { timestamps: true, collection: 'categories' },
);

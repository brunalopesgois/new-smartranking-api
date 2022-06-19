import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    name: String,
  },
  { timestamps: true, collection: 'players' },
);

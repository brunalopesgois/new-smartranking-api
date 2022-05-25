import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    phone: String,
    email: { type: String, unique: true },
    name: String,
    ranking: { type: String, default: null },
    rankingPosition: { type: Number, default: null },
    playerPictureUrl: { type: String, default: null },
  },
  { timestamps: true, collection: 'players' },
);

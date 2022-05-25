import * as mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema(
  {
    challengeDateTime: Date,
    status: String,
    requestDateTime: Date,
    responseDateTime: Date,
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    category: String,
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
    match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
  },
  { timestamps: true, collection: 'challenges' },
);

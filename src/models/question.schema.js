import mongoose from 'mongoose';
import db from '../db';

const { Schema } = mongoose;

const questionSchema = new Schema({
    context: { type: String },
    date: { type: Date, default: Date.now },
    answers: [
        {
            date: { type: Date, default: Date.now },
            context: { type: String }
        }
    ]
});

export default db.model('question', questionSchema);

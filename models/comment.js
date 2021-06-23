import mongoose from 'mongoose'

const Schema = mongoose.Schema
const CommentSchema = new Schema({
    title: String,
    body: String,
    date: Date
});

export const Comment = mongoose.model('ModelName', CommentSchema);
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const commentSchema = new Schema({
    title: String,
    body: String,
    date: Date
});

export const Comment = mongoose.model('Comment', commentSchema);
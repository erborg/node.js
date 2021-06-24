import {Comment} from "../models/comment.js";
import {ApplicationController} from "./application_controller.js";

export class CommentsController extends ApplicationController {
    static index(req, res) {
        Comment.find().then((comments) => {
            this.renderView(req, res, 'comments/index', {main_title:'Comments', comments: comments})
        }).catch((error) => {
            res.status(400).json({
                error:error
            })
        })
    }
    static show(req, res) {
        Comment.findOne({_id: req.params.id}).then((comment) => {
            this.renderView(req, res, 'comments/show', {main_title: comment.title, comment: comment})
        }).catch((error) => {
            res.status(400).json({
                error:error
            })
        })
    }
    static create(req, res) {
        const comment = new Comment({
            title: req.body["comment_title"],
            body: req.body["comment_body"],
            date: new Date()
        })
        comment.save().then(() => {
            res.redirect('/comments')
        }).catch((error) => {
            res.status(400).json({
                error:error
            })
        })
    }
    static update(req, res) {
        const comment = new Comment({
            _id: req.params.id,
            title: req.body["comment_title"],
            body: req.body["comment_body"]
        })
        Comment.updateOne({_id: req.params.id}, comment).then(() => {
            res.redirect('/comments')
        }).catch((error) => {
            res.status(400).json({
                error:error
            })
        })
    }
    static remove(req, res) {
        Comment.deleteOne({_id: req.params.id}).then(() => {
            res.redirect('/comments/')
        }).catch((error) => {
            res.status(400).json({
                error:error
            })
        })
    }
}
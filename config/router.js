import express from 'express';
import { CommentsController } from '../controllers/commentsController.js';
import { StaticPagesController } from '../controllers/staticPagesController.js';
import { UsersController } from '../controllers/usersController.js';
import { SessionsController } from '../controllers/sessionsController.js';
import { require_auth, require_no_auth, try_auth } from './auth.js';
import { body, check } from 'express-validator';
import { User } from '../models/user.js';

export const router = express.Router();

router.get('/', try_auth, (req, res) => {
  StaticPagesController.index(req, res);
});

router.get('/about', try_auth, (req, res) => {
  StaticPagesController.about(req, res);
});

router.get('/comments', try_auth, (req, res) => {
  CommentsController.index(req, res);
});

router.get('/comments/:id', try_auth, (req, res) => {
  CommentsController.show(req, res);
});

router.put('/comments/:id', require_auth, (req, res) => {
  CommentsController.update(req, res);
});

router.delete('/comments/:id', require_auth, (req, res) => {
  CommentsController.remove(req, res);
});

router.post('/comments', require_auth, (req, res) => {
  CommentsController.create(req, res);
});

router.get('/sessions/new', require_no_auth, (req, res) => {
  SessionsController.new_create(req, res);
});

router.post('/sessions', require_no_auth, (req, res) => {
  SessionsController.create(req, res);
});

router.delete('/sessions', require_auth, (req, res) => {
  SessionsController.remove(req, res);
});

router.get('/users/new', require_no_auth, (req, res) => {
  UsersController.new_create(req, res);
});

router.post(
  '/users',
  require_no_auth,
  check('user_email').isEmail().withMessage('Email is invalid'),
  body('user_email').custom((value) => {
    return User.findOne({ email: value }).then((user) => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  }),
  body('user_username').custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject('Username already in use');
      }
    });
  }),
  (req, res) => {
    UsersController.create(req, res);
  },
);

router.get('/users', try_auth, (req, res) => {
  UsersController.index(req, res);
});

router.get('/users/:user_id', try_auth, (req, res) => {
  UsersController.show(req, res);
});

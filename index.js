import cookieSession from 'cookie-session';
import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import flash from 'connect-flash';
import { router } from './config/router.js';
import { setupAssets } from './config/assets.js';

await mongoose.connect('mongodb://localhost/mcs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const app = express();

setupAssets(app, express);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('trust_proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    secret: 'test',
    maxAge: 24 * 60 * 60 * 1000,
  }),
);

app.use(flash());

app.use('/', router);
app.listen(3000, () => {
  console.log('Express web app on localhost:3000');
});

export class ApplicationController {
  static renderView(_req, res, view, data = {}) {
    data.current_user = res.locals.currentUser;
    res.render(view, data);
  }
}

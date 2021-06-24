import hbs from "hbs";
import path from "path";

const __dirname = path.resolve()

export function setupHbs(app) {
    app.set('view engine', 'hbs')
    hbs.registerPartials(path.join(__dirname, 'views/partials'))
    hbs.registerHelper('formatTime', function (date) {
        return date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        })
    })
}


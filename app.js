const path = require("path");
const {engine} = require("express-handlebars");
const express = require("express");
const {weather} = require("./utils/weather")

const app = express();
const port = 8080;


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/weather', (req, res) => {
    const {location} = req.query;

    weather(location, unit = "m", (err, data) =>{
      if (err) res.send(`Une erreur s\'est produite. ${err}`);
      res.send(data);
    })
});

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'about',
    });
});

app.get('*', (req, res) => {
    res.render('404',{
        title: '404'
    });
});

// app.use((req, res, next) => {
//     res.status(404).render('404',{
//         title: '404'
//     })
// });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erreur, regardez dans le terminal !')
});

app.listen(port,() => {
    console.log(`App listenning on port ${port}!`)
});


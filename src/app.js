const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
app.set('view engine', 'hbs')

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

// Change views path
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Jack in the Box'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Blah'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'meh',
        help: 'YOU NEED HELP BRO'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'nah',
        error: 'Help article not found'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must give a search"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "you must give an address"
        })
    }
    
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location: location
            })
        })
    })

    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'nah',
        error: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
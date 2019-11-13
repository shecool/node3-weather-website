const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))
// app.com


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sam Yiu'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Sam Yiu'
    })

})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        message: 'We are here to help you.',
        name: 'Sam Yiu'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(address, (error, {longitude, latitude, location}={}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, {summary, temp, chanceofrain, sunset}) => {
            const forecast = summary + ' The temperature is: ' + temp +' degrees. There is a ' + chanceofrain + '% chance of rain. The sun will set at ' + sunset
            res.send({
                location,
                temprature: temp,
                forecast
            })

        })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'This help page does not exist.',
        name: 'Sam Y'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'This page does not exist.',
        name: 'Sam Y'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
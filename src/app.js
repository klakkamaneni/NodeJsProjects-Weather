const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//seet up handlebars ad views locaion
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve up static pages and content
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather App',
        name:'AndewMead'
    })
})


app.get('/about', (req, res) => {
    res.render('about',{
        title:'Weather App:about page',
        name:'AndewMead'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Weather App:Help page',
        name:'AndewMead'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide a address to get weather'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error:error
            })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error:error
                })
            }else{
                res.send({
                    forecast:forecastdata,
                    location:location,
                    address:req.query.address
                })
            }            
        })
    })
   
})


//app.get('/products',() => {})
app.get('/products',(req, res) => {

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/**', (req, res) => {
    res.render('404',{
        title:'Weather App:Help page',
        name:'AndewMead',
        errorMsg:'Help article not found'
    })
})

app.get('*', (req, res) => {
   res.render('404',{
    title:'Weather App:Help page',
    name:'AndewMead',
    errorMsg:'404 error pageeeeeee'
})
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

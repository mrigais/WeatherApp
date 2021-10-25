const hbs = require('hbs')
const path = require('path')
/*path is a core node module 
  helps in directory manipulation
  it's being used here to access the directoy when server up express 
*/
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const express = require('express')
/*Loding the express library
express variable is a function not object like other library objects
it calls application, which has methods in it. example - app variable
*/
const app = express()

//define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)//setup static directory to serve
app.use(express.static(publicDirectory))
/*app.use is used to customise server,here it's being used to serve the publi directory
*/
app.get('', (request, response) => {
    /*here we can define what our application does. example - read from db
      first argument is the url getting hit
      2nd arg is callback with request variable and response
        a)request variable is object containing incoming information example -  information about query strings in url localhost:3000/products?search=games&rating=5
        b)response has bunch of methods fascilitating us to send response to the requestor.
    */
  //  response.send('Hello Express.js.')
   /* we can send html, json
   */
  response.render('index', {
    title: 'HOME',
    name: 'Mrigais Pandey'
  })
  /*render and hbs are working together here */

})



app.get('/about', (req, res) =>{

  // res.send('About Page')
  // res.send([{name:'json'},{ name: 'andrew'}])

  res.render('about', {
    title:'ABOUT US',
    name: 'Mrigias'
  })

})

app.get('/weather', (req, res) =>{
  if(!req.query.address){
    return res.send({
      error: 'you must provide an address'
    })
  }

  geoCode(req.query.address, (error, {latitude, longitude, location} = {})=>{//we have used destructuring here 
    if(error){
      return res.send(error)
    }

    forecast(latitude, longitude, (error, foreCastData) => {
      console.log(latitude)
      console.log(longitude)
      if(error){
       return  res.send({error})
      }

      return res.send({data:foreCastData,
      location,
      address:req.query.address})
     
    })

  })

})
app.get('/about/*', (req, res) =>{

  res.render('404', {
    title: 'Page not found',
    name: 'Mrigais',
    error: 'About url page not found'
  })

})

app.get('/products', (req, res)=>{

  if(!req.query.search){
    return res.send({
      error: 'Please provide a search address'
    })
  }

  res.send({
    forecast: 'Its snowing',
    location: 'philadelphia',
    address: req.query.search

  })

  console.log(req.query)
})
app.get('*', (req, res) =>{

  res.render('404', {
    title: 'Page not found',
    name: 'Mrigais',
    error: 'Page not found'
  })

})

app.listen(3000, ()=>{
  console.log('--------------------------------------------server is up and running at port 3000---------------------------------------')
})


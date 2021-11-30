const request = require('postman-request')
const forecast = (lat, long, callback)=>{
    const url_weatherstack = "http://api.weatherstack.com/current?access_key=3511c77940c9003afb6789f00d4f7576&query="+lat+","+long+"&units=f"
    // const url_weatherstack = "http://api.weatherstack.com/current?access_key=6396715893eff0debc4b7359506dc0a2&query=37.8267,-122.4233&units=f"

    request ({url: url_weatherstack, json: true},(error, response, body) =>{
        if(error){
             callback('Unable to connect to weather services.', undefined)

        }else if(response.body.error){
             callback('unable to find location', undefined)
        }else{
             callback(undefined, response.body)
        }
    })

}
module.exports = forecast
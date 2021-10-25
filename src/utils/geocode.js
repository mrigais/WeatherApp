const request  = require('postman-request')

const geoCode = (address, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoibXJpZ2FpcyIsImEiOiJja3R0andxaHUwMWU4MnBtbTNma3B1ejAwIn0.0HH7Ud_McSDQdhWJazCVCA"

    request({url: url, json:true}, (error, response)=> { // the second argument, function, passed to the request executes after the request completes
        //since, we using return here won't be of any help as it'll be called inside request and not geoCode, we'll use callback
        console.log('askjdfn')
        // console.log(response)
        if(error){
            callback('Unable to connect', undefined)
        }else if(response.body.features.length == 0){
            callback('unable to find location', response)
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                name: response.body.features[0].place_name

            })
        }
    })
}
module.exports = geoCode
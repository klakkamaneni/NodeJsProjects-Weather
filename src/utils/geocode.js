const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)
     + '.json?access_token=pk.eyJ1Ijoia2FjaGFuODEwMiIsImEiOiJjazZtdTFibzkwdHFkM2xwYjRkanJxeHgxIn0.jQNDNqeyKk_yf8whTyj2Ww&limit=1'

    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to map service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find the specified location.Try anothe search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
            
        }
    })

}

module.exports = geocode







// const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoia2FjaGFuODEwMiIsImEiOiJjazZtdTFibzkwdHFkM2xwYjRkanJxeHgxIn0.jQNDNqeyKk_yf8whTyj2Ww&limit=1'

// request({url:geourl, json:true}, (error, response) => {

//     if (error) {
//         console.log('Unable to connect to map service')
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find the specified location')
//     } else { 
//     const latitude = response.body.features[0].center[1]
//     const longitude = response.body.features[0].center[0]
//     console.log(`latitude ${latitude} longitude ${longitude}`)
//     }
// })
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7bb934ed189fcb2d4e417e4d5bdf52d2/' 
                 + latitude + ','+  longitude

    request({ url, json: true }, (error, {body}) => {        
        if (error) {
            callback('Unable to connect to weaather service', undefined)
        } else if (body.error) {
            callback('Unable to find given location.Please try new serach', undefined)
        } else {
            callback(undefined, 
                `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out.There is a ${body.currently.precipProbability}% chnace of rain`)           
        }
    })
}


module.exports = forecast





// const url = 'https://api.darksky.net/forecast/7bb934ed189fcb2d4e417e4d5bdf52d2/37.8267,-122.4233'

// request({ url: url, json:true }, (error, response) => {
//    //console.log(response)
   
//     if (error) {
//         console.log('Unable to connect to weaather service')
//     } else if( response.body.error){
//         console.log('Unable to find location')
//     }else {
//         const cdata = response.body.currently
//         console.log(`${response.body.daily.data[0].summary} It is currently ${cdata.temperature} degrees out.There is a ${cdata.precipProbability}% chnace of rain`)

//     }
   
// })
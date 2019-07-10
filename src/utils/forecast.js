const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/580a8a2bb39115aca104acafb244afab/' + longitude + ',' + latitude
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.error) {
            callback('Unable to ', undefined)
        } else {
            const {temperature, precipProbability} = body.currently
            callback(undefined, body.daily.data[0].summary + " It is currently " + temperature + " degrees out. The high is " + body.daily.data[0].temperatureHigh + " degrees with a low of " + body.daily.data[0].temperatureLow + " degrees. There is a " + precipProbability + "% chance of rain.")
        }
    })
}

// request({url: url, json: true}, (error, response) => {
//     // console.log(response.body.currently)
//     const degrees = response.body.currently.temperature
//     const percent = response.body.currently.precipProbability
//     console.log(response.body.daily.data[0].summary + " It is currently " + degrees + " degrees out. There is a " + percent + "% chance of rain.")
// })

module.exports = forecast
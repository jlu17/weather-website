const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoiamx1bHUxNyIsImEiOiJjanhrdXc4NDUwbmcxM3luM3pzdWpkbGpzIn0.aTX5dkxt1l_glvKsM2_wDA'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.features.length == 0) {
            callback('Unable to find location', undefined)
        } else {
            feature = body.features[0]
            callback(undefined, {
                latitude: feature.center[0],
                longitude: feature.center[1],
                location: feature.place_name
            })
        }
    })
}

module.exports = geocode
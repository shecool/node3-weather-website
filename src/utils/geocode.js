const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FtYW50aGF5aXUiLCJhIjoiY2syczE2YmI0MGVhdDNvbng2ejNoOW9jcCJ9.CSh-rv1eQ_tdKC2R2iPnzQ&limit=1'
    request({ url, json: true}, (error, { body }) => {
    if (error) {
        callback('Unable to access Mapbox API', undefined)
    } else if (body.features.length === 0) {
        callback('Location does not exist.', undefined)
    } else {
        const longitude = body.features[0].center[0]
        const latitude = body.features[0].center[1]
        const location = body.features[0].place_name
        callback(undefined, {
            longitude, 
            latitude, 
            location
        })
    }
    })
}


module.exports = geocode
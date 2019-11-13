const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/5f0b324a58c70de709b74bc7c6cfa2f9/' + latitude + ',' + longitude + '?units=si'
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temp: body.currently.temperature,
                chanceofrain: body.currently.precipProbability.body,
                sunset: body.daily[0].data.sunsetTime
            })
        }
    })

}

module.exports = forecast

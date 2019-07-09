
const request = require('request')

const geocode = (address , callback ) => {// we put the name of the location
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +  '.json?access_token=pk.eyJ1Ijoicm9ieTkxIiwiYSI6ImNqeGZ5N3V2NDB6NWw0MG56bW5hbXVwazYifQ.O2w2Z6V-k2uPGt6qi2iqGg&limit=1'
    request ( { url : url , json : true  } , ( error , {body} ) => { // response.body   
        if(error){// error for no connection
            callback('Unable to connect to location service',undefined)
        } 
        else if ( body.message){ // ! da invalid address
           callback('Maybe wrong url, please check it ',undefined)
        }
        else if( body.features.length === 0 ){
            callback('Unable to find location',undefined)
        }
        else{
            const {  geometry , place_name  } = body.features[0]
            callback(undefined, { latitude : geometry.coordinates[0] ,
                                  longitude : geometry.coordinates[1],
                                  location : place_name
                                })
        }
    })
}


module.exports = geocode


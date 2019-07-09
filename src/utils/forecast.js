

const request =   require('request') // AND IT IS  NPM LIBRARY!


const forecast = (x , y , callback) => { // here , x , y are coordinates ( numbers)
    const url = 'https://api.darksky.net/forecast/903899595018855f3b7dd3ced2c00456/'+ x + ',' + y 
    request( { url : url , json : true  } , ( error , { body } ) => { // it was just response 
        if(error){// error for no connection
            callback('Unable to connect to location service', undefined)
        } 
        else if ( body.error){
            callback('Maybe wrong url, please check it ' , undefined)
        }
        else{
            const { currently , daily } = body
            callback(undefined , daily.data[0].summary + ' It is currently ' + currently.temperature + " degrees out. there is a " + currently.precipProbability + '% chance of rain.' )
        }
    })
}


module.exports = forecast


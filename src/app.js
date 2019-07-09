//npm init -y for package.json and others stuff

// npm i express@4.16.4 for installing express version....

const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname, '../public/index.html'))

//const geocode = require('./weather-app/utils/geocode')
//const forecast = require('./utils/forecast')

const app = express () 

app.use(express.static(path.join(__dirname, '../public/') ) ) // setup the static directory , than u have to put the htmls file inside this dir ( public) and so we can load them files as pages

// to customize the name of the views directory , standard is views after root app directory
const viewsPath = path.join(__dirname ,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs') // this is to read/load the hbs extensions file
app.set('views', viewsPath) // this set the views as the variable
hbs.registerPartials(partialPath)



//app.com

//app.com/help

//app.com/about


// it has to be views the name of the directory for default 
app.get('' , (req , res) => { // and so i can access that proprieties of this object with {{name}} in the index.hbs file
    res.render('index' , { // the name of the file
        title : 'Weather app',  // these proprieties , i can access them in the index file with {{}} , so i send this organized value
        name : 'Andrew Mead' 
    })   // render instead of res.send ; don't need extension, u have to put the name of the file (hbs) and it'll load in , something dynamic
    // to launch this one, u have to go to the folder above , that contains all app folder, the root 
    
})

app.get('/about' , (req , res) => { // and so i can access that proprieties of this object with {{name}} in the index.hbs file
    res.render('about' , { // the name of the file
        title : 'about page',  // these proprieties , i can access them in the index file with {{}} , so i send this organized value
        surname : 'Andrew Mead 1' , 
        correct : 'Correct!'
    })   // render instead of res.send ; don't need extension, u have to put the name of the file (hbs) and it'll load in , something dynamic
    // to launch this one, u have to go to the folder above , that contains all app folder, the root 
    
})

app.get('/help' , (req , res) => { // and so i can access that proprieties of this object with {{name}} in the index.hbs file
    res.render('help' , { // the name of the file
        title : 'help page',  // these proprieties , i can access them in the index file with {{}} , so i send this organized value
        names : 'Andrew Mead 2' , 
        scorrect : 'SCorrect!'
    })   // render instead of res.send ; don't need extension, u have to put the name of the file (hbs) and it'll load in , something dynamic
    // to launch this one, u have to go to the folder above , that contains all app folder, the root 
    
})

/*
app.get('/help' , (req, res) => {
    res.send({
        name : 'My_name',
        surname : 'my Surname'
    })
})

app.get('/about' , (req, res) => {
    //res.send('This is the about page')
    res.send('This is the about page <title>About title </title>')
})
*/

// nodemon .\src\app.js -e js,hbs

app.get('/weather' , (req, res) => {
    if(!req.query.address){ // quello che passiamo nella barra degli indirizzi con ?address = "qualcosa"
        return res.send({
            error : 'You must insert an address'
        })
    }
    geocode( req.query.address , ( error , {latitude , longitude , location } = {} ) => { // for invalid address so it takes the default value
            if(error)
                return res.send({
                    error : error
                })
        forecast ( latitude , longitude , ( (error , stringa) => {
            if(error)
                return res.send({ 
                    error : error
                })
            res.send({
                forecast : stringa , 
                location : location,
                address : req.query.address
            })

    }))

                   
        
    })
    console.log(req.query.address)
})

app.get('/products' , (req,res) => {
    if(!req.query.search){ // when there is no search terms ... u can send just 1 response
        return res.send({
            error : 'You must provide a search terms'
        })
        
    }

    console.log(req.query.search)
    res.send({
        products : []
    })

})

app.get('/help/*', (req,res) => {
    res.render('404' , {
        title : '404' , 
        name : 'Andrew Mead' , 
        errorMessage : 'Help article not found'
    })
})

// rendering is render a page, so it render from scratch

app.get('*' , (req,res) => { // this works bc * mean match everithing.. and so if the url didn't match before this , it means hasn't matched yet.. so go to the last one , when find a match it'll finish read it and stop
    res.render('404' , {
        title : '404' ,
        name : 'Andrew Mead' , 
        errorMessage : 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})



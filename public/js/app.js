

console.log('Client site javascript file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => { 
        console.log(data)
    })
})

//fetch('http://localhost:3000/weather?address=boston').then((response) => { on heroku i can just put the link below , remember other changes ( app.js and package.json)
// heroku in package.json is looking for the start value in scripts and there u have to put the name of the app u want to launch, u can put others value, remember example : dev : nodemon
// after the changes u can launch the program with : npm run dev 
// it launch the program seeing the content of dev, so it is like running on terminal with nodemon src/app.js -e js,hbs
//ofcourse to launch it u have to be in the folder where package.json is placed
// now we can also not to install some package on npm, we can just put it on dependeces in the package.json file, so we don't have to download things
// for uninstalling : npm uninstall -g nodemon
//  so we can install it like local dependences, there we go
// npm install nodemon@1.2.0 --save-dev
// so it will be added on package.json like dependences
// it just need on ur local machine when developing so heroku is not installed on heroku and that's ok , heroku uses just start scripts, so it is lighter, heroku have less work
// so it is not saved on the production enviroment
// with global installing the problem is that other people don't know what modules u are using and what versionu are using, if local anyone can know it and work with it
// still run : npm run dev
// in fact if i run nodemon from terminal it fails because it is not installed globally, just locally


fetch('/weather?address=boston').then((response) => {
    response.json().then((data) => {
        if(data.error)
            return console.log(data.error)
        return console.log(data.location , data.forecast)

    })
})

//querySelector(var) take just the first value that match the var value 
const weatherForm = document.querySelector('form') 
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


messageOne.textContent = 'ciaonissimo'



weatherForm.addEventListener('submit', (e) => { // it could not work, check well if the element is available in the other file, where u load the script (js) , put in the right place the loader of the js code
    e.preventDefault()  

    const location = search.value
    //console.log('testing!' , location)
    // here the same for links for heroku , see above, we can just remove localhost.... from address
    const address = '/weather?address='+location
    messageTwo.textContent = ''
    fetch(address).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
                //console.log(data.error)
                messageTwo.textContent = data.error
                return
            }
            //console.log(data.location , data.forecast)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast

        })
    })
})  


     
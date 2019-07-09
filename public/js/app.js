

console.log('Client site javascript file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => { 
        console.log(data)
    })
})

//fetch('http://localhost:3000/weather?address=boston').then((response) => { on heroku i can just put the link below , remember other changes ( app.js and package.json)
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


     
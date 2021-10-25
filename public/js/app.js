// // const { json, response } = require("express")

// const e = require("express");
// const { response } = require("express");

// // const userInput = document.querySelector('form');
// // const address = document.querySelector("input");

// userInput.addEventListener('submit', (event)=>{
//     event.preventDefault();//to prevent form from refreshing the page, which is the default behaviour
//     const location = address.value;    
//     let url = "http://localhost:3000/weather?address=boston";
    
//     fetch(url).then( (response) => {
//         console.log(response);
//         response.json().then(data) => {
//             if(data.error){

//                 console.log(data.error)
//             }else{

//                 console.log(data.location)
//                 console.log(data.forecast)
//             }
        
//         }
//         if(response.error){
//             console.log('response.error')

//         }else{
//             console.log('no error')
//             console.log(response.data)
//             console.log(response.location)
//         }
//     })

// })

    
fetch("http://localhost:3000/weather?address=boston").then( (response) => {

    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
        }else{
            console.log('no error')
        }
    })

})
// const { json, response } = require("express")

// const e = require("express");
// const {response} = require('express')
// const { response } = require("express");

const userInput = document.querySelector('form');
const address = document.querySelector("input");
const data_one = document.getElementById('message-1')
const data_two = document.getElementById('message-2')

userInput.addEventListener('submit', (event)=>{
    event.preventDefault();//to prevent form from refreshing the page, which is the default behaviour
    const location = address.value;    
    let url = "/weather?address="+location;
    
    fetch(url).then( (response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
            }else{
                var location_data = data.data.location;
                var current_data = data.data.current;
                var report = '<p> It is ' + current_data.temperature + ' degrees and feels like '+ current_data.feelslike +' in the region of ' + location_data.region + ' in ' + location_data.name +', ' +location_data.country+'.<br>'+
                            'The weather is ' + current_data.weather_descriptions + '.</p>';
                data_one.innerHTML = report;
            }
        })
    })

})

    
// fetch("/weather?address=boston").then( (response) => {
//     console.log('ks')

//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log('no error')
//         }
//     })

// })
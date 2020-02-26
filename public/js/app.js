
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//    // console.log(response.body)
//     response.json().then( (data) => {
//         console.log(data)
//     })
// })



// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//    // console.log(response.body)
//     response.json().then( (data) => {
        
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data)
//         }
        
//     })
// })

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        // console.log(response.body)
        msg1.textContent='Loading'
        msg2.textContent=''
        response.json().then((data) => {

            if (data.error) {
                console.log(data.error)
                msg1.textContent=data.error               
            } else {
                console.log(data.location)
                console.log(data.forecast)
                msg1.textContent=data.location
                msg2.textContent=data.forecast
            }

        })
    })
})
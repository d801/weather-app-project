/* Global Variables */
let baseURL = `https://api.openweathermap.org/data/2.5/weather?q=`;
let apiKey = '&APPID=bb95e29dbedc4d929be90b0dd99954e0';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//GET request to handle user input 
document.getElementById('generate').addEventListener('click', performAction);


function performAction(e){
//Take user input
const fav = document.getElementById('feelings').value;
const city = document.getElementById('zip').value;
getAnimal(baseURL ,city , apiKey)
.then (function(data) {
	// body...
	console.log(data)
	postData('/addAnimal' ,{temperature:data.main.temp ,date:newDate, fav:fav} )
	updateUI()
})
}


//make a POST request to our route
const postData = async(url='' , data={})=>{
	const response = await fetch(url , {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      // Body data type must match "Content-Type" header        
      body: JSON.stringify({
        temperature: data.temperature,
        date:data.date,
        fav:data.fav,
      }), 
	});

	try {
        const newData = await response.json();
        console.log(newData);
        return newData
    }catch(error){
      console.log("error", error);
  }
}


const getAnimal = async(baseURL ,city , apiKey)=>{
	const res = await fetch(baseURL+city+apiKey)
	try{
		const data = await res.json();
    console.log(data.main.temp);
		return data;
	}
	catch(error){
		console.log("error" , error);
	}
}


const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json()
    console.log(allData);
    document.getElementById('date').innerHTML = allData[0].temperature;
    document.getElementById('temp').innerHTML = allData[0].date;
    document.getElementById('content').innerHTML = allData[0].fav;

  }catch(error){
    console.log("error", error);
  }
}













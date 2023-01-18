// creating random color
function getRandomColor() {                 
    const letters = '0123456789ABCDEF'         
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
  
// Mapping API data to chartJS library model for scatter chart
const prepareScatterChartData = (rawData) => {
   
    const dataPoints = rawData.map(car => { 
                                        
        const {year: x, price} = car 

        const y = Number(price.substring(1)) 

        return  {x,y}
           
    })

    return {  
        datasets: [{
            label: "Car Price ($) as a function of production Year",
            data: dataPoints,
            backgroundColor: "white"
        }]
    }
  
}

// Mapping API data to chartJS library model for donut chart
const prepareDonutChartData = (rawData) => {
    const perBrandMap = new Map() 


    rawData.forEach(car => {  
      const {car_name: value} = car
      if(perBrandMap.has(value)) {
          const currentValue = perBrandMap.get(value)
          perBrandMap.set(value, currentValue + 1)
      } else {
          perBrandMap.set(value, 1)
      }
    })


    return {  
    
        labels: [...perBrandMap.keys()], 
        datasets: [{ 
            label: "Car Make",
            data: [...perBrandMap.values()],
            backgroundColor: [...perBrandMap.values()].map(() => getRandomColor())
        }]
    }
  
}

//changeing data
// console.log(window.location)
function addSetNumber(nr) {
  let url = window.location.href
  url.search = "";
  url = window.location.origin + window.location.pathname + `?data=${nr}`
  return window.location.href = url;
  }

let url = window.location.href;
console.log(url.match(/(?<=data=)\d+/))

const getNumber = (url) => {
  if(url.match(/(?<=data=)\d+/)) {
    return url.match(/(?<=data=)\d+/)[0]
  } else {
    return "1"
  }
}
console.log(getNumber(url))

//adding "selected" class to button
function addSelectedClass() {
  let element = document.getElementById(`data${getNumber(url)}`);
  element.classList.add("selected");
}
addSelectedClass()

// getting data from API
const BASE_URL = "https://jankubiena.github.io/EDI"

// fetch("https://my.api.mockaroo.com/cars.json?key=01084d50")
fetch(`${BASE_URL}/data/data${getNumber(url)}.json`)
 
  .then(response => { 
    if(response.ok) { 
        return response.json()
    } else {
        console.error(response.error)
        alert("Failed to fetch data from API") 
        throw new Error(response.error) 
    }})
// charts
.then(data => {

// donut
  const donutChartData = prepareDonutChartData(data)
  
  const donutCtx = document.getElementById('donutChart'); 

  new Chart(donutCtx, { 
    type: 'doughnut',
    data: donutChartData
  })

// scater
  const scatterChartData = prepareScatterChartData(data)
  
  const scatterCtx = document.getElementById('scatterChart');

  new Chart(scatterCtx, {  
    type: 'scatter',
    data: scatterChartData
  })

  
  // table
  const tbody = document.getElementById('carTable'); 

  data.forEach(item => { 
    const tr = document.createElement('tr');
    
    for (const [key, value] of Object.entries(item)) {
      const td = document.createElement('td');
      td.innerText = `${value}`;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  })
})


 
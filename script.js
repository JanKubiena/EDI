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
// getting data from API
fetch("https://my.api.mockaroo.com/cars.json?key=01084d50")
.then(response => { 

    if(response.ok) { 
        return response.json()
    } else {
        console.error(response.error)
        alert("Failed to fetch data from API") 
        throw new Error(response.error) 
    }}
    )
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
    const td1 = document.createElement('td'); 
    td1.innerHTML = item.car_name; 
    const td2 = document.createElement('td');
    td2.innerHTML = item.car_model;
    const td3 = document.createElement('td');
    td3.innerHTML = item.year;
    const td4 = document.createElement('td');
    td4.innerHTML = item.dealership;
    const td5 = document.createElement('td');
    td5.innerHTML = item.color;
    const td6 = document.createElement('td');
    td6.innerHTML = item.price;
    const td7 = document.createElement('td');
    td7.innerHTML = item.availability;

    tr.appendChild(td1); 
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);

    tbody.appendChild(tr); 
  })
})


 
let countries = [];

fetch("https://my.api.mockaroo.com/cars.json?key=01084d50")
.then(response => response.json())
.then(data => {
  // data table
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

    countries.push(item.dealership)

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

// data charts
google.charts.load('current', {
    'packages':['geochart'],
  });
  google.charts.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {

    // var chartData = [['Country', 'Popularity']];
    // for (var i = 0; i < countries.length; i++) {
    //   chartData.push([countries[i].country, 1]);
    // }

    var data = google.visualization.arrayToDataTable([
      ['Country', 'Popularity'],
      ['Germany', 200],
      ['United States', 300],
      ['Brazil', 400],
      ['Canada', 500],
      ['France', 600],
      ['RU', 700]
    ]);

    var options = {};

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
  }

 
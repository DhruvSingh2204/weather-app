function findWeather() {
    const city = document.getElementById('searchcity').value
    
    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '84ede7503bmsh482b8f109fdf27fp1ca99cjsn8570f7da1a4b',
        'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
      }
    };
  
    fetch(url , options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      document.getElementById('cityName').innerText = `${data.location.city}`
      document.getElementById('type').innerText = `Weather - ${data.current_observation.condition.text}  `
      document.getElementById('currTemp').innerText = `${FtoC(data.current_observation.condition.temperature)} *C`
      document.getElementById('minTemp').innerText = `${FtoC(data.forecasts[0].low)} *C`
      document.getElementById('maxTemp').innerText = `${FtoC(data.forecasts[0].high)} *C`
      document.getElementById('sunrise').innerText = data.current_observation.astronomy.sunrise
      document.getElementById('sunset').innerText = data.current_observation.astronomy.sunset;
      document.getElementById('humidity').innerText = `${data.current_observation.atmosphere.humidity} %`
      document.getElementById('visibility').innerText = data.current_observation.atmosphere.visibility
      document.getElementById('pressure').innerText = `${data.current_observation.atmosphere.pressure} hpa`
      document.getElementById('chill').innerText = data.current_observation.wind.chill
      document.getElementById('direction').innerText = data.current_observation.wind.direction
      document.getElementById('speed').innerText = `${data.current_observation.wind.speed} km/h`
      document.getElementById('datetime').innerText = Date(Date.now())
  
      document.getElementById('type').innerText += weatheremoji[data.current_observation.condition.text]
  
      let days = []
      let temps = []
      mainForecasts.innerText = ''
      
      for(let i = 1;i<7;i++){
        days.push(data.forecasts[i].day)
        temps.push(FtoC((data.forecasts[i].low + data.forecasts[i].high) / 2))
        
        const newDiv = document.createElement('div')
  
        const newDivDay = document.createElement('div')
        newDivDay.innerText = `${data.forecasts[i].day}`
        newDivDay.style.margin = '1px'
        newDivDay.style.fontWeight = 'bold'
        newDivDay.style.fontSize = '25px'
        
        const newDivText = document.createElement('div')
        newDivText.innerText = `Weather - ${data.forecasts[i].text}`
        newDivText.style.margin = '1px'
        
        const newDivLow = document.createElement('div')
        newDivLow.innerText = `Minimum Temperature - ${FtoC(data.forecasts[i].low)} *C`
        newDivLow.style.margin = '1px'
        
        const newDivHigh = document.createElement('div')
        newDivHigh.innerText = `Maximum Temperature - ${FtoC(data.forecasts[i].high)} *C`
        newDivHigh.style.margin = '1px'
  
        newDiv.appendChild(newDivDay)
        newDiv.appendChild(newDivText)
        newDiv.appendChild(newDivLow)
        newDiv.appendChild(newDivHigh)
        
        newDiv.style.display = 'flex';
        
        newDiv.style.flexDirection = 'column';
        
        newDiv.style.margin = '2px';
        newDiv.style.border = "2px solid black"
        newDiv.style.borderRadius = '10px'
  
        mainForecasts.appendChild(newDiv)
      }
      const ctx = document.getElementById('temperatureChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: days,
          datasets: [{
            label: 'Temperature (°C)',
            data: temps,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    .catch(error => {
      // document.getElementById('cityName').innerText = 'Not Found'
    })
  }
  
  function FtoC(F) {
    return Math.floor(((F - 32) * 500) / 9) / 100
  }
  
  const weatheremoji = {'Haze' : '💨' , 'Hot' : '☀️' , 'Sunny' : '🔆' , 'Rain' : '🌧️' , 'Fog' : '🌫️' , 'Snow' : '❄️' , 'Mostly Sunny' : '🌤️' ,
                       'Partly Cloudy' : '⛅' , 'Mostly Cloudly' : '🌥️'}
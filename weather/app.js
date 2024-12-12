async function getWeather() {
  const city = document.getElementById('city').value;
  const apiKey = '4a43409e16627f0c71904ec8b3904f57'; // OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === '200') {
      // Display city name
      const cityName = data.city.name;
      const country = data.city.country;
      document.getElementById('weather').innerHTML = `
        <h3>${cityName}, ${country}</h3>
        <p>Weather forecast for next 5 days</p>
      `;

      // Generate forecast for the next 5 days
      let forecastHtml = '';
      data.list.forEach((item, index) => {
        // Show data for every 8th index (each day's forecast)
        if (index % 8 === 0) {
          const date = new Date(item.dt * 1000); // Convert Unix timestamp to date
          const day = date.toLocaleString('en-US', { weekday: 'short' });
          const temp = item.main.temp;
          const weatherDescription = item.weather[0].description;
          const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

          forecastHtml += `
            <div class="col-md-2 forecast-card">
              <h5>${day}</h5>
              <img src="${icon}" alt="${weatherDescription}">
              <p>${temp}°C</p>
              <p>${weatherDescription}</p>
            </div>
          `;
        }
      });

      // Insert forecast HTML into the page
      document.querySelector('.row.mt-4').innerHTML = forecastHtml;
    } else {
      document.getElementById('weather').innerHTML = `<p>${data.message}</p>`;
    }
  } catch (error) {
    document.getElementById('weather').innerHTML = `<p>Error fetching data</p>`;
  }
}

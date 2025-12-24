let card1 = document.getElementById("card1");
let card2 = document.getElementById("card2");
let card3 = document.getElementById("card3");
let countrySearch = document.getElementById("countrySearch");
let searchBtn = document.getElementById("searchBtn");
let cityName = document.getElementById("cityName");

Swal.bindClickHandler();

async function getCountry(country) {
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3e6f2e7ccb854d4286805526252112&q=${country ? country:"Egypt"}&days=3&aqi=yes&alerts=yes`);
    let res = await data.json();
    display(res);
    // loading.classList.add("d-none");
}

async function display(data) {
    cityName.innerHTML = data.location.name; 
    
    todayWeather(data);
    tomorrowWeather(data);
    overmorrowWeather(data)
};

function getDayName(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
}


async function todayWeather(data) {

    let days = data.forecast.forecastday;
    const date = days[0].date;
    const dayName = getDayName(date);
    
       let box = ` <div class="card-header">
                        <h3 class="card-title">${dayName}</h3>
                        <h5 class="card-title2">${days[0].date}</h5>
                    </div>
                    <div class="card-body">
                        <img src="https:${days[0].day.condition.icon}" alt="">
                        <p class="card-text">
                          <h2>${days[0].day.condition.text}</h2>
                           <h3>${days[0].day.avgtemp_c}°C</h3> 
                           <h5>${days[0].day.mintemp_c}°C</h5> 
                           
                        </p> 
                    </div>
                    <div class="card-footer">
                        <h3>Today</h3>
                        <h6><i class="fa-solid fa-wind"></i> ${days[0].day.maxwind_kph}km/h <i class="fa-solid fa-cloud-rain"></i> ${days[0].day.daily_chance_of_rain}%</h6>
                       
                    </div>`
    
    card1.innerHTML = box;
};

async function tomorrowWeather(data) {

    let days = data.forecast.forecastday;
    const date = days[1].date;
    const dayName = getDayName(date);

    let box = ` <div class="card-header">
                        <h3 class="card-title">${dayName}</h3>
                        <h5 class="card-title2">${days[1].date}</h5>
                    </div>
                    <div class="card-body">
                        <img src="https:${days[1].day.condition.icon}" alt="">
                        <p class="card-text">
                        <h3>${days[1].day.condition.text}</h3>
                           <h3>${days[1].day.avgtemp_c}°C</h3>  
                           <h5>${days[1].day.mintemp_c}°C</h5>     
                        </p>                    
                        </div>
                    <div class="card-footer">
                        <h3>Tomorrow</h3>
                        <h6><i class="fa-solid fa-wind"></i> ${days[1].day.maxwind_kph}km/h <i class="fa-solid fa-cloud-rain"></i> ${days[1].day.daily_chance_of_rain}%</h6>
                    </div>
                    </div>`
    card2.innerHTML = box;
};

async function overmorrowWeather(data) {

    let days = data.forecast.forecastday;
    const date = days[2].date;
    const dayName = getDayName(date);

    let box = ` <div class="card-header">
                        <h3 class="card-title">${dayName}</h3>
                        <h5 class="card-title2">${days[2].date}</h5>
                    </div>
                    <div class="card-body">
                        <img src="https:${days[2].day.condition.icon}" alt="">
                        <p class="card-text">
                        <h3>${days[2].day.condition.text}</h3>
                           <h3>${days[2].day.avgtemp_c}°C</h3>  
                           <h5>${days[2].day.mintemp_c}°C</h5>
                        </p>                    
                        </div>
                    <div class="card-footer">
                        <h3>Overmorrow</h3>
                        <h6><i class="fa-solid fa-wind"></i> ${days[2].day.maxwind_kph}km/h <i class="fa-solid fa-cloud-rain"></i> ${days[2].day.daily_chance_of_rain}%</h6>
                    </div>
                    </div>`
    card3.innerHTML = box;
};

countrySearch.addEventListener('input',() => {
    let country = countrySearch.value;
    getCountry(country);
});
searchBtn.addEventListener('click', () => {
    let country = countrySearch.value;
    getCountry(country);
});

getCountry();
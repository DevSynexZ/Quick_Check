const date=document.getElementById("date");
const day=document.getElementById("day");
const month=document.getElementById("month");
const year=document.getElementById("year");

const today=new Date();

const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthName = ["January","February","March","April","May","June","July","August","September",
    "October","November","December"
];

date.innerHTML= today.getDate();
day.innerHTML= weekDays[today.getDay()];
month.innerHTML= monthName[today.getMonth()];
year.innerHTML= today.getFullYear();



/*Weather*/

const apiKey ="24f5fd94985523a78e0f757aef1d8598";
const apiUrl= "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");



async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404) {
        document.querySelector(".error").style.display="block";
                document.querySelector(".mWeather").style.display="none";

    }
    else {
         var data= await response.json();
    
    console.log(data);


    document.querySelector(".city").innerHTML= data.name;
        document.querySelector(".temp").innerHTML= Math.round(data.main.temp )+ "°C";
        document.querySelector(".humidity").innerHTML= data.main.humidity + "%";
                document.querySelector(".wind").innerHTML= data.wind.speed+ " km/h";


                if(data.weather[0].main == "Clouds") {
                    weatherIcon.src="images/clouds.png";
                }
                else if(data.weather[0].main == "Clear") {
                    weatherIcon.src="images/clear.png";
                }
                else if(data.weather[0].main == "Rain") {
                    weatherIcon.src="images/rain.png";
                }
                else if(data.weather[0].main == "Drizzle") {
                    weatherIcon.src="images/drizzle.png";
                }
                 else if(data.weather[0].main == "Mist") {
                    weatherIcon.src="images/mist.png";
                }

                document.querySelector(".mWeather").style.display="block";
                        document.querySelector(".error").style.display="none";

    }

   
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
 checkWeather() ;

//  To Do List 

const inputBox=document.getElementById("input-box");
const listContainer=document.getElementById("list-container");
function addTask() {
if(inputBox.value === '') {
    alert("Must Write Something!");
}
else {
    let li=document.createElement("li");
    li.innerHTML=inputBox.value;
    listContainer.appendChild(li);
    let span=document.createElement("span");
    span.innerHTML="\u274C";
    li.appendChild(span);
}
inputBox.value="";
saveData();
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked"); 
        saveData();
    }
else if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
    saveData();
}
 },false);

 function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
 }

 function showList() {
    listContainer.innerHTML=localStorage.getItem("data");
 }

 showList();

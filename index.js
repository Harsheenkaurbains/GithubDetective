const btnsubmit=document.getElementById("submit");
const get=(parm) => document.getElementById(`${parm}`);
const url= "https://api.github.com/users/";
const noresults=document.getElementById("noresults");
const btnmode=document.getElementById("btnmode");
let darkmode=false;
const input=document.getElementById("input");
const repos=document.getElementById("repos");
const followers=document.getElementById("followers");
const following= document.getElementById("following");
const locations=document.getElementById("location");
const page=document.getElementById("page");
const twitter=document.getElementById("twitter");
const company= document.getElementById("company");
const bio=document.getElementById("bio");
const date=document.getElementById("date");
const user=document.getElementById("user");
const username=document.getElementById("name");
const avatar=document.getElementById("avatar");
const searchbar=document.getElementsByClassName("searchbarcontainer");
const profilecontainer= document.getElementsByClassName("profilecontainer");
const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const modetext=document.getElementById("modetext");
const modeicon=document.getElementById("modeicon");
const root=document.documentElement.style;
const apps=document.getElementById("app");

// event listeners
btnsubmit.addEventListener("click",function(){
if(input.value !== ""){
getUserData(url+input.value);
}
});


input.addEventListener("keydown",function(e){
if(e.key == "Enter"){
    if(input.value !== ""){
        getUserData(url + input.value);
    }
}
}, false);

// false here is capture which is the thrid property of addeventlistener

input.addEventListener("input",function(){
    noresults.style.display="none";
});

btnmode.addEventListener("click",function(){
if(darkmode ==false){
    darkmodeproperties();
}
else{
    lightmodeproperties();
}
});


// functions

 function getUserData(gitUrl){
    fetch(gitUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updateprofile(data);
    })
    .catch((error) => {
      throw error;
    });
}


function updateprofile(data){
if(data.message !== "Not Found"){
noresults.style.display="none";
function checknull(parm1,parm2){
    if(parm1 === "" || parm1 === null){
parm2.style.opacity=0.5;
parm2.previousElementSibling.style.opacity=0.5;
return false;

    }
    else{
        return true;
    }
}

repos.innerText=`${data.public_repos}`;
followers.innerText=`${data.followers}`;
following.innerText=`${data.following}`;
locations.innerText=checknull(data.location , locations) ? data.location : "not avaliable";

page.innerText=checknull(data.blog, page)
 ? data.blog : "Not Avaliable";
 page.href=checknull(data.blog, page) ? data.blog : "#";
 
twitter.innerText= checknull(data.twitter_username,twitter) ? `@${data.twitter_username}` : "Not Avaliable";
twitter.href=checknull(data.twitter_username,twitter) ?  `https://twitter.com/${data.twitter_username}` : "#";

company.innerText=checknull(data.company,company) ? data.company : "Not Avaliable";

bio.innerText= data.bio == null ? "this profile has no bio" : `${data.bio}`;

datesegments= data.created_at.split("T").shift().split("-");
date.innerText=`Joined ${datesegments[2]} ${months[datesegments[1]-1]} ${datesegments[0]}`;

user.innerText=`@${data.login}`;
user.href=`${data.html_url}`;
username.innerText=data.name === null ? data.login : data.name;
avatar.src=`${data.avatar_url}`;


// apps.classList.remove("active");
searchbar.classList.remove("active");
profilecontainer.classList.remove("active");
}
else{
    noresults.style.display="block";
}
}


function darkmodeproperties(){
    root.setProperty("--lm-bg","#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText="LIGHT";
  modeicon.src="./assets/images/sun-icon.svg";
  root.setProperty("--lm-icon-bg",'brightness(1000%');
  darkmode=true;
  localStorage.setItem("darkmode",true);
}

function lightmodeproperties(){
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modetext.innerText = "DARK";
    modeicon.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkmode = false;
    localStorage.setItem("dark-mode", false);
}


getUserData(url + "harsheenkaurbains");

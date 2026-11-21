//Page elements
const loginPage = document.getElementById("LoginPage");
const registerPage = document.getElementById("RegisterPage");
const mainPage = document.getElementById("MainPage");

window.onload = Init;

function ChangePage(curPage, newPage)
{
    curPage.style.display = "none";
    newPage.style.display = "block";
}

function Init()
{
    registerPage.style.display = "none";
    mainPage.style.display = "none";
}

function Login()
{
    ChangePage(loginPage, mainPage);
}
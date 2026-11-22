//Page elements
const loginPage = document.getElementById("LoginPage");
const registerPage = document.getElementById("RegisterPage");
const mainPage = document.getElementById("MainPage");
const profilePage = document.getElementById("ProfilePage");
const aboutPage = document.getElementById("AboutPage");

const pages = [loginPage, registerPage, mainPage, profilePage, aboutPage];

window.onload = Init;

function ChangePage(newPage)
{
    pages.forEach(page => {
        page.style.display = "none";
    });

    newPage.style.display = "block";
}

function Init()
{
    ChangePage(loginPage);
}

function Login()
{
    ChangePage(mainPage);
}
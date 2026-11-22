//Page elements
const loginPage = document.getElementById("LoginPage");
const registerPage = document.getElementById("RegisterPage");
const mainPage = document.getElementById("MainPage");
const profilePage = document.getElementById("ProfilePage");
const aboutPage = document.getElementById("AboutPage");
const postPage = document.getElementById("PostPage");
const settingsPage = document.getElementById("SettingsPage");

const pages = [loginPage, registerPage, mainPage, profilePage, aboutPage, postPage, settingsPage];

window.onload = Init;

function ChangePage(newPage)
{
    console.log(newPage);
    console.log(pages);

    pages.forEach(page => {
        page.style.display = "none";
    });

    newPage.style.display = "block";
}

function Init()
{
    console.log(123);
    ChangePage(loginPage);
}
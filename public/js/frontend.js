//Page elements
const loginPage = document.getElementById("LoginPage");
const registerPage = document.getElementById("RegisterPage");

window.onload = Init;

function GoRegister()
{
    ChangePage(loginPage, registerPage);
}

function GoLogin()
{
    ChangePage(loginPage, registerPage);
}

function ChangePage(curPage, newPage)
{
    curPage.style.display = "none";
    newPage.style.display = "block";
}

function Init()
{
    registerPage.style.display = "none";
}
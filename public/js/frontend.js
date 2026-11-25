import {RegisterValidation, LoginValidation} from './modules/inputvalidation.js';

class Page{
    /**
     * 
     * @param {string} id 
     */
    constructor(id)
    {
        this.id = id + "Page";
        this.element = document.getElementById(this.id);
    }
}

const loginPage = new Page("Login");
const registerPage = new Page("Register");
const mainPage = new Page("Main");
const profilePage = new Page("Profile");
const aboutPage = new Page("About");
const postPage = new Page("Post");
const settingsPage = new Page("Settings");
const searchPage = new Page("Search");

let pages = [ loginPage, registerPage, mainPage, profilePage, aboutPage, postPage, settingsPage, searchPage ];

window.onload = Init;
window.Register = Register;
window.ChangePage = ChangePage;
window.Login = Login;

/**
 * 
 * @param {string} newPage - Name of page to go to
 */
function ChangePage(pageName)
{
    pages.forEach(page => {
        page.element.style.display = "none";
    });

    let newPage = GetPage(pageName);
    newPage.element.style.display = "block";
}

function GetPage(pageName)
{
    let pageFound;
    pages.forEach(page => {
        if (page.id == pageName) pageFound = page;
    });

    return pageFound;
}

function Init()
{
    ChangePage('LoginPage');
}

function Register()
{
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const fullName = document.getElementById("fullName").value;
    const dob = document.getElementById("dob").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const profilePic = document.getElementById("profilePic");
    const gender = document.getElementById("gender").value;
    console.log(email, username, fullName, dob, password, confirmPassword, profilePic, gender);
    
    if (!RegisterValidation(email, username, fullName, dob, password, confirmPassword, profilePic, gender)) return;
    ChangePage("LoginPage");
}

function Login()
{
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    if (!LoginValidation(username, password)) return;
    ChangePage("MainPage");
}
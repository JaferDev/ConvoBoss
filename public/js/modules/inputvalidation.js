import { User } from "./data.js";
import { AppendStorage, WriteStorage, ReadStorage } from "./storagehandler.js";
import { StartSession, ReadSession } from "./sessionhandler.js";
import { CreatePost } from "./posthandler.js";

class Field
{
    constructor(name, value, conditions, id)
    {
        this.id = id;
        this.name = name;
        this.value = value;
        this.conditions = conditions;
        this.errorId = "error" + id;
        this.errorMsg = "";
    }

    Validate()
    {
        if (this.value === "") { this.errorMsg = `Fill ${this.name} field`; return false; }
        for (let errorMsg in this.conditions)
        {
            if (this.conditions[errorMsg]) continue;
                
            if (this.errorMsg.length == 0) this.errorMsg += errorMsg;
            else this.errorMsg += "<br>" + errorMsg;
        }
           
        if (this.errorMsg.length == 0) return true;
        return false;
    }
}

function CheckSpecialChars(inputString)
{
    let specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
    return specialChars.test(inputString); //Regex (regular expressions) function string.test to check if special character in string
}

function CheckUserExists(username)
{
    const users = ReadStorage("users");
    console.log(users);
    if (users === null) return [false, null];
    
    for(let i = 0; i < users.length; i++)
    {
        console.log(users[i].username);
        console.log(username);
        if (users[i].username == username) return [true, users[i]];
    }

    return [false, null];
}

/**
 * 
 * @param {string} email 
 * @param {string} username 
 * @param {string} fullName 
 * @param {string} dob 
 * @param {string} password 
 * @param {string} confirmPassword 
 * @param {string} profilePic 
 * @param {string} gender 
 * @returns true if validated, false if invalidated
 */
function RegisterValidation(email, username, fullName, dob, password, confirmPassword, profilePic, gender)
{
    const emailField = new Field("Email", email, {  "Email should include \".\"": email.includes("."),
                                                    "Email should include \"@\"": email.includes("@"),
                                                    "Email cannot include space": !email.includes(" "),
                                                    "Email cannot be longer than 64 characters in total": email.length < 64}, "email");

    const usernameField = new Field("Username", username, { "Username cannot include special characters": !CheckSpecialChars(username), 
                                                            "Username cannot be longer than 16 characters": username.length < 17,
                                                            "Username must at least be 5 characters": username.length > 4,
                                                            "Username exists": !CheckUserExists(username)[0]}, "username");
    
    const fullnameField = new Field("Full Name", fullName, { "Full Name cannot include special characters": !CheckSpecialChars(fullName), 
                                                            "Full Name cannot be longer than 64 characters": fullName.length < 64,
                                                            "Full Name must at least be 1 character": fullName.length > 0}, "fullName");


    let dateOfBirth = Date.parse(dob);
    const CURDATE = new Date;
    const dobField = new Field("dob", dob, {"You must be at least 5 years old": (CURDATE - dateOfBirth) / (1000 * 60 * 60 * 24 * 365) >= 5,
                                            "You cannot be more than 161 years old": (CURDATE - dateOfBirth) / (1000 * 60 * 60 * 24 * 365) <= 200}, "dob");
    
    const passwordField = new Field("Password", password, { "Password must be at least 8 characters": password.length >= 8,
                                                            "Password must contain at least one special character": CheckSpecialChars(password),
                                                            "Password must contain at least one capital letter": /[A-Z]/.test(password),
                                                            "Password must contain at least one small letter": /[a-z]/.test(password),
                                                            "Password cannot be more than 16 characters": password.length < 17,}, "password");
    
    const confirmPasswordField = new Field("Confirm Password", confirmPassword, { "Confirm password should have the same value as password": confirmPassword == password}, "confirmPassword");

    const profilePicField = new Field("Profile Picture", profilePic, {}, "profilePic");
    if (profilePic.files.length != 0)
    {
        const pfpSize = profilePic.files[0].size; //Bytes
        const maxFileSize = 1024*1024*10; //10MB
        profilePicField.conditions = {"Image must be lesser than 10MB": pfpSize <= maxFileSize};
    }
    else profilePicField.value = "";

    let fields = [emailField, usernameField, passwordField, confirmPasswordField, dobField, profilePicField, fullnameField];
    if (!ValidateForm(fields)) return false;

    const newUser = new User(email, username, fullName, dob, password, profilePic, gender);
    AppendStorage(newUser, "users");
    return true;
}   

function LoginValidation(username, password)
{
    const user = CheckUserExists(username);
    console.log(user);
    const usernameField = new Field("username", username, {"Username doesn't exist. Do you want to register?" : user[0]}, "loginUsername");
    const passwordField = new Field("password", password, {}, "loginPassword");
    if (password !== null && user[1] !== null){ passwordField.conditions = {"Password doesn't match existing user" : user[1].password == password}; console.log(user[1].password == password);}

    const fields = [usernameField, passwordField];
    if (!ValidateForm(fields)) return false;

    StartSession(username, "username");
    StartSession(true, "loggedIn");
    return true;
}

function ValidateForm(fields)
{
    let validationPassed = true;
    fields.forEach(field => {   
        if (!field.Validate()) validationPassed = false;
    });

    DisplayErrors(fields);
    return validationPassed;
}

function DisplayErrors(fields)
{
    fields.forEach(field => {
        const errorElement = document.getElementById(field.errorId);
        if (field.errorMsg == "") //No error
        {
            errorElement.classList.remove("Error");
            errorElement.classList.add("Hidden");
            document.getElementById(field.id).style.border = "none";
        }
        else //Error
        {
            errorElement.classList.remove("Hidden");
            errorElement.classList.add("Error");
            errorElement.innerHTML = field.errorMsg;
            document.getElementById(field.id).style.border = "2px solid #e45858";
        }   
    });
}

function EnterPost(title, body, img, desc)
{
    const titleField = new Field("title", title, {  "Title must be at least 8 characters": title.length > 7,
                                                    "Title cannot be greater than 64 characters": title.length < 65}
                                                , "createPostTitle");
    
    const bodyField = new Field("body", body, { "Body must be at least 16 characters": body.length > 15,
                                                "Body cannot be greater than 1024 characters": body.length < 1025}
                                                , "createPostBody");

    const imgField = new Field("image", img, {} , "createPostImg");

    const descField = new Field("desc", desc, {"Description cannot be greater than 64 characters": desc.length < 64}
                                                , "createPostDesc");

    if (img.files.length != 0)
    {
        const imgSize = img.files[0].size; //Bytes
        const maxFileSize = 1024*1024*10; //10MB
        imgField.conditions = {"Image must be lesser than 10MB": imgSize <= maxFileSize};
    }

    const fields = [titleField, bodyField, imgField, descField];
    if (!ValidateForm(fields)) return false;
    console.log("Validated");
    CreatePost(title, ReadSession("username"), body, img);
    return true;
}

export { RegisterValidation, LoginValidation, EnterPost };
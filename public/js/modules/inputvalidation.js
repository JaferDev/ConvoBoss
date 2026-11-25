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
                                                            "Username must at least be 5 characters": username.length > 4,}, "username");
    
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
    
    const pfpSize = profilePic.size; //Bytes
    console.log(pfpSize);
    console.log(profilePic.name);
    console.log(profilePic.type);
    const profilePicField = new Field("Profile Picture", profilePic, {"Profile Picture must be within 10MB": pfpSize > 0}, "profilePic");

    let fields = [emailField, usernameField, passwordField, confirmPasswordField, dobField, profilePicField, fullnameField];
    let validationPassed = true;
    fields.forEach(field => {   
        if (!field.Validate()) validationPassed = false;
    });
    
    if (!validationPassed) { DisplayErrors(fields); return false; }
    return true;
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

export { RegisterValidation };
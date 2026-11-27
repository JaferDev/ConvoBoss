class User
{
    constructor(email, username, fullName, dob, password, pfp, gender)
    {
        this.email = email;
        this.username = username;
        this.fullName = fullName;
        this.dob = dob;
        this.password = password;
        this.pfp = pfp;
        this.gender = gender;
    }
}

class Post
{
    constructor(title, user, body = "", imgPath = "", desc = "")
    {
        this.title = title;
        this.body = body;
        this.imgPath = imgPath;
        this.user = user
    }
}

export {User, Post};
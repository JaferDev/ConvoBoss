import { ReadStorage, WriteStorage, AppendStorage } from "./storagehandler.js";
import { ReadSession } from "./sessionhandler.js";
import { Post } from "./data.js"

function CreatePost(title, user, body = "", postImgPath = "")
{
    const newPost = new Post(title, user, body, postImgPath);
    AppendStorage(newPost, "posts");
}

function DisplayPost(post)
{
    const user = GetUser(post.user);
    const htmlCode = `<div class="Post">
                        <div class="PostHeader">
                            <img class="postPFP" src="sprites/profile.png">
                            <p class="postAuthor" id="Subtitle">${user.username}</p>
                            <img class="followBtn" src="sprites/followbg.png">
                        </div>
                        <hr>
                        <div class="PostContent">
                            <p class="Title">${post.title}</p>
                            <img class="postImg" src="">
                            <p class="postBody">${post.body}</p>
                        </div>
                        <hr>
                        <div class="PostFooter">
                            <img class="postHeart" src="sprites/heartunfilled.png">
                            <p class="Caption">I wrote this as a test, Let's see if i can make it so theres ... later</p>
                            <p class="postDate">2d</p>
                        </div>
                    </div>`;
}

function GetUser(username)
{
    const users = ReadStorage("users");
    for(let i = 0; i < users.length; i++)if (users[i].username == username) return users[i];
}

export { CreatePost };
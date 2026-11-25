import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());

app.use(
    expressSession({
        secret: "123",
        cookie: {maxAge: 500000},
        resave: false,
        saveUninitialized: true
    })
);

let users = [];

app.post(`/M01087633/register`, (request, response) => {
    const userData = request.body;

    users.push(userData);
    response.send({"message": users});
});

app.listen(8080, () => {console.log("Listening on http://localhost:8080")});
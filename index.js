const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/game', function (req, res) {
    res.render('game', {});
});
app.post('/game', function (req, res) {
    let userSign = req.body.userSign;
    let computerSign = Math.random();

    if (computerSign<0.34) {
        computerSign ="Rock";
    }else if (computerSign <= 0.67) {
        computerSign="Paper";
    }else {
        computerSign="Scissor";
    }
    //let winningUser = (Math.abs(userNumber1 - computerNumber) <
       // Math.abs(userNumber2 - computerNumber)) ? "User" : "Computer";

    let winningUser = 0;
        if ((computerSign === "Rock" && userSign === "Scissor")||(computerSign === "Scissor" && userSign === "Paper")
        ||(computerSign === "Paper" && userSign === "Rock")) {
            winningUser = "Computer";
        } else if (computerSign == userSign) {
            winningUser = "Draw";
        } else {
            winningUser = "User";
        }        
        

    res.render('game', {post:true, userSign: userSign, computerSign: computerSign, winningUser: winningUser});
});


app.get('/:users', function (req, res) {
    res.render('home', {users:req.params.users.split(",")});
});
app.get('/mysecret', (req, res) => res.send('Tu ne devrais pas être là!!!'));



app.use(express.static('client'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));


let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',    // 호스트 주소
    user: 'root',           // mysql user
    password: '111111',       // mysql password
    database: 'node'         // mysql 데이터베이스
});
connection.connect();
connection.query('SELECT 1 + 1 AS solution',
    function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });
connection.end();
const express = require('express');
const app = express();
const fs = require('fs')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use('/static', express.static(__dirname + '/static'));


app.get('/', function (req, res) {
    let re = require('./record.json')
    let re2 = require('./record2.json')

    let { transport, food, etc, pus } = re;
    let { Pinmoney, Salary, etc2 } = re2;

    res.render('main', { transport: transport, food: food, etc: etc, pus: transport + food + etc, Pinmoney: Pinmoney, Salary: Salary, etc2: etc2 })
});

var st_date = new Date().toISOString().substr(0, 10).replace('T', ' ');
// alert(st_date);
console.log(st_date)
app.post('/sendExpend', (req, res) => {
    const { expend, type } = req.body;
    var re = require('./record.json')
    switch (type) {
        case 'transport':
            re.transport += Number(expend)
            break;
        case 'food':
            re.food += Number(expend)
            break;
        case 'etc':
            re.etc += Number(expend)
            break;
    }
    fs.writeFileSync('./record.json', JSON.stringify(re));
    // fs.writeFileSync('./record.json', JSON.stringify(re));
    console.log(re)
    res.redirect('/')
})

app.post('/sendIncome', (req, res) => {
    const { income, type2 } = req.body;
    var re2 = require('./record2.json')
    switch (type2) {
        case 'Pinmoney':
            re2.Pinmoney += Number(income)
            break;

        case 'Salary':
            re2.Salary += Number(income)
            break;
        case 'etc2':
            re2.etc2 += Number(income)
            break;
    }
    fs.writeFileSync('./record2.json', JSON.stringify(re2));
    res.redirect('/')
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/static'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    fs.readFile(__dirname + "/static/main.html", 'utf8', (err, page) => {
        res.send(page)
    })
})

app.get('/login', (req, res) => {
    fs.readFile(__dirname + "/static/login.html", 'utf8', (err, page) => {
        res.send(page)
    })
})

app.get('/join', (req, res) => {
    fs.readFile(__dirname + "/static/join.html", 'utf8', (err, page) => {
        res.send(page)
    })
})

let info = []

app.post('/join', (req, res) => {
    { id: req.body.id }
    { pw: req.body.pw }

    res.redirect('/login')
})

app.post('/login', (req, res) => {
    if (req.body.id == req.body.id && req.body.pw == req.body.pw) {
        res.redirect('/')
    }
    else res.send('error')
    console.log(req.body.id)
})

app.listen(3000, () => {
    console.log("Start main server")
})


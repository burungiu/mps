const express = require('express')
const app = express()
var jwt    = require('jsonwebtoken');
var url = require('url');

const bodyParser  = require('body-parser');
// Set directory to contain the templates ('views')
app.use(express.static(__dirname + '/views'));

// Set view engine to use
app.set('view engine', 'html');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'x-access-token,content-type');

    res.setHeader('Access-Control-Expose-Headers', 'x-access-token');

    // // Set to true if you need the website to include cookies in the requests sent
    // // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.sendFile('/root/project/views/index.html');
});

app.get('/game', (req, res) => {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	if (!url_parts.query.token)
		return res.redirect('/');
	jwt.verify(url_parts.query.token, "secret", function(err, decoded) {
		if(err) {
			res.send("Invalid token");
		}
		if (decoded) {
			res.sendFile("/root/project/views/pagina2.html");
		}
	});
});
app.post('/login', (req, res) => {
	console.log(req.body.token);
	if (req.body.token === '1q2w')
	{const payload = {
        	exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), //24 hours
     	 };
      	var token = jwt.sign(payload, "secret");
	res.send(token);
	} else {

		res.send(401);
	}
});

app.listen(3001, function () {
  console.log('bla Example app listening on port 3000!')
})

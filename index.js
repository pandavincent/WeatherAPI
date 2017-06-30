var express = require('express')
var request = require('request');
var bodyParser = require('body-parser');

var app = express()
app.use(bodyParser.json());

app.post('/', function (req, res) {
    
    var city = req.body.city;
    var human = req.body.human;
    var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q='+ city +'&APPID=cfa94708b86ff0f2e1992cbd2c72c479';

    request(requestUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // parse the json result
            var result = JSON.parse(body);

            // convert temp from kelvin to celsius
            var temp = parseInt(result.main.temp - 273.15, 10);

            var pressure = result.main.pressure;
            var humidity = result.main.humidity;

            var result;
            if (temp > -40 && temp <= 20) {
                result = city + ' temperature is (Celsius): ' + temp + '. It is suitable for kids. ' +
                'Pressure (mb) is: ' + pressure + '. ' + 
                'Humidity (%) is: ' + humidity + '. ' +
                'Enjoy your ride with Mercedes-Benz!';
            } else if (temp > 20 && temp <= 40) {
            	result = city + ' temperature is (Celsius): ' + temp + '. It is suitable for adults. ' +
                'Pressure (mb) is: ' + pressure + '. ' + 
                'Humidity (%) is: ' + humidity + '. ' +
                'Enjoy your ride with Mercedes-Benz!';
            } else if (temp > 40 && temp < 60) {
            	result = city + ' temperature is (Celsius): ' + temp + '. It is suitable for seniors. ' +
                'Pressure (mb) is: ' + pressure + '. ' + 
                'Humidity (%) is: ' + humidity + '. ' +
                'Enjoy your ride with Mercedes-Benz!';
            } else {
            	result = 'not suitable for human. stay safe!';
            }
            res.json({ response: result });

        } else {
           	console.log(error, response.statusCode, body);
        }
        res.end("");
    });
})

app.listen(3000, function () {
  console.log('Weather app listening on port 3000!')
})
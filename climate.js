// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Tessel - Climate Module Test
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var tessel = require('tessel');
var climatelib = require('climate-si7020');
var climate = climatelib.use(tessel.port['B']);

climate.on('ready', function(){
  console.log("Connected to si7020");
  setInterval(function(){
    climate.readHumidity(function(err, humid){
      climate.readTemperature('f', function(err, temp){
        console.log('Degrees:', temp.toFixed(4) + 'F', 'Humidity:', humid.toFixed(4) + '%RH');
      });
    });
  }, 1000);
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});

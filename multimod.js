// Multiple Modules
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Initialize Modules
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var tessel = require('tessel');
var accel  = require('accel-mma84').use(tessel.port['D']);

var xdata  = [0.00,0.00,0.00,0.00,0.00];
var ydata  = [0.00,0.00,0.00,0.00,0.00];
var zdata  = [0.00,0.00,0.00,0.00,0.00];
var xsum   = 0.0;
var ysum   = 0.0;
var zsum   = 0.0;
var xavg   = 0.0;
var yavg   = 0.0;
var zavg   = 0.0;
var xtemp  = 0.0;
var ytemp  = 0.0;
var ztemp  = 0.0;
var x      = 0;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

accel.on('ready', function () {
  accel.setOutputRate(1.56, function rateSet() {
  accel.on('data', function (xyz) {

	console.log('x:', xyz[0].toFixed(2),
				'y:', xyz[1].toFixed(2),
				'z:', xyz[2].toFixed(2));

	xtemp = ((Math.round(xyz[0] * 1000)) / 1000);
	xdata.push(xtemp);
	xdata.shift();
	xsum = 0.0;
	for (x = 0 ; x < xdata.length ; x++) {
	  xsum += xdata[x];
	}
	xavg = xsum / x;
 
 	if (Math.abs((xtemp / xavg)) > 0.85 && Math.abs((xtemp / xavg)) < 1.15) {
 	  console.log('X At Rest');
 	}
 	else {
 	  console.log('X Moving');
 	}

	ytemp = ((Math.round(xyz[1] * 1000)) / 1000);
	ydata.push(ytemp);
	ydata.shift();
	ysum = 0.0;
	for (x = 0 ; x < ydata.length ; x++) {
	  ysum += ydata[x];
	}
	yavg = ysum / x;
 
 	if (Math.abs((ytemp / yavg)) > 0.85 && Math.abs((ytemp / yavg)) < 1.15) {
 	  console.log('Y At Rest');
 	}
 	else {
 	  console.log('Y Moving');
 	}

	ztemp = ((Math.round(xyz[2] * 1000)) / 1000);
	zdata.push(ztemp);
	zdata.shift();
	zsum = 0.0;
	for (x = 0 ; x < zdata.length ; x++) {
	  zsum += zdata[x];
	}
	zavg = zsum / x;
 
 	if (Math.abs((ztemp / zavg)) > 0.85 && Math.abs((ztemp / zavg)) < 1.15) {
 	  console.log('Z At Rest');
 	}
 	else {
 	  console.log('Z Moving');
 	}

   	});
  });
});

accel.on('error', function(err){
  console.log('Error:', err);
});

//climate.on('ready', function(){
//  console.log("Connected to si7020");
//  setInterval(function(){
//    climate.readHumidity(function(err, humid){
//      climate.readTemperature('f', function(err, temp){
//        console.log('Degrees:', temp.toFixed(4) + 'F',
//        			'Humidity:', humid.toFixed(4) + '%RH');
//      });
//    });
//  }, 1000);
//});

//climate.on('error', function(err) {
//  console.log('error connecting module', err);
//});


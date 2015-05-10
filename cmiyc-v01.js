// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Catch Me If You Can v01 (CMIYC)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
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

var xmoving = false;
var ymoving = false;
var zmoving = false;
var moving  = false;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

accel.on('ready', function () {
  accel.setOutputRate(1.56, function rateSet() {
  accel.on('data', function (xyz) {

//	console.log('x:', xyz[0].toFixed(4),
//				'y:', xyz[1].toFixed(4),
//				'z:', xyz[2].toFixed(4));

	xtemp = ((Math.round(xyz[0] * 1000)) / 1000);
	xdata.push(xtemp);
	xdata.shift();
	xsum = 0.0;
	for (x = 0 ; x < xdata.length ; x++) {
	  xsum += xdata[x];
	}
	xavg = xsum / x;
 
 	if (Math.abs((xtemp / xavg)) > 0.90 && Math.abs((xtemp / xavg)) < 1.10) {
 	  xmoving = false;
// 	  console.log('X - False');
 	}
 	else {
 	  xmoving = true;
// 	  console.log('X - True');
 	}

	ytemp = ((Math.round(xyz[1] * 1000)) / 1000);
	ydata.push(ytemp);
	ydata.shift();
	ysum = 0.0;
	for (x = 0 ; x < ydata.length ; x++) {
	  ysum += ydata[x];
	}
	yavg = ysum / x;
 
 	if (Math.abs((ytemp / yavg)) > 0.90 && Math.abs((ytemp / yavg)) < 1.10) {
 	  ymoving = false;
// 	  console.log('Y - False');
 	}
 	else {
 	  ymoving = true;
// 	  console.log('Y - True');
 	}

	ztemp = ((Math.round(xyz[2] * 1000)) / 1000);
	zdata.push(ztemp);
	zdata.shift();
	zsum = 0.0;
	for (x = 0 ; x < zdata.length ; x++) {
	  zsum += zdata[x];
	}
	zavg = zsum / x;
 
 	if (Math.abs((ztemp / zavg)) > 0.90 && Math.abs((ztemp / zavg)) < 1.10) {
 	  zmoving = false;
// 	  console.log('Z - False');
 	}
 	else {
 	  zmoving = true;
// 	  console.log('Z - True');
 	}

 	if (xmoving || ymoving || zmoving) {
 	  console.log("Moving")
 	}
 	else {
 	  console.log("Stopped")
 	}

   	});
  });
});

accel.on('error', function(err){
  console.log('Error:', err);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 



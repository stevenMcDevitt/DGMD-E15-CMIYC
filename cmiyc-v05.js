// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Catch Me If You Can v05 (CMIYC)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var tessel = require('tessel');
var accel  = require('accel-mma84').use(tessel.port['D']);
var gps    = require('gps-a2235h').use(tessel.port['C']);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// GPS Debug - 1 for Debug Logs, 2 for Raw NMEA Messages
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

gps.debug = 0;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

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

var shareLocationEntropy = false;
var gpsActive = false;
var currentLatitude = '';
var currentLongitude = '';
var currentTimeStamp = '';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Acceleromter processing to determine if moving or stopped
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

accel.on('ready', function () {
  accel.setOutputRate(1.56, function rateSet() {
    accel.on('data', function (xyz) {

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
    }
    else {
      xmoving = true;
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
    }
    else {
      ymoving = true;
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
    }
    else {
      zmoving = true;
    }

    if (xmoving || ymoving || zmoving) {
      moving = true;
  	}
 	  else {
      moving = false;
    }
    });
  });
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

gps.on('ready', function () {
  console.log('GPS module powered and ready. Waiting for satellites...');

  if (gps.getPollTime() !== 2000) {
  	console.log('Not Default - The value is:', gps.getPollTime());
  	exitStatus = 1;
  } else {
  	console.log('Default: 2000');
  }
  
  gps.on('coordinates', function (coords) {
  	gpsActive        = true;
  	currentLatitude  = coords.lat;
  	currentLongitude = coords.lon;
  	currentTimeStamp = coords.timestamp;
    console.log('Lat:', coords.lat, '\tLon:', coords.lon, '\tTimestamp:', coords.timestamp);
  });

  gps.on('fix', function (data) {
    console.log(data.numSat, 'fixed.');
  });

  gps.on('dropped', function(){
  	gpsActive = false;
    console.log("gps signal dropped");
  });
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

accel.on('error', function(err){
  console.log('Accelerometer Error:', err);
});

gps.on('error', function(err){
  console.log("GPS Error:", err);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var shareInterval      = 15000;
var shareLocationCount = 0;

var shareLocationInterval = setInterval(shareLocation, shareInterval);

function shareLocation()
{
  shareLocationCount += 1;
  shareInterval = Math.floor(((Math.random() * 150) * 1000));

  clearInterval(shareLocationInterval);

  shareLocationInterval = setInterval(shareLocation, shareInterval);

  if (shareLocationCount > 10) {
  	stopSharingLocation();
  }

  console.log("shareLocation - " + shareLocationCount + " - " + shareInterval)
}

function stopSharingLocation() {
  clearInterval(shareLocationInterval);
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 



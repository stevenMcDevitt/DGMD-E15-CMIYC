var tessel = require('tessel');

var led1 = tessel.led[0].output(0);
var led2 = tessel.led[1].output(1);
var led3 = tessel.led[2].output(0);
var led4 = tessel.led[3].output(1);

var counter = 0;


setInterval(function() {
	console.log("Blinking - " + counter);
	led1.toggle();
	led2.toggle();
	led3.toggle();
	led4.toggle();
	counter++;
}, 1000);

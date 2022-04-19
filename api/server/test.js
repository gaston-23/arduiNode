

const five = require('johnny-five'); 
const board = new five.Board(); 
board.on(`ready`, () => { 
  const led = new five.Led(13); 
  led.blink(500); 
  let sensorLevel = 0
  const sensor = new five.Light("A3");
  const led9 = new five.Led(9);
  led9.on();
  

  sensor.on("change", function () {
    // console.log(this.level);
    sensorLevel = this.level;
    // led9.strobe(100);
    led9.brightness(sensorLevel*255);
  })

  
  // led9.brightness(sensorLevel);
  setInterval(() => {
    console.log('nivel ',sensor.level);
    
  }, 1000);
 }); 


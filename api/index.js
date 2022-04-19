import express from 'express';
import cors from 'cors';

import MainRoutes from './server/routes/MainRoutes';
// import {Led} from 'johnny-five/lib/led';
import bodyParser from 'body-parser';
// const express = require('express');
// const cors = require('cors');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const five = require('johnny-five'); 
let board = new five.Board(); 

const port = process.env.PORT || 5000;

// app.use('/', MainRoutes);
// when a random route is inputed
app.get('*', (req, res) => {
	res.status(200).send({
		message: 'ArduiNODE API v1.0'
	});
});

app.get('/blink', function () {
    // board.call('blink');
    // board.call('getSensor');
})



const server = app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});

var io = require('socket.io')(server, {
  pingInterval: 10000,
	pingTimeout: 50000,
	cookie: false,
  perMessageDeflate: {
      threshold: 3276800
  },
  // cors: {
  //   origin: "http://localhost:8080",
  //   methods: ["GET", "POST"]
  // }
});




board.on(`ready`, () => { 
  let sensorLevel = 0
  const sensor = new five.Light("A3");
  // var led13 = new five.Led(13);
  let leds = [
    {
      ledN: 9,
      led : new five.Led(9)
    },
    {
      ledN: 10,
      led : new five.Led(10)
    },
    {
      ledN: 11,
      led : new five.Led(11)
    },
    {
      ledN: 13,
      led : new five.Led(13)
    }
  ]
  
  io.on('connection', (socket)=>{
    console.log('a user connected');

    

    sensor.on("change", function () {
      sensorLevel = this.level;
      // console.log(sensorLevel);
      io.to('listenLight').emit('light', sensorLevel);
      // led13.blink();
    })

    socket.on('listenLight', () => {
      let room = 'listenLight';
      socket.join(room);
      io.to(room).emit('light', 0);
      // setInterval(() => {

      //   io.to('listenLight').emit('light', Math.random());
      // }, 800);
    });
    socket.on('changeLed', (ledN,status) => {
      let luz = 'led'+ledN;
      socket.join(luz);
      console.log('Led ',ledN, ' changed to status ',status);
      io.to(luz).emit('changeLed',ledN,status);
      const auxLed = leds.filter(l => l.ledN == ledN)[0].led;
      
      switch (status) {
        case 0:
          auxLed.off();
          break;
        case 1:
          auxLed.on();
          break;
        case 2:
          auxLed.blink();
          break;
        case 3:
          auxLed.pulse();
          break;
        case 4:
          auxLed.strobe();
          break;
        default:
          auxLed.fade(status,1000);
          break;
      }
      io.to(luz).emit('led',`Bienvenido a led${ledN}`);
    });
  });
  
  
  // led9.brightness(sensorLevel);
  // setInterval(() => {
  //   console.log('nivel ',sensor.level);
    
  // }, 1000);
 }); 

//  board.on(`blink`, () => {
//     const led = new five.Led(13); 
//     led.blink(500); 
//  })
app.socketio= io;

export default app;
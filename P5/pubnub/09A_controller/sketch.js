/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * remote controller that sends a variable to all the listening devices
 */

// server variables

var dataServer;
var pubKey = 'pub-c-a705a585-4407-4f88-8b83-ac846c45e13a';
var subKey = 'sub-c-64587bc8-b0cf-11e6-a7bb-0619f8945a4f';

//input variables

var nextButton;
var slideNumber=0;
var totalImages = 4;


//name used to sort your messages. used like a radio station. can be called anything
var channelName = "powerpoint";

function setup() 
{
  getAudioContext().resume();
  createCanvas(windowWidth, windowHeight);
  background(255);
  
  

   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });
  

  //create the button
 
  sendButton = createButton('NEXT');
  sendButton.position(0, 0);
  sendButton.mousePressed(sendTheMessage);
  sendButton.size(windowWidth,windowHeight);

}

function draw() 
{


}


//sends from the button press
function sendTheMessage() 
{

slideNumber = ((slideNumber+1)<=(totalImages-1)) ? slideNumber+=1 : 0; //shorthand for conditional assignment


//console.log(slideNumber);

  //publish the number to everyone.
  dataServer.publish(
    {
      channel: channelName,
      message: 
      {
        slide: slideNumber       
      }
    });

}



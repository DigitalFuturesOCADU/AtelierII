/*

Blank pubnub sketch
 */

// server variables

var dataServer;
var pubKey = 'xxxxxxxxx';
var subKey = 'xxxxxxxxx';


//size of the active area
var cSizeX = 900;
var cSizeY = 600;

//name used to sort your messages. used like a radio station. can be called anything
var channelName = "messageChannel";

function setup() 
{
  getAudioContext().resume();
  createCanvas(cSizeX, cSizeY);
  background(255);
  
  

   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });
  
  //attach callbacks to the pubnub object to handle messages and connections
  dataServer.addListener({ message: readIncoming});
  dataServer.subscribe({channels: [channelName]});


}

function draw() 
{


}


///uses built in mouseClicked function to send the data to the pubnub server
function mouseClicked() {
 

  // Send Data to the server to draw it in all other canvases
  dataServer.publish(
    {
      channel: channelName,
      message: 
      {
        messageText: "testText"       //get the value from the text box and send it as part of the message   
      }
    });

}

function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  
  // simple error check to match the incoming to the channelName
  if(inMessage.channel == channelName)
  {

    console.log(inMessage.message.messageText);
  }
}


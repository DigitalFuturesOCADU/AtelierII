/*

Reads data from Unity and displays the current status of the player
 */

// server variables

var dataServer;
var subKey = 'sub-c-64587bc8-b0cf-11e6-a7bb-0619f8945a4f';
var channelName = "cursors";


//size of the active area
var cSizeX = 900;
var cSizeY = 600;

//name used to sort your messages. used like a radio station. can be called anything
var channelName = "scores";

function setup() 
{
  getAudioContext().resume();
  createCanvas(cSizeX, cSizeY);
  background(255);
  
  

   // initialize pubnub
  dataServer = new PubNub(
  {
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


function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  background(255);

  //uses the status parameter = 1 when entering trigger 0 when exiting to only show when set and clear on exit
  if(inMessage.message.status==1)
  {
    noStroke();
    fill(0);  //read the color values from the message
    textSize(80);
    //write out the text from the message sent from unity
    text(inMessage.message.who+" has "+inMessage.message.totalHits+" hits!", 5, height/2);
  }


    

}


/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Basic PubNub example for sending messages to the other browser sessions that are open
 * Enter text into the textbox and hit Post Message
 * The text is sent to all open sessions, the size and location of the text is randomized for each browser locally 
 */

// server variables

var dataServer;
var pubKey = 'pub-c-a705a585-4407-4f88-8b83-ac846c45e13a';
var subKey = 'sub-c-64587bc8-b0cf-11e6-a7bb-0619f8945a4f';

//input variables
var sendText;
var whoAreYou;
var sendButton;
var filterText;

//size of the active area
var cSizeX = 900;
var cSizeY = 600;

//name used to sort your messages. used like a radio station. can be called anything
var channelName = "whoSaysStuff";

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
  dataServer.addListener({ message: readIncoming });
  dataServer.subscribe({channels: [channelName]});

  //create the text fields for the message to be sent
  whoAreYou = createInput('Write Your Name');
  whoAreYou.position(5,height);


  sendText = createInput('Write A Message');
  sendText.position(5,height+30);

  sendButton = createButton('Post Message');
  sendButton.position(sendText.x + sendText.width,height+30);
  sendButton.mousePressed(sendTheMessage);



}

function draw() 
{


}


///uses built in mouseClicked function to send the data to the pubnub server
function sendTheMessage() {
 

  // Send Data to the server to draw it in all other canvases
  dataServer.publish(
    {
      channel: channelName,
      message: 
      {
        who: whoAreYou.value(),
        messageText: sendText.value()       //get the value from the text box and send it as part of the message   
      }
    });

}

function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  
  // simple error check to match the incoming to the channelName
  if(inMessage.channel == channelName)
  {
    background(255);
    noStroke();
    fill(0);  //read the color values from the message
    textSize(30)
    text((inMessage.message.who+" says "+inMessage.message.messageText), 5, height/2);
  }
}


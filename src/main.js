// console.log("Hello, World")

import React from 'react';
import ReactDOM from 'react-dom';
import 'KYC-Chain Front-End/styles.css'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { useQuery } from '@apollo/react-hooks'

/*
andrew's price grab function
*/

const initialize = () => {
  const onboardButton = document.getElementById('walletconnectbutton');

  //Created check function to see if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const MetaMaskClientCheck = () => {
    //Now we check to see if MetaMask is installed
    if (!isMetaMaskInstalled()) {
      //If it isn't installed we ask the user to click to install it
     onboardButton.innerText = 'Click here to install MetaMask!';
     //When the button is clicked we call this function
     onboardButton.onclick = onClickInstall;
     //The button is now disabled
     onboardButton.disabled = false;
    } else {
      //If MetaMask is installed we ask the user to connect to their wallet
      onboardButton.innerText = 'Connect';
      //When the button is clicked we call this function to connect the users MetaMask Wallet
      onboardButton.onclick = onClickConnect;
      //The button is now disabled
      onboardButton.disabled = false;
    }
  };

  //We create a new MetaMask onboarding object to use in our app
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

  //This will start the onboarding proccess
  const onClickInstall = () => {
    onboardButton.innerText = 'Onboarding in progress';
    onboardButton.disabled = true;
    //On this object we have startOnboarding which will start the onboarding process for our end user
    onboarding.startOnboarding();
  };

  const onClickConnect = async () => {
    try {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error(error);
    }
  };

  MetaMaskClientCheck();
};

function getcurrentprice_function()
{
}

function swap_function()
{
}


function notification_function()
{
}

return(

    <head>
      <meta charset="utf-8">
      <title>SafeStop</title>
      <link rel = "stylesheet" href = "styles.css">
      <meta name = "viewport" content = "width=device-width, initial-scale = 1.0">
      <style>

      input[type=text]{
        background-color: #1a1f29;
        height: 30px;

        text-decoration: none;
        font-family: 'Verdana', sans-serif;
        font-weight: 15px;
        color: white;


        border: 1px solid white;
        border-radius: 10px;
      }

    </style>

    </head>

    <body>

      //<div id="root"></div>

      <div class = "headbox">
        <div class = "buttons">
          <a href="#" class = "homebutton">Home</a>
        //*<div class = "homebutton">
          //<input type = "submit" value = "Home"></div>*/


          /*<a href="#" class = "swapbutton">Swap</a>
          <a href="#" class = "chartsbutton">Charts</a>*/

          <a href="#" class = "walletconnectbutton">Connect to Wallet</a>
          <!--<button onclick="getElementById('demo').innerHTML=connect_wallet()"> Connect to Wallet </button>-->


        </div>

        /*<div class = "swapbutton">
          <input type = "submit" value = "Swap"></div>
        <div class = "chartsbutton">
          <input type = "submit" value = "Charts"></div>
        <div class = "walletconnectbutton">
          <input type = "submit" value = "Connect to a Wallet"></div>*/


          <div class = "headboxcontents1-1">

            <div class = "headboxcontents1-2">
              <label>Contract<label>
                <div class = "form">

                  <label for = "name" class = "label-name">
                    <span class ="content-name">Contract</span>

                    <input type = "text" placeholder="paste address" name = "name" autocomplete="off" required />

                  </label>

                </div>

                </div>


          </div>


        </div>



      </div>

      <div class = "mainbox">

        <div class = "mainboxcontents1">
          <label>Swap<label> </div>


        <div class = "mainboxcontents2">
          <div class = "mainboxcontents2-1">
              <label>Current Price<label></div>

            <div class = "mainboxcontents2-2">
              <input type = "text" inputmode = "numeric" placeholder=" 0.0"></div>

            <div class = "mainboxcontents2-3">
                <label>Token Icon<label></div>

        </div>


        <div class = "mainboxcontents3">
          <div class = "mainboxcontents3-1"><p>&#8595;<p></div>
        </div>


        <div class = "mainboxcontents4">
            <div class = "mainboxcontents4-1">
              <label>Alert Price<label>
            <div class = "mainboxcontents4-2">
              <input type = "text" inputmode = "numeric" placeholder=" 0.0"></div>

          </div>

          <div class = "mainboxcontents4-3">
              <label>ETH<label></div>

        </div>

          <div class = "mainboxcontents5">
            <form action="/action_page.php">
              <div class = "buttons">
               <label for="vol"> Percent to Swap (0-100):</label>
               <input type="range" id="vol" name="vol" min="0" max="100">
               <a href="#" class = "finalbutton">Connect to Wallet / Execute Swap</a>
             </form>

            <div>
        </div>
  </div>


    </body>
)

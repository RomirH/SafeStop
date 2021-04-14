import React, { useEffect } from 'react'
import './styles.css'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import uniswapLogo from '../uniswap-logo.png'
import daiLogo from '../dai-logo.png'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
  }),
  fetchOptions: {
    mode: 'no-cors'
  },
  cache: new InMemoryCache()
})

const TOKEN_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`

const ETH_PRICE_QUERY = gql`
  query bundles {
    bundles(where: { id: "1" }) {
      ethPrice
    }
  }
`

/*
<h2>
                  Dai price:{' '}
                  {ethLoading || daiLoading
                    ? 'Loading token data...'
                    : '$' +
                      // parse responses as floats and fix to 2 decimals
                      (parseFloat(daiPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
                </h2> */

function App() {
  /*example token grab */
  let token = ""
  document.addEventListener('paste', (event) => {
    token = document.getElementById("contract").value
    console.log(token)
    });


  if(token != ""){

    /*
    This isn't how you're actually going to do it. The token var declared above is local not global, will never be changed
    from a value of "" (empty) outside that listener
    */
    const { loading: ethLoading, data: ethPriceData } = useQuery(ETH_PRICE_QUERY)
    const { loading: tokenLoading, data: tokenData } = useQuery(TOKEN_QUERY, {
      variables: {
        tokenAddress: "0x8ab7404063ec4dbcfd4598215992dc3f8ec853d7"
      }
    })
    const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice
    const tokenPriceInUSD = tokenData && tokenData.tokens[0].derivedETH * ethPriceData
    console.log(tokenPriceInUSD)
    document.getElementById('curr-price').textContent = tokenPriceInUSD
  }


  return (

      <div>
        <nav className="navbar fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4 style= {{color: "white"}}>SafeStop</h4>
          </a>

          <div class = "button">
            <button type = "button" onclick = "MetaMaskClientCheck()">Connect to Wallet</button>
          </div>
          </nav>




          <body>


                <div class = "headboxcontents1-1">
                  <div class = "headboxcontents1-2">
                    <label>Contract</label>

                    <div class = "contract">
                      <input id = "contract" placeholder="paste address" type = "text"/></div>
                      </div>
                      </div>



           <div className="container-fluid mt-5">
              <div className="row">
                <main role="main" className="col-lg-12 d-flex text-center">


            <div class = "mainbox">



              <div class = "mainboxcontents1">

                <label>Swap</label>
                </div>


              <div class = "mainboxcontents2">

                <div class = "mainboxcontents2-1">
                    <label>Current Price</label></div>

                  <div class = "mainboxcontents2-2">
                    <input id = "current" type = "text" inputmode = "numeric" placeholder=" 0.0"></input>
                    </div>

                </div>


              <div class = "mainboxcontents3">
                <div class = "mainboxcontents3-1"><p>&#8595;</p></div>
              </div>


              <div class = "mainboxcontents4">

                  <div class = "mainboxcontents4-1">
                    <label>Alert Price</label></div>

                  <div class = "mainboxcontents4-2">
                    <input id = "alert" type = "text" inputmode = "numeric" placeholder=" 0.0"></input>
                    </div>

              </div>

                <div class = "mainboxcontents5">

                  <form action="/action_page.php">
                    <div class = "buttons">
                     <button onclick = "buy_function()">Buy</button>
                     <button onclick = "sell_function()">Sell</button>
                     </div>
                   </form>

                  </div>
                </div>

                  </main>
                    </div>
                    </div>

                </body>

           </div>

  );
}

export default App

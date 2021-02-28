import React, { useEffect } from 'react'
import './App.css'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
// import uniswapLogo from '../uniswap-logo.png'
// import daiLogo from '../dai-logo.png'

/* don't know what this does 
ReactDOM.render(
  <ApolloProvider client={client}>
  <App />
  </ApolloProvider>,
  document.getElementById('root')
)
serviceWorker.register(); */

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
  }),
  fetchOptions: {
    mode: 'no-cors'
  },
  cache: new InMemoryCache()
})

// defining Uniswap query
const UNI_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`

// is this necessary?
const ETH_PRICE_QUERY = gql`
 query bundles {
   bundles(where: { id: "1" }) {
     ethPrice
   }
 }
`

function App() {
  const { loading: ethLoading, data: ethPriceData } = useQuery(ETH_PRICE_QUERY)
  const { loading: uniLoading, data: uniData } = useQuery(UNI_QUERY, {
    variables: {
      // uni token address
      tokenAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
    }
  })

  const daiPriceInEth = daiData && daiData.tokens[0].derivedETH
  const daiTotalLiquidity = daiData && daiData.tokens[0].totalLiquidity
  const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice

  // need to figure out what to include/not to include //
  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        /* <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        > */
          /* <img src={uniswapLogo} width="30" height="30" className="d-inline-block align-top" alt="" />
          &nbsp; Uniswap Explorer */
        </a>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <div>
                <img src={daiLogo} width="150" height="150" className="mb-4" alt="" />
                <h2>
                  Dai price:{' '}
                  {ethLoading || daiLoading
                    ? 'Loading token data...'
                    : '$' +
                      // parse responses as floats and fix to 2 decimals
                      (parseFloat(daiPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
                </h2>
                <h2>
                  Dai total liquidity:{' '}
                  {daiLoading
                    ? 'Loading token data...'
                    : // display the total amount of DAI spread across all pools
                      parseFloat(daiTotalLiquidity).toFixed(0)}
                </h2>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App
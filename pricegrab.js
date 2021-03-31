import React, { useEffect } from 'react'
import './App.css'
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

const TOK_QUERY = gql`
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

//token contract input called "Input Contract"
  function price_grab() {
      document.getElementById("Input Contract").addEventListener("input", getAddr)
      function getAddr(e) {
           Addr = e.target.value;
           console.log(Addr);
      }
    }

function App() {
  price_grab()
  const { loading: ethLoading, data: ethPriceData } = useQuery(ETH_PRICE_QUERY)
  const { loading: tokLoading, data: tokData } = useQuery(TOK_QUERY, {
    variables: {
        //token contract input called "Input Contract"
        tokenAddress: Addr
      }
      })

  // price of token in ethereum
  const tokPriceInEth = tokData && tokData.tokens[0].derivedETH
  // total liquidity pool of token
  const tokTotalLiquidity = tokData && tokData.tokens[0].totalLiquidity
  // price of ethereum in USD
  const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice

}
export default App
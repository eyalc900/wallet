import './App.scss'

import { useEffect, useState } from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import EmailLogin from './components/EmailLogin/EmailLogin'
import AddAccount from './components/AddAccount/AddAcount'
import Wallet from './components/Wallet/Wallet'
import ToastProvider from './components/ToastProvider/ToastProvider'
import SendTransaction from './components/SendTransaction/SendTransaction'
import useAccounts from './hooks/accounts'
import useNetwork from './hooks/network'
import useWalletConnect from './hooks/walletconnect'

// @TODO consts/cfg
const relayerURL = 'http://localhost:1934'

function App() {
  const { accounts, selectedAcc, onSelectAcc, onAddAccount } = useAccounts()
  const { network, setNetwork, allNetworks } = useNetwork()
  const { connections, connect, disconnect, requests } = useWalletConnect({
    account: selectedAcc,
    chainId: network.chainId
  })

  return (
    <ToastProvider>
      <Router>
        {/*<nav>
                <Link to="/email-login">Login</Link>
        </nav>*/}

        <Switch>
          <Route path="/add-account">
            <AddAccount relayerURL={relayerURL} onAddAccount={onAddAccount}></AddAccount>
          </Route>

          <Route path="/email-login">
            <EmailLogin relayerURL={relayerURL} onAddAccount={onAddAccount}></EmailLogin>
          </Route>

          <Route path="/wallet" component={props => Wallet({ ...props,  accounts, selectedAcc, onSelectAcc, allNetworks, network, setNetwork, connections, connect, disconnect })}>
          </Route>

          <Route path="/security"></Route>
          <Route path="/transactions"></Route>
          <Route path="/swap"></Route>
          <Route path="/earn"></Route>
          <Route path="/send-transaction">
            <SendTransaction accounts={accounts} selectedAcc={selectedAcc} network={network} requests={requests} relayerURL={relayerURL}>
            </SendTransaction>
          </Route>

          <Route path="/">
            <Redirect to="/add-account" />
          </Route>

        </Switch>
      </Router>
    </ToastProvider>
  )
}

export default App;

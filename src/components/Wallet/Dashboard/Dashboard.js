import './Dashboard.css'

import Deposit from './Deposit/Deposit'

export default function Dashboard({ selectedAcc, selectedNetwork }) {
    return (
        <section id="dashboard">
            <div id="dashboardArea">
              <Deposit selectedAcc={selectedAcc} selectedNetwork={selectedNetwork}></Deposit>
            </div>
        </section>
    )
}
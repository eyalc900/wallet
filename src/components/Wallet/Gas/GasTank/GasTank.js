import './GasTank.scss'
import { FaGasPump } from 'react-icons/fa'
import { Toggle } from 'components/common'
import { useState, useEffect } from 'react'
import { BiTransferAlt } from 'react-icons/bi'
import { GiToken } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'
import { Button, Loading } from 'components/common'
import { MdDragIndicator, MdOutlineSort } from 'react-icons/md'
import { useDragAndDrop, useCheckMobileScreen } from 'hooks'
import { getTokenIcon } from 'lib/icons'
import { formatFloatTokenAmount } from 'lib/formatters'
import { ToolTip } from 'components/common'
import { useRelayerData } from 'hooks'
import { useModals } from 'hooks'
import { GasTankBalanceByTokensModal } from 'components/Modals'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { formatUnits } from 'ethers/lib/utils'
// eslint-disable-next-line import/no-relative-parent-imports
import { getAddedGas } from '../../../SendTransaction/helpers'

const GasTank = ({ network, 
    relayerURL, 
    portfolio, 
    account, 
    userSorting, 
    setUserSorting,
    gasTankState, 
    setGasTankState 
}) => {
    const [cacheBreak, setCacheBreak] = useState(() => Date.now())
    const { showModal } = useModals()

    useEffect(() => {
        if (Date.now() - cacheBreak > 5 * 1000) setCacheBreak(Date.now())
        const intvl = setTimeout(() => setCacheBreak(Date.now()), 60 * 1000)
        return () => clearTimeout(intvl)
    }, [cacheBreak])

    const urlGetBalance = relayerURL ? `${relayerURL}/gas-tank/${account}/getBalance?cacheBreak=${cacheBreak}` : null
    const urlGetFeeAssets = relayerURL ? `${relayerURL}/gas-tank/assets?cacheBreak=${cacheBreak}` : null
    const urlGetTransactions = relayerURL ? `${relayerURL}/identity/${account}/${network.id}/transactions` : null
    const { data, isLoading } = useRelayerData(urlGetBalance)
    const feeAssetsRes = useRelayerData(urlGetFeeAssets)
    const feeAssetsPerNetwork = feeAssetsRes.data?.filter(item => item.network === network.id)
    const executedTxnsRes = useRelayerData(urlGetTransactions)
    const gasTankTxns = executedTxnsRes && executedTxnsRes.data?.txns?.length && executedTxnsRes.data?.txns.filter(item => !!item.gasTank)
    const { isBalanceLoading, tokens } = portfolio
    const sortType = userSorting.tokens?.sortType || 'decreasing'
    const isMobileScreen = useCheckMobileScreen()
    const availableFeeAssets = feeAssetsPerNetwork?.map(item => {
        const isFound = tokens?.find(x => x.address.toLowerCase() === item.address.toLowerCase()) 
        if (isFound) return isFound
        return { ...item, balance: 0, balanceUSD: 0, decimals: 0 }
    })
    const [failedImg, setFailedImg] = useState([])
    const toLocaleDateTime = date => `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    const sortedTokens = availableFeeAssets?.sort((a, b) => {
        if (sortType === 'custom' && userSorting.tokens?.items?.[`${account}-${network.chainId}`]?.length) {
            const sorted = userSorting.tokens.items[`${account}-${network.chainId}`].indexOf(a.address) - userSorting.tokens.items[`${account}-${network.chainId}`].indexOf(b.address)
            return sorted
        } else {
            const decreasing = b.balanceUSD - a.balanceUSD
            if (decreasing === 0) return a.symbol.localeCompare(b.symbol)
            return decreasing
        }
    })

    const onDropEnd = (list) => {        
        setUserSorting(
            prev => ({
                ...prev,
                tokens: {
                    sortType: 'custom',
                    items: {
                        ...prev.tokens?.items,
                        [`${account}-${network.chainId}`]: list
                    }
                }
            })
        )
    }

    const { dragStart, dragEnter, target, handle, dragTarget,drop } = useDragAndDrop('address', onDropEnd)
    const currentAccGasTankState = gasTankState.length ? 
    gasTankState.find(i => i.account === account) :
        setGasTankState([
            ...gasTankState,
            { account: account, isEnabled: false }
        ])
    const toggleGasTank = () => {
        const updatedGasTankDetails = 
            gasTankState.map(item => (item.account === account) ? 
            { ...item, isEnabled: !item.isEnabled } : item)
        setGasTankState(updatedGasTankDetails)
    }

    const openGasTankBalanceByTokensModal = () => {
        showModal(<GasTankBalanceByTokensModal data={ (data && data.length) ? data : [] }/>)
    }

    const tokenItem = (index, img, symbol, balance, balanceUSD, address, send = false, network, decimals, category, sortedTokensLength) => 
        {
            const logo = failedImg.includes(img) ? getTokenIcon(network, address) : img
                
            return (<div className="token" key={`token-${address}-${index}`}
                disabled={balanceUSD === 0}
                draggable={category === 'tokens' && sortedTokensLength > 1 && sortType === 'custom' && !isMobileScreen}
                onDragStart={(e) => {
                    if (handle.current === target.current || handle.current.contains(target.current)) dragStart(e, index)
                    else e.preventDefault();
                }}
                onMouseDown={(e) => dragTarget(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={() => drop(sortedTokens)}
                onDragOver={(e) => e.preventDefault()}
                >
                {sortedTokensLength > 1 && sortType === 'custom' && !isMobileScreen && <MdDragIndicator size={20} className='drag-handle' onClick={(e) => dragStart(e, index)} id={`${index}-handle`} />}
                <div className="icon">
                    { 
                        failedImg.includes(logo) ?
                            <GiToken size={20}/>
                            :
                            <img src={logo} draggable="false" alt="Token Icon" onError={() => setFailedImg(failed => [...failed, logo])}/>
                    }
                </div>
                <div className="name">
                    { symbol.toUpperCase() }
                </div>
                <div className="separator"></div>
                <div className="balance">
                    <div className="currency">
                        <span className="value">{ formatFloatTokenAmount(balance, true, decimals) }</span>
                        <span className="symbol">{ symbol.toUpperCase() }</span>
                    </div>
                    <div className="dollar">
                        <span className="symbol">$</span> { balanceUSD.toFixed(2) }
                    </div>
                </div>
                {
                    send ? 
                        <div className="actions">
                            <NavLink to={{
                                pathname: `/wallet/transfer/${address}`,
                                state: {
                                    gasTankMsg: "Warning: Deposits to the Gas Tank",
                                    feeAssetsPerNetwork
                                }
                            }}>
                                <Button small>Deposit</Button>
                            </NavLink>
                        </div>
                        :
                        null
                }
            </div>)
        }

    return (
        <div id="gas-tank">
            <div className='heading-wrapper'>
                <div className="balance-wrapper" style={{ cursor: 'pointer' }} onClick={openGasTankBalanceByTokensModal}>
                    <span><FaGasPump/> Gas Tank Balance</span>
                    { !isLoading ?
                        (<div>
                            <span>$ </span>{ !data ? '0.00' : data.map(({balanceInUSD}) => balanceInUSD).reduce((a, b) => a + b, 0).toFixed(2)  }
                        </div>) : 
                        <Loading /> }
                    {/* TODO: Add functionality for drag and drop */}
                    {/* <span>Drag and drop tokens here</span> */}
                </div>
                <div className='switch-wrapper'>
                    <Toggle checked={currentAccGasTankState.isEnabled} onChange={() => toggleGasTank()}/>
                    {currentAccGasTankState.isEnabled ? <span>Enabled</span> : <span>Disabled</span>}
                </div>

                <div className="balance-wrapper total-save">
                    <span>Total Save</span>
                    <div>
                        <span>$ </span>{gasTankTxns && gasTankTxns.length ? gasTankTxns.map(item => item.feeInUSDPerGas * item.gasLimit).reduce((a, b) => a + b).toFixed(2) : '0.00'}
                    </div>
                </div>
            </div>
            <div>
                <p>The Ambire Gas Tank is your special account for paying gas and saving on gas fees. By filling up your Gas Tank, you are setting aside, or prepaying for network fees. You can add more tokens to your Gas Tank at any time.</p>
                <p>Please note that only the tokens listed below are eligible for filling up your gas tank.</p>
            </div>
            <div className="sort-holder">
                <span className='title'>Available fee tokens</span>
                {sortedTokens && !isMobileScreen &&  (
                    <div className="sort-buttons">
                        <ToolTip label='Sorted tokens by drag and drop'>
                            <MdDragIndicator color={sortType === "custom" ? "#80ffdb" : ""} cursor="pointer" onClick={() => setUserSorting(prev => ({
                                ...prev,
                                tokens: {
                                    ...prev.tokens,
                                    sortType: 'custom'
                                }
                            }))} />
                        </ToolTip>
                        <ToolTip label='Sorted tokens by DESC balance'>
                            <MdOutlineSort color={sortType === "decreasing" ? "#80ffdb" : ""} cursor="pointer" onClick={() => setUserSorting(prev => ({
                                ...prev,
                                tokens: {
                                    ...prev.tokens,
                                    sortType: 'decreasing'
                                }
                            }))} />
                        </ToolTip>
                    </div>
                )}
            </div>
            <div className="list">
                { !isBalanceLoading ?
                        sortedTokens && sortedTokens?.map(({ address, symbol, tokenImageUrl, balance, balanceUSD, network, decimals }, i) =>
                            tokenItem(
                                i, 
                                tokenImageUrl = getTokenIcon(network, address), 
                                symbol, 
                                balance, 
                                balanceUSD, 
                                address, 
                                true, 
                                network, 
                                decimals, 
                                'tokens', 
                                sortedTokens.length
                                )
                            )
                        : <Loading />  }
            </div>
            <span className='title'>Transaction History</span>
            <div className="txns-wrapper">
                {
                    gasTankTxns && gasTankTxns.length ? gasTankTxns.map((item, key) => {
                        const feeTokenDetails = !data ? data.find(i => i.id === item.gasTank.assetId) : null
                        const savedGas = getAddedGas(feeTokenDetails)
                        
                        return (<div key={key} className="txns-item-wrapper">
                            <span><BiTransferAlt /></span>
                            <span>{ item.submittedAt && toLocaleDateTime(new Date(item.submittedAt)).toString() }</span>
                            <span>Gas payed: $ { (item.feeInUSDPerGas * item.gasLimit).toFixed(6) }</span>
                            <span>Saved: $ {(item.feeInUSDPerGas * savedGas).toFixed(6)}</span>
                            <span>Cashback: $ { item.gasTank.cashback && feeTokenDetails ? (formatUnits(item.gasTank.cashback.toString(), feeTokenDetails.decimals) * feeTokenDetails?.price).toFixed(6) : '0.00' }</span>
                                <a
                                    href={network.explorerUrl + '/tx/'+ item.txId}
                                    target='_blank'
                                    rel='noreferrer'
                                    onClick={e => e.stopPropagation()}
                                >
                                    <HiOutlineExternalLink size={25} />
                                </a>
                            
                        </div>)
                    }) : <p>No transactions are made via Gas Tank</p>
                }
            </div>
            <div>
                <NavLink to={{
                    pathname: `/wallet/transfer/`,
                    state: {
                        gasTankMsg: "Warning: Deposits to the Gas Tank",
                        feeAssetsPerNetwork
                    }
                }}>
                    <Button className='deposit-button' small>Deposit to gas tank</Button>
                </NavLink>
            </div>
        </div>
    )
}

export default GasTank

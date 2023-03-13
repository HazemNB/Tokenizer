import React from 'react'
import "./TokensDetails.scss";
import TokenDiv from '../Token';

const TokenData = ({ Token }) => {
    return (
        <div className="tokenDetails">
            <div className='tokenDetails_Token'>
                <TokenDiv Token={Token} />
            </div>

            <div className='tokenDetails_Stats'>
                <div>
                    <h5>{Token.template.name} #{Token.id}</h5>
                    <h5 style={{ color: "green" }}>${Token.amount}</h5>
                    {/* Token.active ? */}
                    <h5>
                        {Token.isActive ? (<span style={{ color: "green" }}>ACTIVE</span>) : (<span style={{ color: "red" }}>INACTIVE</span>)}
                    </h5>
                    <h5>Played Forward {Token.playedForwardCount == null ? "0" : Token.playedForwardCount} Times</h5>
                </div>
                <div style={{ display: "flex", flexDirection: "column", marginLeft: "auto" }}>
                    {Token.claimed ? <span style={{ color: "green" }}>CLAIMED</span> : <span style={{ color: "grey" }}>UNCLAIMED</span>}
                    {Token.redeemed ? <span style={{ color: "green" }}>REDEEMED</span> : <span style={{ color: "grey" }}>UNREDEEMED</span>}
                </div>

                <div>
                    <h5>Current Owner: </h5>
                    {
                        Token.currentOwner ? (
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <span>{Token.currentOwner.name}</span>
                                <span>{Token.currentOwner.email}</span>
                            </div>
                        ) : (
                            <span>None</span>
                        )
                    }
                    <h5>Total Owners: {Token.owners?.length == null ? "0" : Token.owners?.length}</h5>
                </div>

                <div>
                    <h5>Created At: {new Date(Token.createdAt).toLocaleDateString()}</h5>
                    <h5>Last Updated: {new Date(Token.lastUpdated).toLocaleDateString()}</h5>
                </div>

            </div>
        </div>
    )
}

export default TokenData
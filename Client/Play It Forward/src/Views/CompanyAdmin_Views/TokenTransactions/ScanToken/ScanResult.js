import React from 'react'
import TokenComapanyButtons from 'ProjectComponents/Tokens/TokenDetails/TokenComapanyButtons';
import TokenDataDiv from 'ProjectComponents/Tokens/TokenDetails/TokenData';
import SoftButton from 'components/SoftButton';

const ScanResult = ({ TokenData, setIsLoaded, setShowScan }) => {
    return (
        <div className="TokenData">
            <div className="TokenDataHeader">
                {/* <button className="btn btn-info" onClick={() => { setShowScan(true) }}>Scan Another Token</button> */}
            </div>
            <div className="TokenDataBody">
                <TokenDataDiv Token={TokenData} />
                <TokenComapanyButtons Token={TokenData} setIsLoaded={setIsLoaded} />
            </div>
            <div className="TokenDataFooter" style={{ textAlign: "center", marginTop:'1.2em' }}>
            <SoftButton variant="contained" color="dark" onClick={() => { setShowScan(true) }} style={{ width: "100%" }}>
                Scan Another Token</SoftButton>
            </div>
        </div>
    )
}

export default ScanResult
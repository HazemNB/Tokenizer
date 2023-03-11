import React from 'react'
import ReactCurvedText from 'react-curved-text'
// import BgImage from './template1.png';
import BgImage from './template4.png';
// import QRCode from 'react-qr-code';
import { QRCode } from 'react-qrcode-logo';
const Token = ({ Token }) => {
    return (
        <div className='Token' style={{ height: '1000px' }}>

            <div className='mettalicBg' style={{
                position: 'relative', top: "0px", zIndex: 0,
                background: Token.template.backgroundColor,
                borderRadius: "50%", width: "790px", height: "790px", left: "5px"
            }}>
            </div>

            <div className='PngTemplate' style={{
                //...............
                    backgroundImage: `url(${BgImage})`,
                backgroundSize: "420px 420px", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                backgroundPositionY: "183px", backgroundPositionX: "188px",
                width: "800px", height: "800px", textAlign: "center", position: "relative", bottom: "800px",
                borderRadius: "50%",
            }}>
                <div className='innerCircle' style={{
                    width: "400px", height: "400px", textAlign: "center",
                    position: "relative", left: "200px", top: "200px",
                    borderRadius: "50%", padding: '65px', zIndex: 30,
                }}>
                        <div className='QRCode' style={{ 
                            position: 'relative', bottom: "7px", right: "7px", textAlign: "center",
                            // border: "3px solid white",  borderRadius: "5px",
                            paddingBottom: "10px", paddingRight:"0px",
                            width: "286px", height: "285px", 
                        }}>

                            {/* <QRCode 
                            value={window.location.origin + "/tr/" + Token.id}
                            imageSettings={{src:"data:image/png;base64," + Token.template.image,height: 1000,width: 1000}}
                            // value={"https://www.google.com"}
                                fgColor={Token.template.qrCodeBackgroundColor} 
                                bgColor={Token.template.qrCodeColor} size={270} viewBox={`0 0 270 270`} /> */}
                            <QRCode
                                value={window.location.origin + "/tr/" + Token.id}
                                logoImage={"data:image/png;base64," + Token.template.image}
                                logoWidth={70}
                                logoHeight={70}
                                logoOpacity={0.9}
                                size={258}
                                bgColor={Token.template.qrCodeBackgroundColor}
                                fgColor={Token.template.qrCodeColor}
                                eyeRadius={5}
                                eyeFill={Token.template.qrCodeColor}
                                removeQrCodeBehindLogo={Token.template.useImage ? true : false}
                                ecLevel={Token.template.useImage ? "H" : "L"}
                            />

                        </div>
                    {
                        Token.template.useImage ?
                            <div className='Image' style={{ zIndex: 30, position: 'relative', bottom: "200px", marginRight: '1px' }}>
                                {/* <img alt={Token.template.altText} src={"data:image/png;base64," + Token.template.image} style={{ width: "80px", height: "80px" }} /> */}
                            </div>
                            : <>
                                {Token.template.altText?.length > 1 && <div className='AltText' style={{
                                    zIndex: 30, background: Token.template.backgroundColor, width: "80px", height: "80px",
                                    position: 'relative', bottom: "200px", left: "100px", textAlign: "center",
                                    padding: "5px", justifyContent: "center", alignItems: "center",
                                    color: Token.template.textColor, fontWeight: "bold",
                                }}>
                                    <span>{Token.template.altText}</span>
                                </div>}</>
                    }

                </div>
                <div className='CurvedTextTop' style={{ zIndex: 1, position: "relative", bottom: "430px", }}>

                    <ReactCurvedText style={{ fontWeight: "bold" }}
                        width={600}
                        height={600}
                        cx={300}
                        cy={335 + 95}
                        rx={230}
                        ry={225}
                        startOffset={Token.template.curvedTextTopOffset}
                        reversed={true}
                        text={Token.template.curvedTextTop ? Token.template.curvedTextTop : ""}
                        textProps={{ style: { fontSize: 36, fontWeight: "bold", color: Token.template.textColor, } }}
                        textPathProps={{ style: { fill: Token.template.textColor } }}
                        tspanProps={null}
                        ellipseProps={null}
                        svgProps={null}
                    />
                </div>
                <div className='CurvedTextBottom' style={{ zIndex: 3, position: "relative", bottom: "1028px", }}>
                    <ReactCurvedText style={{ zIndex: 2 }}
                        width={600}
                        height={800}
                        cx={300}
                        cy={340 + 95}
                        rx={240}
                        ry={235}
                        startOffset={Token.template.curvedTextBottomOffset}
                        reversed={false}
                        text={Token.template.curvedTextBottom ? Token.template.curvedTextBottom : ""}
                        textProps={{ style: { fontSize: 36, fontWeight: "bold" } }}
                        textPathProps={{ style: { fill: Token.template.textColor } }}
                        tspanProps={null}
                        ellipseProps={null}
                        svgProps={null}
                    />
                </div>

                <div className='TokenType' style={{ zIndex: 3, position: "relative", bottom: "1800px",
                    transform: "rotate(-90deg)", transformOrigin: "center",
                }}>
                    {/* <ReactCurvedText style={{ zIndex: 2 }}
                        width={1000}
                        height={800}
                        cx={367}
                        cy={480}
                        rx={300}
                        ry={1000}
                        startOffset={Token.template.tokenTypeOffset}
                        reversed={true}
                        text={Token.template.tokenType ? Token.template.tokenType.name : ""}
                        textProps={{ style: { fontSize: 32, fontWeight: "bold", } }}
                        textPathProps={{ style: { fill: Token.template.textColor } }}
                        tspanProps={null}
                        ellipseProps={null}
                        svgProps={null}
                    /> */}
                    <ReactCurvedText style={{ zIndex: 2 }}
                        width={1000}
                        height={800}
                        cx={420}
                        cy={400}
                        rx={340}
                        ry={340}
                        startOffset={Token.template.tokenTypeOffset}
                        reversed={true}                      
                        text={Token.tokenType ? Token.tokenType.name : ""} 
                        textProps={{ style: { fontSize: 32, fontWeight: "bold", } }}                        
                        textPathProps={{ style: { fill: Token.template.textColor } }}
                        tspanProps={null}
                        ellipseProps={null}
                        svgProps={null}
                    />
                </div>
                <div className='TokenId' style={{ zIndex: 3, position: "relative", bottom: "2800px", }}>
                    <ReactCurvedText style={{ zIndex: 2 }}
                        width={1000}
                        height={800}
                        cx={480}
                        cy={550}
                        rx={260}
                        ry={260}
                        startOffset={780}
                        reversed={true}
                        text={"#" + Token.number}
                        textProps={{ style: { fontSize: 32, fontWeight: "bold", color: Token.template.textColor } }}
                        textPathProps={{ style: { fill: Token.template.textColor } }}
                        tspanProps={null}
                        ellipseProps={null}
                        svgProps={null}
                    />
                </div>
            </div>
        </div>
    )
}

export default Token
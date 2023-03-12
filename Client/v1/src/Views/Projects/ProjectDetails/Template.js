import React from 'react'
import ReactCurvedText from 'react-curved-text'
// import BgImage from './template1.png';
import BgImage from './template-4.jpg';
// import QRCode from 'react-qr-code';

import { QRCode } from 'react-qrcode-logo';

const Template = ({ Template }) => {

    return (
        <div className='Template' style={{ height: '1000px' }}>

            <div className='mettalicBg' style={{
                position: 'relative', top: "0px", zIndex: 0,
                background: Template.backgroundColor,
                borderRadius: "50%", width: "790px", height: "790px", left: "5px"
            }}>
            </div>

            <div className='PngTemplate' style={{
                backgroundImage: `url(${BgImage})`,
                backgroundSize: "800px 800px", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                backgroundPositionY: "0px", backgroundPositionX: "0px",
                width: "800px", height: "800px", textAlign: "center", position: "relative", bottom: "800px",
                borderRadius: "50%",
            }}>
                <div className='innerCircle' style={{
                    width: "400px", height: "400px", textAlign: "center",
                    position: "relative", left: "200px", top: "200px",
                    borderRadius: "50%", padding: '65px', zIndex: 30,
                }}>
                    <div className='Code' 
                     style={{
                        position: 'relative', bottom: "7px", right: "7px", textAlign: "center",
                        paddingBottom: "10px",
                        width: "287px", height: "285px",
                    }}>
                        <div>
{/* 
                            <QRCode value={Template.qrCodeUrl ? Template.qrCodeUrl : "https://www.google.com"}
                                fgColor={Template.qrCodeBackgroundColor} bgColor={Template.qrCodeColor} size={250} viewBox={`0 0 250 250`} />
                         */}

                            <QRCode
                                value={Template.qrCodeUrl ? Template.qrCodeUrl : "https://www.google.com"}
                                logoImage={ Template.useImage ? 
                                    "data:image/png;base64," + Template.image : null}
                                logoWidth={50}
                                logoHeight={50}
                                removeQrCodeBehindLogo={Template.useImage}
                                logoOpacity={0.9}
                                size={258}
                                bgColor={Template.qrCodeBackgroundColor}
                                fgColor={Template.qrCodeColor}
                                eyeRadius={5}
                                ecLevel={Template.useImage ? "H" : "L"}
                            />
                        </div>
                    </div>
                    {
                        Template.useImage ?
                            <div className='Image' style={{ zIndex: 30, position: 'relative', bottom: "180px", marginRight: '1px' }}>
                                {/* <img alt={Template.altText} src={"data:image/png;base64," + Template.image} style={{ width: "80px", height: "80px" }} /> */}
                            </div>
                            : <>
                                {Template.altText?.length > 1 && <div className='AltText' style={{
                                    zIndex: 30, background: Template.backgroundColor, width: "80px", height: "80px",
                                    position: 'relative', bottom: "170px", left: "100px", textAlign: "center",
                                    padding: "5px", justifyContent: "center", alignItems: "center",
                                    color: Template.textColor, fontWeight: "bold"
                                }}>
                                    <span>{Template.altText}</span>
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
                        startOffset={Template.curvedTextTopOffset}
                        reversed={true}
                        text={Template.curvedTextTop ? Template.curvedTextTop : ""}
                        textProps={{ style: { fontSize: 36, fontWeight: "bold", color: Template.textColor, } }}
                        textPathProps={{ style: { fill: Template.textColor } }}
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
                        startOffset={Template.curvedTextBottomOffset}
                        reversed={false}
                        text={Template.curvedTextBottom ? Template.curvedTextBottom : ""}
                        textProps={{ style: { fontSize: 36, fontWeight: "bold" } }}
                        textPathProps={{ style: { fill: Template.textColor } }}
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
                        startOffset={Template.tokenTypeOffset}
                        reversed={true}
                        text={Template.tokenType ? Template.tokenType.name : ""}
                        textProps={{ style: { fontSize: 32, fontWeight: "bold", } }}
                        textPathProps={{ style: { fill: Template.textColor } }}
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
                                            startOffset={Template.tokenTypeOffset}
                                            reversed={true}
                                            text={Template.tokenType ? Template.tokenType.name : ""}
                                            // text={"TOKEN TYPE"}
                                            textProps={{ style: { fontSize: 32, fontWeight: "bold", } }}
                                            textPathProps={{ style: { fill: Template.textColor } }}
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
                        text={"#000"}
                        textProps={{ style: { fontSize: 32, fontWeight: "bold", color: Template.textColor } }}
                        textPathProps={{ style: { fill: Template.textColor } }}
                        tspanProps={null}
                        ellipseProps={null}
                        svgProps={null}
                    />
                </div>
            </div>
        </div>
    )
}

export default Template
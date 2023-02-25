import React, { useEffect, useState } from 'react'
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Swal from 'sweetalert2';
import { Dialog } from '@mui/material';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { QRCode } from 'react-qrcode-logo';
import SoftInput from 'components/SoftInput';
import TokenTypeSelector from 'ProjectComponents/Selectors/TokenTypeSelector';
import ReactCurvedText from 'react-curved-text';
import BgImage from '../template3.png';
import Slider from '@mui/material/Slider';
import CreateTemplateReq from '../../../../Requests/Templates/CreateTemplateReq';
import TokensApi from '../../../../API/TokensApi';
import "../Templates.scss"
import { useContext } from 'react';
import { UserContext } from 'App';
const index = ({ }) => {

    let User = useContext(UserContext);

    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Amount, setAmount] = useState(0);
    const [CodeColor, setCodeColor] = useState("#000000");
    const [CodeBgColor, setCodeBgColor] = useState("#FFFFFF");
    const [BackgroundColor, setBackgroundColor] = useState("#9f7928");
    const [TextColor, setTextColor] = useState("#000000");
    const [Opacity, setOpacity] = useState(100);
    const [CodeOpacity, setCodeOpacity] = useState(100);
    const [CurvedTextTop, setCurvedTextTop] = useState("");
    const [CurvedTextBottom, setCurvedTextBottom] = useState("");
    const [CurvedTextOffsetTop, setCurvedTextOffsetTop] = useState(200);
    const [CurvedTextOffsetBottom, setCurvedTextOffsetBottom] = useState(200);
    const [TokenType, setTokenType] = useState(null);
    const [TokenTypeOffset, setTokenTypeOffset] = useState(22*20);
    const [URL, setURL] = useState("");
    const [UseImage, setUseImage] = useState(false);
    const [AltText, setAltText] = useState("");
    const [ImgSrc, setImgSrc] = useState();
    
    const [BgChanged, setBgChanged] = useState(false);
    useEffect(() => {
        if(BackgroundColor != "#9f7928"){
            setBgChanged(true);
        }
    }, [BackgroundColor]);

    const saveTemplate = async () => { 
        Swal.fire({
            title: 'Creating Template',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });
        if(TokenType == null){
            Swal.fire({
                title: 'Error',
                text: "Please select a token type",
                icon: 'error',
                confirmButtonText: 'Ok',
                allowOutsideClick: true,
                didOpen: () => {
                    Swal.hideLoading()
                }
            }) 
            return;
        }

        if(User.companyId == null){
            Swal.fire({
                title: 'Error',
                text: "You are not listed in any company",
                icon: 'error',
                confirmButtonText: 'Ok',
                allowOutsideClick: true,
                didOpen: () => {
                    Swal.hideLoading()
                }
            })
            return; 
        }

        let req = new CreateTemplateReq();
        req.Id = 1;
        req.ProjectId = 1;
        req.Name = Name;
        req.Description = Description;
        req.Amount = Amount;    
        req.CompanyId = User.companyId;
        req.QrCodeColor = CodeColor;
        req.QrCodeBackgroundColor = hexStringToRGBAString(CodeBgColor, CodeOpacity);
        // req.BackgroundColor = BgChanged ? `linear-gradient(0deg, #e5e5e5 0%,${BackgroundColor} 29%)` : 'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)';
        // req.BackgroundColor = BgChanged ? `linear-gradient(0deg, ${hexStringToRGBAString("#e5e5e5", Opacity)} 0%,${hexStringToRGBAString(BackgroundColor, Opacity)} 29%)` 
        // : 'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)';
        req.BackgroundColor = BgChanged ? hexStringToRGBAString(BackgroundColor, Opacity) 
        : 'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)';
        req.TextColor = TextColor;
        req.CurvedTextTop = CurvedTextTop;
        req.CurvedTextBottom = CurvedTextBottom;
        req.CurvedTextTopOffset = CurvedTextOffsetTop;
        req.CurvedTextBottomOffset = CurvedTextOffsetBottom;
        req.TokenTypeId = TokenType?.id;
        req.TokenTypeOffset = TokenTypeOffset;
        req.QrCodeUrl = URL;
        req.UseImage = UseImage;
        req.AltText = AltText;
        let imgInput = document.getElementById("TemplateImgInput");
        //check if image is larger than 3mb
        if(imgInput?.files?.length > 0){
            if(imgInput.files[0].size > 3145728){
                Swal.fire({
                    title: 'Image too large',
                    text: "Please select an image smaller than 3mb",
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    allowOutsideClick: true,
                    didOpen: () => {
                        Swal.hideLoading()
                    }
                }) 
                return;
            }
        }
        req.Image = imgInput?.files?.length > 0 ? imgInput.files[0] : null;
        let res = await TokensApi.CreateCompanyTemplate(req);
        if(res.status.success){
            Swal.fire({
                title: 'Template Created',
                text: 'You can now create tokens using this template',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        }else{
            Swal.fire({
                title: 'Error',
                text: res.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }

    const hexStringToRGBAString = (hex, opacity) => {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        // console.log(`rgba(${r},${g},${b},${opacity / 100})`);
        return `rgba(${r},${g},${b},${opacity / 100})`;
    }


 
    return (
        <DashboardLayout >
      <DashboardNavbar /> 
   
            <div className='CreateTemplate-Body' >
                <div className='CreateTemplate-Body-Left'>
                    <div className='CreateTemplate-Body-Top-Left'>
                        <SoftTypography variant="h6" component="div">
                            Template Preview
                        </SoftTypography>
                    </div>
                    <div className='CreateTemplate-Body-Left-Bottom'>
                        <div className='TemplatePreview' style={{ //zoom out 50% 
                            zoom: "0.5",
                        }}>
                            <div className='Template' style={{height: '1000px' }}>

                            <div className='mettalicBg' style={{ position: 'relative', top: "0px", zIndex: 0,
                            // background: 'linear-gradient(0deg, rgb(229, 229, 229) 0%,rgb(121, 121, 121) 29%)', 
                            // background: `linear-gradient(0deg, #e5e5e5 0%,${BackgroundColor} 29%)`, 
                            // background: BgChanged ? `linear-gradient(0deg, ${hexStringToRGBAString("#e5e5e5", Opacity)} 0%,${hexStringToRGBAString(BackgroundColor, Opacity)} 29%)` : 'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)',
                            background: BgChanged ? `${hexStringToRGBAString(BackgroundColor, Opacity)}` : 'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)',
                            borderRadius: "50%", width:"790px", height:"790px", left:"5px"}}>
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
                                        <div className='Code' style={{
                                            position: 'relative', bottom: "7px", right: "7px", textAlign: "center",
                                            paddingBottom: "10px",
                                            width: "287px", height: "285px",
                                        }}>
                                            <div>

                                                {/* <QRCode value={URL} fgColor={CodeBgColor} bgColor={CodeColor} size={250} viewBox={`0 0 250 250`} /> */}

                                                <QRCode
                                                    value={URL}
                                                    fgColor={CodeColor}
                                                    // bgColor={CodeBgColor}
                                                    bgColor={hexStringToRGBAString(CodeBgColor, CodeOpacity)}
                                                    size={258}
                                                    logoImage={UseImage ?  ImgSrc : ""}
                                                    removeQrCodeBehindLogo={UseImage}
                                                    logoWidth={70}
                                                    logoHeight={70}
                                                    logoOpacity={0.9}
                                                    ecLevel={UseImage ? "H" : "L"}
                                                />
                                            </div>
                                        </div>
                                        {
                                            UseImage ?
                                            <div className='Image' style={{ zIndex: 30, position: 'relative', bottom: "180px", marginRight: '1px' }}>
                                                    {/* <img alt={AltText} src={ImgSrc} style={{ width: "80px", height: "80px" }} /> */}
                                                </div>
                                                : <>
                                                    {AltText.length > 1 && <div className='AltText' style={{
                                                        zIndex: 30, background: `linear-gradient(0deg, #e5e5e5 0%,${BackgroundColor} 29%)`,  width: "80px", height: "80px",
                                                        position: 'relative', bottom: "170px", left: "100px", textAlign: "center", 
                                                        padding: "5px", justifyContent: "center", alignItems: "center",
                                                        color: TextColor, fontWeight: "bold"
                                                    }}>
                                                        <span>{AltText}</span>
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
                                            startOffset={CurvedTextOffsetTop}
                                            reversed={true}
                                            text={CurvedTextTop}
                                            textProps={{ style: { fontSize: 36, fontWeight: "bold", color: TextColor, } }}
                                            textPathProps={{ style: { fill:TextColor  } }}
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
                                            startOffset={CurvedTextOffsetBottom}
                                            reversed={false}
                                            text={CurvedTextBottom}
                                            textProps={{ style: { fontSize: 36, fontWeight: "bold"} }}
                                            textPathProps={{ style: { fill:TextColor  } }}
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
                                            startOffset={TokenTypeOffset}
                                            reversed={true}
                                            text={TokenType ? TokenType.name : ""}
                                            textProps={{ style: { fontSize: 32, fontWeight: "bold",  } }}
                                            textPathProps={{ style: { fill:TextColor  } }}
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
                                            startOffset={TokenTypeOffset}
                                            reversed={true}
                                            text={TokenType ? TokenType.name : ""}
                                            // text={"TOKEN TYPE"}
                                            textProps={{ style: { fontSize: 32, fontWeight: "bold", } }}
                                            textPathProps={{ style: { fill: TextColor } }}
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
                                            textProps={{ style: { fontSize: 32, fontWeight: "bold", color:TextColor } }}                                      
                                            textPathProps={{ style: { fill:TextColor  } }}
                                            tspanProps={null}
                                            ellipseProps={null}
                                            svgProps={null}
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='CreateTemplate-Body-Right'>
                    <div className='CreateTemplate-Body-Top-Right'>
                        <SoftTypography variant="h6" component="div">
                            Template Configuration
                        </SoftTypography>
                        <SoftButton color="success" variant="gradient" onClick={() => { saveTemplate() }}>
                        save
                    </SoftButton>
                    </div>
                    <div className='CreateTemplate-Body-Right-Bottom'>

                        <div className='TemplateConfigurationName' style={{display:"flex"}}>
                            <div style={{width:"60%"}}>
                                <span>Name: </span>
                                <SoftInput type="text" onChange={(e) => { setName(e.target.value) }} />
                            </div>
                            <div style={{width:"35%",marginLeft:"5%"}}>
                                <span>Amount: </span>
                                <SoftInput type="number" onChange={(e) => { setAmount(e.target.value) }} placeholder="$"/>
                            </div>
                        </div>
                        <div className='TemplateConfigurationDescription'>
                            <span>Description: </span>
                            <SoftInput type="text" onChange={(e) => { setDescription(e.target.value) }} />
                        </div>

                        <div className='TemplateConfigurationColors'>
                            <span>Colors: </span>

                            <div className='TemplateConfigurationColor'>
                                <SoftInput type="color" value={CodeColor} onChange={(e) => { setCodeColor(e.target.value) }} />
                                <span>Code</span>
                            </div>
                            <div className='TemplateConfigurationColor'>
                                <SoftInput type="color" value={BackgroundColor} onChange={(e) => { setBackgroundColor(e.target.value) }} />
                                <span>Background</span>
                            </div>
                            <div className='TemplateConfigurationColor TemplateConfigurationColorBc'>
                                <SoftInput type="color" value={CodeBgColor} onChange={(e) => { setCodeBgColor(e.target.value) }} />
                                <span style={{fontSize:"0.9em"}}>QR-Background</span>
                            </div>
                            <div className='TemplateConfigurationColor'>
                                <SoftInput type="color" value={TextColor} onChange={(e) => { setTextColor(e.target.value) }} />
                                <span>Text</span>
                            </div>
                          <div className='col-4 TemplateConfigurationColorCode' style={{ display: "flex", flexDirection: "column", alignItems: "center",
                                //column size full row 
                                gridColumn: "1 / 3",
                                paddingLeft:"10px"
                                }}>
                                {/* opacity slider */}

                                <Slider value={Opacity} min={0} max={100} step={1} valueLabelDisplay="auto" marks={true} onChange={(e, value) => { setOpacity(value) }} />
                                <span>Opacity</span>
                            </div>
                            <div className='col-4 TemplateConfigurationColorCode' style={{ display: "flex", flexDirection: "column", alignItems: "center",
                                //column size full row 
                                gridColumn: "4 / 6",
                                paddingRight:"10px"
                                }}>
                                {/*Code opacity slider */}
                                <Slider value={CodeOpacity} min={0} max={100} step={1} valueLabelDisplay="auto" marks={true} onChange={(e, value) => { setCodeOpacity(value) }} />
                                <span>Code Opacity</span>
                            </div>
                         
                        </div>

                        <div className='TemplateConfigurationInputs'>
                            <span>Curved Text: </span>
                            <SoftInput type="text" placeholder="Top" onChange={(e) => { setCurvedTextTop(e.target.value) }} />
                            <SoftInput type="text" placeholder="Bottom" onChange={(e) => { setCurvedTextBottom(e.target.value) }} />
                            {/* <SoftInput type="number" placeholder="Size" onChange={(e) => { setCurvedTextSize(e.target.value) }} /> */}
                            <div>
                                <Slider value={CurvedTextOffsetTop / 10} min={0} max={100} step={1} valueLabelDisplay="auto" marks={true
                                } onChange={(e, value) => { setCurvedTextOffsetTop(value * 10) }} />
                                <Slider value={CurvedTextOffsetBottom / 10} min={0} max={100} step={1} valueLabelDisplay="auto" marks={true
                                } onChange={(e, value) => { setCurvedTextOffsetBottom(value * 10) }} />
                            </div>
                        </div>

                        <div className='TemplateConfigurationCode'>
                            <div className='TemplateConfigurationCodeToken'>
                                <span>Token Type: </span>
                                <TokenTypeSelector setTokenType={setTokenType} />
                                <Slider value={TokenTypeOffset / 20} min={0} max={100} step={1} valueLabelDisplay="auto" marks={true
                                } onChange={(e, value) => { setTokenTypeOffset(value * 20) }} />
                            </div>
                            <div>
                                <span>URL: </span>
                                <SoftInput type="text" placeholder="https://www.abc.com" onChange={(e) => { setURL(e.target.value) }} />
                            </div>
                        </div>

                        <div className='TemplateConfigurationImage'>
                            <div>
                                <input type="checkbox" onChange={(e) => {setUseImage(e.target.checked) }} defaultChecked={UseImage} />
                                <span>Use Image</span>
                            </div>
                            {
                                UseImage ?
                                    <div>
                                        <span>Image: </span>
                                        <SoftInput id="TemplateImgInput" type="file" accept="image/*" onChange={(e) => {
                                            setImgSrc(window.URL.createObjectURL(e.target.files[0]))
                                        }} />
                                    </div>
                                    :
                                    <div>
                                        <span>Alt Text: </span>
                                        <SoftInput type="text" placeholder="Scan me" onChange={(e) => { setAltText(e.target.value) }} />
                                    </div>
                            }
                        </div>


                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default index
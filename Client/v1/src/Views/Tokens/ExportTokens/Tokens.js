import SoftButton from 'components/SoftButton'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Token from 'Views/Projects/ProjectDetails/Token'
import * as htmlToImage from 'html-to-image'
import jsPDF from 'jspdf'
import JSZip from 'jszip'
import Tokens3D from './Tokens3D'
const Tokens = ({ Tokens }) => {

    const [TokensPerRow, setTokensPerRow] = useState(3)
    const [ColumnGap, setColumnGap] = useState(10)
    const [RowGap, setRowGap] = useState(10)
    const [TokenSize, setTokenSize] = useState(30)
    const [TokenBorderWidth, setTokenBorderWidth] = useState(0)
    const [GridTemplateColumns, setGridTemplateColumns] = useState("")
    const[Toggle,setToggle] = useState(true)
    useEffect(() => {
        let columns = ""
        for (let i = 0; i < TokensPerRow; i++) {
            columns += "1fr "
        }
        setGridTemplateColumns(columns)
    }, [TokensPerRow])

    const PrintPNG = async () => {
        let ExportDiv = document.getElementById("ExportDiv");
        let pngImage = await htmlToImage.toPng(ExportDiv);
        // download pngImage as an image
        let link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = pngImage;
        link.click();
    }
   const PrintSVG=async()=>{
    let ExportDiv = document.getElementById("ExportDiv");
        let svgImage = await htmlToImage.toSvg(ExportDiv);
        // download pngImage as an image
        let link = document.createElement('a');
        link.download = 'my-image-name.svg';
        link.href = svgImage;
        link.click();
   }
    const PrintPDF = async () => {
        let ExportDiv = document.getElementById("ExportDiv");
        let pngImage = await htmlToImage.toPng(ExportDiv);
        console.log(ExportDiv);
        let orientation = ExportDiv.clientHeight > ExportDiv.clientWidth ? "p" : "l";
        let PDF = new jsPDF(orientation, 'px',[
            ExportDiv.clientHeight,
            ExportDiv.clientWidth,
        ] );
        PDF.addImage(pngImage, 'PNG', 0, 0);
        PDF.save("my-image-name.pdf");
    }
    //     let link = document.createElement('a');
    //     link.download = 'my-image-name.png';
    //     link.href = pngImage;
    //     link.click();

    const ExportTokensAsSingleFiles = async () => {
        let _tokens = document.querySelectorAll(".tokenDiv");
        var zip = new JSZip();
        var folder = zip.folder("tokens");
       
        for (let i = 0; i < _tokens.length; i++) {
            let pngImage = await htmlToImage.toPng(_tokens[i]);
            folder.file(`token${i+1}.png`, pngImage.split(",")[1], { base64: true });
        }

        zip.generateAsync({ type: "blob" })
            .then(function (content) {

                // saveAs(content, "tokens.zip");
                let link = document.createElement('a');
                link.download = 'tokens.zip';
                link.href = URL.createObjectURL(content);
                link.click();

            });
            
    }
//Export tokens as svg
function downloadSvgZip() {
    // Assuming you have an array of SVG file paths
    const svgFiles = ['/path/to/file1.svg', '/path/to/file2.svg', '/path/to/file3.svg'];
  
    // Create a new zip file
    const zip = new JSZip();
  
    // Loop through the SVG files array and add each file to the zip file
    svgFiles.forEach((file, index) => {
      // Fetch the SVG file contents using a library like Axios or fetch
      fetch(file)
        .then((response) => response.text())
        .then((svgContent) => {
          // Add the SVG file to the zip file with a unique name
          zip.file(`file-${index + 1}.svg`, svgContent);
        });
    });
  
    // Generate the zip file
    zip.generateAsync({ type: 'blob' }).then((content) => {
      // Create a new anchor tag with a download attribute and click it to download the zip file
      const anchor = document.createElement('a');
      anchor.href = URL.createObjectURL(content);
      anchor.download = 'svg-images.zip';
      anchor.click();
    });
  }
  
const ExportTokensAsSingleFilesSvg = async () => {
 const svgFiles = ['/path/to/file1.svg', '/path/to/file2.svg', '/path/to/file3.svg'];

 const zip = new JSZip();

 svgFiles.forEach((file, index) => {
   fetch(file)
    .then((response) => response.text())
    .then((svgContent) => {
       zip.file(`file-${index + 1}.svg`, svgContent);
    });
});

 zip.generateAsync({ type: 'blob' }).then((content) => {
 
});
    
    
    
    // let _tokens = document.querySelectorAll(".tokenDiv");
    // var zip = new JSZip();
    // var folder = zip.folder("tokens");
    
    // let imagesArray = []
    // for (let i = 0; i < _tokens.length; i++) {
    //     let img = await htmlToImage.toSvg(_tokens[i]);
    //     let imgBlob = new Blob([img], {type: 'image/svg+xml'});
    //     imagesArray.push(img)
    // }
    // for(let j = 0; j < imagesArray.length; j++){
    //     folder.file(`token${j+1}.svg`, imagesArray[j], {binary: false, base64:false, compression:"STORE"});
    // }
    // let content = await zip.generateAsync({ type: "blob", compression:"STORE" });

    // let link = document.createElement('a');
    // link.download = 'tokens.zip';
    // link.href = URL.createObjectURL(content);
    // link.click();
 
 
    // let _tokens = document.querySelectorAll(".tokenDiv");
    //     var zip = new JSZip();
    //     var folder = zip.folder("tokens");
       
    //     for (let i = 0; i < _tokens.length; i++) {
    //         let svgImage = await htmlToImage.toSvg(_tokens[i]);
    //         folder.file(`token${i+1}.svg`,svgImage.split(",")[1], { base64: true });
    //     }

    //     zip.generateAsync({ type: "blob" })
    //         .then(function (content) {

    //             // saveAs(content, "tokens.zip");
    //             let link = document.createElement('a');
    //             link.download = 'tokens.zip';
    //             link.href = URL.createObjectURL(content);
    //             link.click();

    //         }); 

}

    return (
        <div>
            <div className="ExportControls">
                <div className="ExportControls__control">
                    <SoftButton color="secondary" onClick={() => setTokensPerRow(TokensPerRow - 1)}>-</SoftButton>
                    <span>{TokensPerRow} Tokens per row</span>
                    <SoftButton color="secondary" onClick={() => setTokensPerRow(TokensPerRow + 1)}>+</SoftButton>
                </div>
                <div className="ExportControls__control">
                    <SoftButton color="secondary" onClick={() => setTokenSize(TokenSize - 5)}>-</SoftButton>
                    <span>Token size: {TokenSize}%</span>
                    <SoftButton color="secondary" onClick={() => setTokenSize(TokenSize + 5)}>+</SoftButton>
                </div>
                
                <div className="ExportControls__control">
                    <SoftButton color="secondary" onClick={() => setColumnGap(ColumnGap - 1)}>-</SoftButton>
                    <span>Column gap: {ColumnGap}px</span>
                    <SoftButton color="secondary" onClick={() => setColumnGap(ColumnGap + 1)}>+</SoftButton>
                </div>
                <div className="ExportControls__control">
                    <SoftButton color="secondary" onClick={() => setRowGap(RowGap - 1)}>-</SoftButton>
                    <span>Row gap: {RowGap}px</span>
                    <SoftButton color="secondary" onClick={() => setRowGap(RowGap + 1)}>+</SoftButton>
                </div>
                <div className="ExportControls__control">
                    <SoftButton color="secondary" onClick={() => setTokenBorderWidth(TokenBorderWidth - 1)}>-</SoftButton>
                    <span>Token border width: {TokenBorderWidth}px</span>
                    <SoftButton color="secondary" onClick={() => setTokenBorderWidth(TokenBorderWidth + 1)}>+</SoftButton>
                </div>
                <div className="ExportControls__printbuttons">
                <SoftButton color="secondary" onClick={() => PrintSVG()}>SVG</SoftButton>

                <SoftButton color="secondary" onClick={() => PrintPNG()}>PNG</SoftButton>
              <SoftButton color="secondary" onClick={() => downloadSvgZip()}>Export as single files SVG</SoftButton>       

                <SoftButton color="secondary" onClick={() => ExportTokensAsSingleFiles()}>Export as single files</SoftButton>
                <SoftButton color="secondary"    onClick={() => setToggle(!Toggle)}>Toggle 3d</SoftButton>
                </div>

            </div>

            <div id="ExportDiv" className="TokensToExport" style={{ display:"grid",
            gridTemplateColumns: GridTemplateColumns, 
            border: "1px solid black", width: "fit-content", paddingBottom: "20%", paddingLeft: "20px", paddingRight: "20px",
            gridColumnGap: `${ColumnGap}px`, gridRowGap: `${RowGap}px` }}>
                {Tokens.map((token, index) => {
                    return (
                        <div key={index} className="Token" style={{zoom: `${TokenSize}%`, 
                        border: `${TokenBorderWidth}px solid black`,
                        borderRadius: "15px", padding: "0 10px",
                        height: "90%", alignContent: "center", justifyContent: "center", display: "flex"
                        }}>
                            <div className='tokenDiv' style={{position: "relative", bottom:"140px"}}>
                            {Toggle?<Token Token ={token} />:<Tokens3D Token={token}/>}        
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default Tokens
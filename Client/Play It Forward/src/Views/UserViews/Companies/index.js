import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React from 'react';
 import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';

  const index = () => {
    const options = {
        margin: 30,
        responsiveclassName: true,
        nav: true,
        autoplay: false,
    
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
          
          
            700: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        },
      };
  return (
    <DashboardLayout>
    <DashboardNavbar />
    <div>
  
<OwlCarousel classNameName="slider-items owl-carousel" {...options} >
                      <div className="item" style={{height:"400px",border:"1px solid #000",background:"#ddd"}}> 
                  <span style={{position:"absolute" , left:"50%",top:"50%",transform:"Translate(-50%,-50%)"}}>     Hello</span>
                       </div>
                       <div className="item" style={{height:"400px",border:"1px solid #000",background:"#ddd"}}> 
                  <span style={{position:"absolute" , left:"50%",top:"50%",transform:"Translate(-50%,-50%)"}}>     Hello</span>
                       </div>
                       <div className="item" style={{height:"400px",border:"1px solid #000",background:"#ddd"}}> 
                  <span style={{position:"absolute" , left:"50%",top:"50%",transform:"Translate(-50%,-50%)"}}>     Hello</span>
                       </div>
                       <div className="item" style={{height:"400px",border:"1px solid #000",background:"#ddd"}}> 
                  <span style={{position:"absolute" , left:"50%",top:"50%",transform:"Translate(-50%,-50%)"}}>     Hello</span>
                       </div>
                       <div className="item" style={{height:"400px",border:"1px solid #000",background:"#ddd"}}> 
                  <span style={{position:"absolute" , left:"50%",top:"50%",transform:"Translate(-50%,-50%)"}}>     Hello</span>
                       </div>
                       <div className="item" style={{height:"400px",border:"1px solid #000",background:"#ddd"}}> 
                  <span style={{position:"absolute" , left:"50%",top:"50%",transform:"Translate(-50%,-50%)"}}>     Hello</span>
                       </div>
                       <div className="item" style={{height:"400px",border:"1px solid #000",background:"#ddd"}}> 
                  <span style={{position:"absolute" , left:"50%",top:"50%",transform:"Translate(-50%,-50%)"}}>     Hello</span>
                       </div>
                  </OwlCarousel>
</div>

     </DashboardLayout>
  )
}

export default index

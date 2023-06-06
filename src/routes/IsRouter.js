import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Page1 from "../page/Page1";
import Page2 from "../page/Page2";
import Page3Ul from "../page/Page3Ul";
import Page3Xray from "../page/Page3Xray";
import Page4 from "../page/Page4";
import Header from "../component/Header";


const IsRouter =()=>{
    return(
        <Router>
            <Header/>
            <div className='warp'>
            <Routes >
            <Route path="/" element={<Page1/>}/>
            <Route path="/page2" element={<Page2/>}/>
            <Route path="/page3_xray" element={<Page3Xray/>}/>
            <Route path="/page3_Ul" element={<Page3Ul/>}/>
            <Route path="/page4" element={<Page4/>}/>
            </Routes>
            </div>
        </Router>
    )
}

export default IsRouter
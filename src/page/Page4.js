//결과창

import { useState } from "react";


const Page4=()=>{
    const img = [
        '../img/가위.png','../img/바위.png','../img/보.png'
    ]
    const [imgCount,setImgCount] = useState(0);

    const preButton=()=>{
        if(imgCount!==0) setImgCount(imgCount-1);
        else alert('처음사진입니다.')
    };
    const nextButton=()=>{
        if(imgCount!==img.length-1) setImgCount(imgCount+1);
        else alert('마지막사진입니다.')

    };


    return(
        <div className="Page4Wrap">
        <div className="Scroll">
        <button onClick={()=>preButton()}>&lt;</button>
        <div>{imgCount+1}/{img.length}</div>
        <button onClick={()=>nextButton()}>&gt;</button>
        </div>
        <div className="ImgDis">
        <div>
                <img src={img[imgCount]} alt={img[imgCount]} className="Img"/>
        </div>
        <div className="Table">표</div>
        </div>

        </div>
    )
}

export default Page4
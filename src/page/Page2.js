 import { useNavigate } from "react-router-dom";
 
 const Page2 = ()=>{
    const navigate= useNavigate();

    const goPage3_xray=()=>{
        navigate('/page3_xray')
    }

    const goPage3_Ul=()=>{
        navigate('/page3_Ul')
    }

    const Back=()=>{
        navigate(-1)
    }

    return (
        <div>
            <button onClick={goPage3_xray} className="page3Btn">X-ray</button>
            <button onClick={goPage3_Ul} className="page3Btn">Ultrasound</button>
            <button onClick={Back} className="back">Back</button>
        </div>
    )
}

export default Page2
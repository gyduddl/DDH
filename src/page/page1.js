import { useNavigate } from "react-router-dom"

const Page1=()=>{
    const navigate=useNavigate()

    const goPage2=()=>{
        navigate('/page2')
    }


    return(
        <>
            <div>page1</div>
            <button onClick={goPage2} className="Start">Get Start</button>
        </>
        
    )
}

export default Page1
import { useNavigate } from "react-router-dom"

const Header=()=>{
    const navigate=useNavigate()

    const goPage1=()=>{
        navigate('/')
    }
    return(
        <>
            <h1 className="Header" onClick={goPage1}>DDH</h1>
        </>
        
    )
}

export default Header
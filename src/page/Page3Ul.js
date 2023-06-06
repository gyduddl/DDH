import { useNavigate } from "react-router-dom";
import {useRef, useState} from 'react' 
import {GrDropbox} from 'react-icons/gr'
import {BsBoxSeamFill} from 'react-icons/bs'

const Page3Ul=()=>{
    const navigate= useNavigate();
    const Back=()=>{
        navigate(-1)
    }

    const Submit=()=>{
        navigate('/page4')
        handleUpload()
    }

    //첨부파일
        const [Files, setFiles]= useState([]);
        const inputRef= useRef();

        const handleDragOver=(e)=>{
            e.preventDefault();
        }

        const handleDrop=(e)=>{
            e.preventDefault();
            
            // png랑 jpeg만 넣을 수 있게 하는 코드
            let image= Array.from(e.dataTransfer.files).filter((file)=>(file.type==='image/png'||file.type==='image/jpeg'))
            let alret= Array.from(e.dataTransfer.files).filter((file)=>(file.type!=='image/png'&&file.type!=='image/jpeg'))
            setFiles(image)
            console.log(alret)
            if(alret.length){
             return alert('이미지만 업로드 가능합니다.')
            }
        }

        //첨부파일 api

        const handleUpload =()=>{
            const formData= new FormData();
            formData.append('Files',Files);
            // console.log(formData.getAll())
            alert('제출')
            // api추가해야 한다. 
        }

        if(Files.length) return(<>
        <div className="dropzone2">
                <BsBoxSeamFill size='70'/>
                <h1>{Files.length} image loaded</h1>

                {/* <ul>
                    {Array.from(Files).map((file,idx)=><li key={idx}>{file.name}</li>)}
                </ul> */}
                {/* <div className="actions"> */}
                  
                {/* </div> */}
               
            </div>
            <button onClick={Back} className="back">Back</button>
            <button onClick={()=>setFiles([])}>Reset</button>
                <button onClick={Submit}>Submit</button>
        </>
            
        )


    return(
        <>
            <div
            className="dropzone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div>
                    <GrDropbox size='70'/>
                    <h1>Drop images</h1>
                    <p>or</p>
                    <h1>Click here to select them</h1>
                </div>
            <input 
                type='file'
                name="image"
                accept="image/png, image/jpeg"
                multiple
                // hidden
                onChange={e=>setFiles(e.target.files)}
                ref={inputRef}
            />
            </div>
            <button onClick={Back} className="back">Back</button>
            
        </>

    )
}

export default Page3Ul;
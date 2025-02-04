import React from 'react';
import json from '../data/test.json';

const Page1 =()=>{
    console.log(json)

    

return (
    <div>
        <input placeholder='write firstName'/>
        <input placeholder='write lastName'/>
        <input placeholder='write phoneNumber'/>
        <input placeholder='write emailAddress'/>
        <button>제출하기</button>
    </div>
)
}

export default Page1;
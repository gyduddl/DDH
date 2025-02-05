import React, { useEffect, useState } from 'react';
// import { octokit } from '../api/octokit';
import { Octokit } from '@octokit/rest';

const Page1 =()=>{
    const OCTOKIT_TOKEN = ""
    const octokit = new Octokit({
      auth: OCTOKIT_TOKEN,
    });
    // useEffect(()=>{
    //     async function fetchData() {
    //         try {
    //             const repo = await octokit.request("GET /repos/gyduddl/DDH/git/ref/heads/main");
    //             console.log(repo.data.object.sha); // 실제 데이터 출력
    //         } catch (error) {
    //             console.error("Error fetching repos:", error);
    //         }

    //     }
    //     fetchData();
    // },[])
    const url ="https://raw.githubusercontent.com/gyduddl/DDH/refs/heads/main/src/data/test.json"
    
    const [totalData, setTotalData] = useState()
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(()=>{
        async function getData(){
            const response = await fetch(url)
            const jsonData= await response.json()
            setTotalData(jsonData[0].users)
        }
        getData()
    },[])


    // useEffect(() => {
    //     // totalData가 변경될 때마다 콘솔 출력
    //     // console.log("Updated totalData:", totalData);
    //   }, [totalData]); // totalData가 변경될 때마다 실행됨

    const addNewUser = () => {
        const newUser = {
          userId: 444,
          firstName: "AAAAA",
          lastName: "as23",
          phoneNumber: "123456",
          emailAddress: "AAAAA@test.com",
          homepage: "https://amogg.tistory.com/1"
        };
    
        // 새로운 user 추가 후 상태 업데이트
        setTotalData(prevUsers => [
          newUser, 
          ...prevUsers // 기존 배열 앞에 새 사용자 추가
        ]);
        setIsUpdated(true);
      };

    const clickButton = () => {
        
        addNewUser()


    }

    const nextFunction = async() => {
        //** get reference
        const repo = await octokit.request("GET /repos/gyduddl/DDH/git/ref/heads/main",{});
        const new_branch ="featureE";
        const branch_sha = repo.data.object.sha
        //** Create a reference(브랜치 생성)
        await octokit.request('POST /repos/gyduddl/DDH/git/refs',{
            ref: `refs/heads/${new_branch}`,
            sha : branch_sha
        });
       // ** referense 생성(커밋할 내용) 
        const createBlob = await octokit.request('POST /repos/gyduddl/DDH/git/blobs',{
            content : `[{"users": ${JSON.stringify(totalData, null, 2)}}]`,
            encoding : "utf-8"
        })
        const blob_sha = createBlob.data.sha
        // ** Get a tree
        const getTree = await octokit.request(`GET /repos/gyduddl/DDH/git/trees/${new_branch}`)
        const base_tree_sha = getTree.data.sha
        //** Create a tree */
        const creatTree = await octokit.request("POST /repos/gyduddl/DDH/git/trees",{
            tree:[{
                path:'src/data/test.json',
                mode: '100644',
                type: 'blob',
                sha: blob_sha
            }],
            base_tree: base_tree_sha
        })
        const tree_sha = creatTree.data.sha
        // ** Create a commit(commit 하기)
        const commitMessage = "test1"
        const createCommit = await octokit.request("POST /repos/gyduddl/DDH/git/commits",{
            message : commitMessage,
            tree : tree_sha,
            parents : [base_tree_sha]
        })
        const commit_sha = createCommit.data.sha
        // ** Update a Reference(Push)
        await octokit.request(`PATCH /repos/gyduddl/DDH/git/refs/heads/${new_branch}`,{
            sha : commit_sha
        })
        // ** Pull request 생성하기
        const titlePR ="Test Pull Request, Success!!";
        const bodyPR = "Please pull these awesome changes in!"
        await octokit.request("POST /repos/gyduddl/DDH/pulls",{
            title : titlePR,
            body: bodyPR,
            head : new_branch,
            base : "main"
        })
    }
    
    useEffect(() => {
        if (isUpdated) { // isUpdated가 true일 때만 실행
            nextFunction()
          setIsUpdated(false); // 로그를 찍은 후 isUpdated를 false로 리셋
        }
      }, [totalData, isUpdated]); 

return (
    <div>
        <input placeholder='write firstName'/>
        <input placeholder='write lastName'/>
        <input placeholder='write phoneNumber'/>
        <input placeholder='write emailAddress'/>
        <button onClick={()=>clickButton()}>제출하기</button>
        {/* <button onClick={()=>clickhappy()}>합치기</button> */}
    </div>

)
}

export default Page1;
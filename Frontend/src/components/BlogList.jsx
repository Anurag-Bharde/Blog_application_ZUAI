
import {formatDistance} from "date-fns"
import EditPost from "./EditPost"
import { useNavigate } from "react-router-dom"


export function BlogList({post}){

const navigate=useNavigate()

    return(
        <>
            {post.map((list,index)=>(
                <div key={list._id}>
                <button style={{backgroundColor:"white"}}>
                    <h4>{list.Title}</h4>
                    <h5>{list.Post}</h5>
                    <p>{formatDistance(new Date(),list.TimePost)} ago</p>
                    <button onClick={()=>navigate(`/edit/${list._id}`)}>Edit this Blog</button>
                    </button>
                </div>
            ))}
        </>
    )
}

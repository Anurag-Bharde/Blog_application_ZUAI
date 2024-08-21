
export function BlogList({post}){
    return(
        <>
            {post.map(list=>(
                <div key={list._id}>
                    <h4>{list.Title}</h4>
                    <h5>{list.Post}</h5>
                    <p>{list.TimePost}</p>
                </div>
            ))}
        </>
    )
}








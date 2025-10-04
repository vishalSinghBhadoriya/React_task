import React, { createContext, useEffect, useState } from 'react'
export const PostsContext = createContext();

export const PostsProvider = ({children})=> {
    const [posts, setPosts]=useState([]);
    const [loading, setLoading]=useState(true);
    const[view,setView]=useState("normal");
    useEffect(()=>{
        setTimeout(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res)=>res.json())
        .then((data)=>{
            setPosts(data);
            setLoading(false);
        });
          }, 5000);

    }, []);
const removePost=(id)=>{
    setPosts((prev)=>prev.filter((p)=>p.id !==id));
};
const toggleView =()=>{
    setView((v)=> (v === "normal" ? "compact" : "normal"));
};

  return (
    <PostsContext.Provider value={{posts, loading, removePost, view ,toggleView}}>
    {children}
    </PostsContext.Provider>
  );
};
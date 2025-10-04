import React, { useContext, useState } from "react";
import { PostsContext } from "./context/PostsContext";
import "./App.css";

function App() {
  
  const { posts, loading, removePost, view, toggleView } =useContext(PostsContext);
  const { page, setPage } = useState(1);
  const [showForm, setShowForm] = useState(false);

  const perPage = 6;
  const safePage =Number(page) || 1;
  const start = (safePage -1 ) * perPage;
  const end = start + perPage;

  if (loading) {
    return <h2>Loading ...</h2>;
  }
if(!posts ||  posts.length ===0){
  return<h2>No posts found</h2>
}

const currentPosts=posts.slice(start,end);
const totalPages=Math.ceil(posts.length / perPage);

  return (
    <div>
      <div className="container">
        <div className="row-1">
          <div className="col-1">
            <h1>Hi Reader</h1>
            <p>Here's you News!</p>
            <button onClick={toggleView}>View Toggle</button>
            <button onClick={() => setShowForm(true)}>We are Listening</button>
          </div>
          <div className="col-2">
            <div>
              {currentPosts && currentPosts.map((post) => (
                <div className="post" key={post.id}>
                  <div className="post-head">
                  <h3>{post.title}</h3>
                  {view === "normal" && <p>{post.body}</p>}
                  </div>
                   <button onClick={() => removePost(post.id)}>X</button>
                </div>
               
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="paginaton">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)}>
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

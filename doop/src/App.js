import './App.css';

import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Posts, Comments } from './models';
import { generateClient } from "aws-amplify/api";
import {withAuthenticator} from '@aws-amplify/ui-react';
import {  signOut } from 'aws-amplify/auth'
import { useAuthenticatorRoute } from '@aws-amplify/ui-react-core';














function App( {user} ) {

  console.log('User:', user.username);



  const [userName, setUser] = useState ('');
  const [currentPage, setCurrentPage] = useState(0);

  const [formData, setFormData] = useState({ title: '', text: '' });


  
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);









  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await DataStore.query(Posts); // Fetch all posts from DataStore
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);



  useEffect(() => {
    const fetchComments = async () => {
      try{

        const postComment = await DataStore.query(Comments);
        setComments(postComment);
      }catch{
        console.error('Error fetching comments'. error);

      }
    }
    fetchComments();
  }, []);


  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value});
  };
 
 
const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
     
      const newPost = await DataStore.save(
        new Posts({
          Title: formData.title,
          Text: formData.content,
          username: user.username
          
          
        })
        
      );

      
      console.log('New post saved:', newPost);
      
      const updatedPosts = [...posts, newPost];
      setPosts(updatedPosts)
      localStorage.setItem('posts', JSON.stringify(updatedPosts))

      setFormData({ title: '', content: ''});

    } catch (error) {
      console.error('Error saving post:', error);
      // Handle error or display an error message to the user
    }
  };





  const handleComment = async (event, postId) => {

    try {
      const postToPost = posts.find((post) => post.id === postId)

      if(postToPost){
     
      const newComment = await DataStore.save(
        new Comments({
          text: formData.content,
          postsId: postId

        })
      );

      console.log('New comment saved:', newComment);
      
      const updatedComments = [...comments, newComment];
      setComments(updatedComments)
      localStorage.setItem('comments', JSON.stringify(updatedComments))

      setFormData({ comment: ''});
      }
    } catch (error) {
      console.error('Error saving post:', error);
      // Handle error or display an error message to the user
    }

    event.preventDefault();
  }

  


    async function handleSignOut() {
      try {
        await signOut();
      } catch (error) {
        console.log('error signing out: ', error);
      }
    }
  
  



  const goBack = () => {
    setCurrentPage (1);
  }

  const goToFeed = () => {
    setCurrentPage(2);
  }

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  
  const newPost = () => {
    setCurrentPage(3);
  };

  const addComment = () => {
    setCurrentPage(4);
  }


  
  
  const currentForm = () => {
    switch(currentPage){
    
      case 0:
        return(
<div className="index">
      <div className="div">
        <button onClick = {goToNextPage} className="frame">
            <span className="START">START</span>
        </button>
        <div className="overlap-group">
          
          <img
            className="img"
            alt="Line"
            src="https://cdn.animaapp.com/projects/657047c3051cb6b4d642c20b/releases/657047f1804cad6eeb2512a1/img/line-1-1@2x.png"
          />
          <img
            className="line-2"
            alt="Line"
            src="https://cdn.animaapp.com/projects/657047c3051cb6b4d642c20b/releases/657047f1804cad6eeb2512a1/img/line-1-1@2x.png"
          />
          <p className="welcome-to-DOOP">
            <span className="span">
              Welcome <br />
              to <br />
              DOOP
            </span>
          </p>
        </div>
      </div>
    </div>
  );









        case 1:
          return(
            <div>
              <h1>Hello, {user.username}</h1>
            <button onClick={goToNextPage}>Feed</button>
            <button onClick={newPost}>Create Post</button>
            <button onClick={handleSignOut}>Sign out</button>
            </div>
          );












        case 2:
          return(
            <div>
              <button onClick={goBack}>Home</button>

          
                {/* Display fetched blog posts */}
               {posts.map((post) => (
                  <div key={post.id}>
                   <h2>{post.Title}</h2>
                   <h3>user: {post.username}</h3>
                   <p>{post.Text}</p>




                   <button onClick = {addComment}>Add Comment</button>

              </div>
        ))}
          </div>

          );










        case 3:
        return(
         
            <div>
            
          

            <button onClick = {goToFeed}>Feed</button>
            
            
           <form onSubmit={ handleSubmit }>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInput}
              />
            </label>
            <label>
              Content:
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInput}
              ></textarea>
            </label>
            {/* Add more input fields or textarea as needed */}
            <button type="submit">Submit</button>
          </form>  

          </div>
      
        );








        
          case 4:
            return(

              <div>
              
            
  
              <button onClick = {goToFeed}>Feed</button>
              
              
             <form onSubmit={handleComment}>
              <label>
                Comment:
                <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInput}
              ></textarea>
              </label>
              <button type="submit">Submit</button>
            </form>  
  
            </div>



            )

          

    }
  

  



};

return <div>{currentForm()} </div>;

};
export default withAuthenticator(App);
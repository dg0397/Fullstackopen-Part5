import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  },[])

  const handleLogIn = async (e) => {
    e.preventDefault();
    console.log("loggin with", username, password);
    try {
      const user = await loginService.getLogin({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token)
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogOut = () =>{
    window.localStorage.clear()
    setUser(null)
    setPassword('')
    setUsername('')
  }
  const handleCreateNewBlog = async (e) =>{
    e.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setTitle('')
      setUrl('')
      setAuthor('')
    } catch (error) {
      console.log(error) 
    }
  }

  return (
    <div>
      {user === null ? (
        <>
          <h2>Log into the application</h2>
          <form onSubmit={handleLogIn}>
            <div>
              <label>
                Username:
                <input
                  value={username}
                  type="text"
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Password:
                <input
                  value={password}
                  type="password"
                  name="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </label>
            </div>
            <button type="submit">Login</button>
          </form>
        </>
      ) : (
        <>
          <h1>Blogs</h1>
          <h2>{user.username} Logged in</h2>
          <button onClick = {handleLogOut}>
            LogOut
          </button>
          <h3>Create new</h3>
          <form onSubmit = {handleCreateNewBlog}>
          <div>
              <label>
                Title:
                <input
                  value={title}
                  type="text"
                  name="Title"
                  onChange={({ target }) => setTitle(target.value)}
                />
              </label>
            </div>
          <div>
              <label>
                Author:
                <input
                  value={author}
                  type="text"
                  name="Author"
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </label>
            </div>
          <div>
              <label>
                Url:
                <input
                  value={url}
                  type="text"
                  name="Url"
                  onChange={({ target }) => setUrl(target.value)}
                />
              </label>
            </div>
            <button>
              Create
            </button>
          </form>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;

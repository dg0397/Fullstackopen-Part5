import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;

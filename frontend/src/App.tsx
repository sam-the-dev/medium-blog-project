import { Routes, Route } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Publish } from "./pages/Publish";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/blog/:id" element={<Blog />}></Route>
        <Route path="/publish" element={<Publish />}></Route>
      </Routes>
    </>
  );
}

export default App;

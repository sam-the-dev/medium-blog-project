import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
  title: String;
  content: String;
  id: Number;
  author: {
    name: String;
  };
}

export function useBlog({ id }: { id: String }) {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  async function fetchBlog() {
    try {
      const { data } = await axios.get(`${BACKEND_URL}api/v1/blog/get/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      console.log(data.blog);

      if (!data) alert("there is no data");

      setLoading(false);
      setBlog(data.blog);
    } catch (err) {
      console.log(err);
      return;
    }
  }

  return {
    loading,
    blog,
  };
}

export function useBlogs() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const { data } = await axios.get(`${BACKEND_URL}api/v1/blog/bulk`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      console.log(data.blogs);

      if (!data) alert("there is no data");

      setLoading(false);
      setBlogs(data.blogs);
    } catch (err) {
      console.log(err);
      return;
    }
  }

  return {
    loading,
    blogs,
  };
}

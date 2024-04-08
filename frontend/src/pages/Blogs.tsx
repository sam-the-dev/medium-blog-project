import { Appbar } from "../components/TopbarComponent";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks/index";
import { BlogSkeleton } from "../components/BlogSkeleton";

export function Blogs() {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <>
        <div>
          <Appbar authorName={"Anonymous"} />
          <div className="flex justify-center">
            <div>
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Appbar authorName={"Saksham"} />
        <div className="flex items-center flex-col">
          {blogs.map((blog) => (
            <div className="max-w-xl" key={String(blog?.id)}>
              <BlogCard
                id={blog?.id}
                authorName={blog?.author?.name || "Anonymous"}
                title={blog?.title}
                content={blog?.content}
                publishDate={"April 7, 2024"}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}

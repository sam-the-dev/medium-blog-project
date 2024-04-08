import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullArticle";
import { Appbar } from "../components/TopbarComponent";
import { Spinner } from "../components/Spinner";

export function Blog() {
  const { id } = useParams();
  console.log(id);

  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) {
    return (
      <>
        <div>
          <Appbar authorName={blog?.author?.name || "Anonymous"} />

          <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
              <Spinner />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <FullBlog blog={blog} />
      </>
    );
  }
}

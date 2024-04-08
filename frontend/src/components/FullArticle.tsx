import { Avatar } from "./BlogCard";
import { Appbar } from "./TopbarComponent";
import { Blog } from "../hooks";

export function FullBlog({ blog }: { blog: Blog }) {
  return (
    <>
      <Appbar authorName={blog?.author.name || "Anonymous"} />
      <div className="grid grid-cols-12 w-full h-screen">
        <div className="col-span-8 py-12 px-16">
          <h1 className="text-6xl font-bold">{blog?.title}</h1>
          <p className="mt-4 mb-6 text-md text-gray-400 font-medium tracking-wide">
            Published on April 7, 2024
          </p>
          <p className="text-lg tracking-wider"> {blog?.content}</p>
        </div>
        <div className=" col-span-4 bg-gray-50 py-12 px-8">
          <h1 className="font-medium text-lg text-gray-800">Author</h1>
          <div className="my-4">
            <div className="flex items-center gap-4">
              <Avatar name={blog?.author.name || "Anonymous"} size="small" />
              <div className="max-w-[20rem]">
                {" "}
                <h1 className="text-3xl font-bold">
                  {blog?.author.name || "Anonymous"}
                </h1>
                <p className="text-md font-medium text-gray-800">
                  I'm a entrepreneur who writes about online business, internet
                  marketing etc making sure of the real things int her
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      HIIII
    </>
  );
}

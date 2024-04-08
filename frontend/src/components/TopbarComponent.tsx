import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

interface author {
  authorName: String;
}

export function Appbar({ authorName }: author) {
  return (
    <>
      <div className="w-full h-20 px-10 flex justify-between items-center">
        <Link to={"/blogs"}>
          <div className="cursor-pointer">
            <h1 className="text-lg tracking-wide font-medium">Medium</h1>
          </div>
        </Link>

        <div className="flex gap-10 items-center">
          <Link to={"/publish"}>
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center tracking-wide dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
            >
              Publish
            </button>
          </Link>

          <Avatar name={authorName} size="big" />
        </div>
      </div>
      <div className="h-[0.15rem] w-full bg-slate-400 opacity-30"></div>
    </>
  );
}

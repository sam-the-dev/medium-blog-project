import { Link } from "react-router-dom";

export interface blogCardProps {
  authorName: String;
  title: String;
  content: String;
  publishDate: String;
  id: Number;
}

export function BlogCard({
  authorName,
  title,
  content,
  publishDate,
  id,
}: blogCardProps) {
  return (
    <>
      <Link to={`/blog/${id}`}>
        <div className=" p-5 rounded-sm cursor-pointer">
          <div className="flex items-center gap-2 pb-2">
            <Avatar name={authorName} size="small" />
            <p className="tracking-wide text-sm font-medium">{authorName}</p>
            <Circle />
            <p className="tracking-wide text-sm font-medium text-slate-500">
              {publishDate}
            </p>
          </div>

          <h1 className="font-bold text-2xl">{title}</h1>
          <p className="mt-1 mb-4 text-slate-800 ">
            {content.slice(0, 100) + "..."}
          </p>
          <p className="text-slate-500 text-sm font-medium mb-3">
            {Math.floor(content.length / 100) + " min read"}
          </p>
          <div className="h-[0.05rem] bg-slate-400 opacity-25"></div>
        </div>
      </Link>
    </>
  );
}

export function Circle() {
  return (
    <>
      <div className="rounded-full w-[0.15rem] h-[0.15rem] bg-black"></div>
    </>
  );
}

export function Avatar({
  name,
  size,
}: {
  name: String;
  size: "big" | "small";
}) {
  return (
    <>
      <div
        className={`flex items-center justify-center ${
          size === "big" ? "w-12 h-12" : "h-8 w-8"
        } overflow-hidden bg-gray-100 rounded-full dark:bg-gray-700`}
      >
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {name[0]}
        </span>
      </div>
    </>
  );
}

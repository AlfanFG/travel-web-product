// import ListCategory from "@/feature/category/ListCategory";

import ListComments from "@/feature/comments/ListComment";

export default function Comment() {
  return (
    <div className="h-full w-full p-4 rounded-md">
      <p className="text-2xl font-bold ml-6">Comment</p>
      <ListComments />
    </div>
  );
}

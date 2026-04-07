import Link from "next/link";
import { Bookmark } from "../page";

const BookmarkCard = ({ bookmark }: { bookmark: Bookmark }) => {
  return (
    <div className="w-full h-24 bg-amber-200 rounded-md p-4 cursor-pointer hover:bg-amber-300 shadow-md">
      <Link href={bookmark.url} target="_blank">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">{bookmark.name}</div>
          <div className="text-sm text-gray-500">{bookmark.description}</div>
        </div>
      </Link>
    </div>
  );
};

export default BookmarkCard;

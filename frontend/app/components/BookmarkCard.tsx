import Link from "next/link";
import { Bookmark } from "../page";

const BookmarkCard = ({
  bookmark,
  onUpdate,
  onDelete,
}: {
  bookmark: Bookmark;
  onUpdate: (bookmark: Bookmark) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <div className="relative w-full h-24 bg-amber-200 rounded-md p-4 cursor-pointer shadow-md group">
      <Link href={bookmark.url} target="_blank">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">{bookmark.name}</div>
          <div className="text-sm text-gray-500">{bookmark.description}</div>
        </div>
      </Link>
      <div className="absolute right-2 top-2 hidden group-hover:flex gap-1">
        <button
          className="text-xs bg-yellow-400 text-white px-2 py-1 rounded cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            onUpdate(bookmark);
          }}
        >
          수정
        </button>
        <button
          className="text-xs bg-red-400 text-white px-2 py-1 rounded cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            onDelete(bookmark.id);
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default BookmarkCard;

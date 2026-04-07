/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { Category } from "../page";

const SideMenu = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
}: {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
  onAddCategory: () => void;
}) => {
  useEffect(() => {
    onSelectCategory(categories[0]);
  }, [categories]);

  if (categories.length === 0) {
    return (
      <div className="w-[200px] h-screen bg-gray-200">
        <div className="pt-10 flex flex-col gap-4 items-center justify-center">
          <div>카테고리가 없습니다.</div>
          <button
            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
            onClick={onAddCategory}
          >
            + 카테고리 추가
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[200px] h-screen bg-gray-200">
      <div className="pt-10 flex flex-col gap-4 items-center justify-center">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => onSelectCategory(category)}
            className={`cursor-pointer ${
              selectedCategory?.id === category.id ? "font-bold" : ""
            }`}
          >
            {selectedCategory?.id === category.id ? "🔥" : ""} {category.name}
          </div>
        ))}
        <button
          className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
          onClick={onAddCategory}
        >
          + 카테고리 추가
        </button>
      </div>
    </div>
  );
};

export default SideMenu;

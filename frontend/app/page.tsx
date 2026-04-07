"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import SideMenu from "./components/SideMenu";
import BookmarkCard from "./components/BookmarkCard";

export interface Category {
  id: number;
  name: string;
}

export interface Bookmark {
  id: number;
  url: string;
  name: string;
  description: string;
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // =========================================================================
  // 서버 헬스 체크
  // =========================================================================
  const handleHealthCheck = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/health");
      alert(response.data.message);
    } catch (error) {
      alert("헬스 체크 실패");
      console.error("헬스 체크 실패", error);
    }
  };

  // =========================================================================
  // 카테고리 조회
  // =========================================================================
  useEffect(() => {
    const handleGetCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/categories",
        );
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("카테고리 조회 실패", error);
      }
    };

    handleGetCategories();
  }, []);

  // =========================================================================
  // 카테고리 생성
  // =========================================================================
  const handleCreateCategory = async () => {
    try {
      const name = prompt("카테고리 이름을 입력해주세요.");
      if (!name) {
        alert("카테고리 이름을 입력해주세요.");
        return;
      }
      const response = await axios.post(
        "http://localhost:8080/api/categories",
        {
          name,
        },
      );
      console.log(response.data);
      setCategories([...categories, response.data]);
    } catch (error) {
      console.error("카테고리 생성 실패", error);
    }
  };

  // =========================================================================
  // 북마크 조회
  // =========================================================================
  useEffect(() => {
    const handleGetBookmarks = async (categoryId: number) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/bookmarks?categoryId=${categoryId}`,
        );
        console.log(response.data);
        setBookmarks(response.data);
      } catch (error) {
        console.error("북마크 조회 실패", error);
      }
    };
    if (selectedCategory) {
      handleGetBookmarks(selectedCategory.id);
    }
  }, [selectedCategory]);

  const handleCreateBookmarkTest = async () => {
    if (!selectedCategory) return;

    try {
      const url = prompt("1단계: 북마크 URL을 입력해주세요.");
      if (!url) {
        alert("북마크 URL을 입력해주세요.");
        return;
      }
      const name = prompt("2단계: 북마크 이름을 입력해주세요.");
      if (!name) {
        alert("북마크 이름을 입력해주세요.");
        return;
      }
      const description = prompt("3단계: 북마크 설명을 입력해주세요.");
      if (!description) {
        alert("북마크 설명을 입력해주세요.");
        return;
      }
      const response = await axios.post("http://localhost:8080/api/bookmarks", {
        categoryId: selectedCategory.id,
        url: url.startsWith("http") ? url : `https://${url}`,
        name,
        description,
      });
      setBookmarks([...bookmarks, response.data]);
    } catch (error) {
      console.error("북마크 생성 실패", error);
    }
  };

  return (
    <div className="h-screen flex relative">
      <SideMenu
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddCategory={handleCreateCategory}
      />
      <div className="w-full h-full">
        <h1 className="p-4 text-2xl text-center font-bold bg-green-200">
          {selectedCategory?.name}
        </h1>
        <div className="p-4">
          <button
            className="my-4 bg-blue-500 text-white p-2 rounded-md cursor-pointer"
            onClick={handleCreateBookmarkTest}
          >
            + 북마크 추가
          </button>
          <div className="w-full h-full grid grid-cols-3 gap-4">
            {bookmarks.map((bookmark) => (
              <BookmarkCard key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>
        </div>
      </div>
      <button
        className="bg-green-500 text-white p-2 rounded-md absolute bottom-10 right-10"
        onClick={handleHealthCheck}
      >
        서버 헬스 체크
      </button>
    </div>
  );
}

"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import SideMenu from "./components/SideMenu";

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

  // const handleCreateBookmarkTest = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:8080/api/bookmarks", {
  //       categoryId: 1,
  //       url: "https://www.google.com",
  //       name: "Google",
  //       description: "Google is a search engine",
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("북마크 생성 실패", error);
  //   }
  // };

  return (
    <div className="h-screen flex relative">
      <SideMenu
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddCategory={handleCreateCategory}
      />
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <h1>react+spring boot 프로젝트</h1>
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id}>{bookmark.name}</div>
        ))}
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

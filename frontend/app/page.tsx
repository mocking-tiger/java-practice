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

  // =========================================================================
  // 카테고리 수정
  // =========================================================================
  const handleUpdateCategory = async () => {
    if (!selectedCategory) return;
    try {
      const name = prompt(
        "새 카테고리 이름을 입력해주세요.",
        selectedCategory.name,
      );
      if (!name) return;
      const response = await axios.put(
        `http://localhost:8080/api/categories/${selectedCategory.id}`,
        { name },
      );
      setCategories(
        categories.map((c) =>
          c.id === selectedCategory.id ? response.data : c,
        ),
      );
      setSelectedCategory(response.data);
    } catch (error) {
      console.error("카테고리 수정 실패", error);
    }
  };

  // =========================================================================
  // 카테고리 삭제
  // =========================================================================
  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;
    if (!confirm(`"${selectedCategory.name}" 카테고리를 삭제할까요?`)) return;
    try {
      await axios.delete(
        `http://localhost:8080/api/categories/${selectedCategory.id}`,
      );
      const updated = categories.filter((c) => c.id !== selectedCategory.id);
      setCategories(updated);
      setSelectedCategory(updated[0] ?? null);
      setBookmarks([]);
    } catch (error) {
      console.error("카테고리 삭제 실패", error);
    }
  };

  // =========================================================================
  // 북마크 수정
  // =========================================================================
  const handleUpdateBookmark = async (bookmark: Bookmark) => {
    try {
      const url = prompt("1단계: URL을 입력해주세요.", bookmark.url);
      if (!url) return;
      const name = prompt("2단계: 이름을 입력해주세요.", bookmark.name);
      if (!name) return;
      const description = prompt(
        "3단계: 설명을 입력해주세요.",
        bookmark.description,
      );
      if (description === null) return;
      const response = await axios.put(
        `http://localhost:8080/api/bookmarks/${bookmark.id}`,
        { url, name, description },
      );
      setBookmarks(
        bookmarks.map((b) => (b.id === bookmark.id ? response.data : b)),
      );
    } catch (error) {
      console.error("북마크 수정 실패", error);
    }
  };

  // =========================================================================
  // 북마크 삭제
  // =========================================================================
  const handleDeleteBookmark = async (bookmarkId: number) => {
    if (!confirm("북마크를 삭제할까요?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/bookmarks/${bookmarkId}`);
      setBookmarks(bookmarks.filter((b) => b.id !== bookmarkId));
    } catch (error) {
      console.error("북마크 삭제 실패", error);
    }
  };

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
        <div className="relative p-4 text-2xl text-center font-bold bg-green-200">
          {selectedCategory?.name}
          {selectedCategory && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
              <button
                className="text-sm bg-yellow-400 text-white px-2 py-1 rounded cursor-pointer"
                onClick={handleUpdateCategory}
              >
                수정
              </button>
              <button
                className="text-sm bg-red-400 text-white px-2 py-1 rounded cursor-pointer"
                onClick={handleDeleteCategory}
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <div className="p-4">
          <button
            className="my-4 bg-blue-500 text-white p-2 rounded-md cursor-pointer"
            onClick={handleCreateBookmarkTest}
          >
            + 북마크 추가
          </button>
          <div className="w-full h-full grid grid-cols-3 gap-4">
            {bookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                onUpdate={handleUpdateBookmark}
                onDelete={handleDeleteBookmark}
              />
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

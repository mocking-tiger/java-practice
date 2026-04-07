"use client";
import axios from "axios";

export default function Home() {
  const handleHealthCheck = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/health");
      console.log(response.data);
    } catch (error) {
      console.error("헬스 체크 실패", error);
    }
  };

  const handleCreateCategoryTest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/categories",
        {
          name: "게임",
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error("카테고리 생성 실패", error);
    }
  };

  const handleGetCategoryTest = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories");
      console.log(response.data);
    } catch (error) {
      console.error("카테고리 조회 실패", error);
    }
  };

  const handleCreateBookmarkTest = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/bookmarks", {
        categoryId: 1,
        url: "https://www.google.com",
        name: "Google",
        description: "Google is a search engine",
      });
      console.log(response.data);
    } catch (error) {
      console.error("북마크 생성 실패", error);
    }
  };

  const handleGetBookmarkTest = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/bookmarks?categoryId=1",
      );
      console.log(response.data);
    } catch (error) {
      console.error("북마크 조회 실패", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen">
      <h1>react+spring boot 프로젝트</h1>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={handleHealthCheck}
      >
        헬스 체크
      </button>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={handleCreateCategoryTest}
      >
        카테고리 생성 테스트
      </button>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={handleGetCategoryTest}
      >
        카테고리 조회 테스트
      </button>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={handleCreateBookmarkTest}
      >
        북마크 생성 테스트
      </button>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={handleGetBookmarkTest}
      >
        북마크 조회 테스트
      </button>
    </div>
  );
}

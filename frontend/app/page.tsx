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

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>react+spring boot 프로젝트</h1>
      <button onClick={handleHealthCheck}>헬스 체크</button>
    </div>
  );
}

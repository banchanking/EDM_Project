// Main.js
import React from "react";
import Header from "./Header";

// Main 컴포넌트 (메인/홈 화면)
const Main = () => {
  return (
    
    <div style={styles.container}>
    {/* <Header />   */}
      {/* 메인 타이틀 */}
      <h1 style={styles.title}>EDMASTER 학생관리 시스템</h1>
      {/* 간단한 안내 문구 */}
      <p style={styles.description}>
        학생 등록, 조회, 관리 등 다양한 기능을 제공합니다.<br />
        좌측 또는 상단 메뉴를 이용해 서비스를 이용하세요.
      </p>
      {/* 필요시 메인 이미지, 추가 안내 버튼 등 삽입 가능 */}
    </div>
  );
};

// 간단한 인라인 스타일
const styles = {
  container: {
    maxWidth: 700,
    margin: "80px auto",
    padding: 36,
    background: "#f5f8fa",
    borderRadius: 16,
    textAlign: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)"
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#005bea",
    marginBottom: 18,
  },
  description: {
    fontSize: 19,
    color: "#222",
    lineHeight: 1.7,
  }
};

export default Main;

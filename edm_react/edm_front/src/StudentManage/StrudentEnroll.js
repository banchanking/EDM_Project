// StudentEnroll.js
import React, { useState } from "react";

// 학생 등록 컴포넌트
const StudentEnroll = () => {
  // form 입력값을 state로 관리
  const [form, setForm] = useState({
    name: "",
    studentId: "",
    grade: "",
    phone: "",
  });

  // 입력값 변경 시 state 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 폼 제출 시 호출 (예시: 콘솔에 출력, 추후 서버와 연동 가능)
  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제 서비스에서는 이 부분에서 axios.post 등으로 서버 전송
    console.log("학생 등록 정보:", form);
    alert("학생 정보가 등록되었습니다!");
    // 폼 초기화
    setForm({
      name: "",
      studentId: "",
      grade: "",
      phone: "",
    });
  };

  return (
    <div style={styles.container}>
      <h2>학생 등록</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* 이름 입력 */}
        <label style={styles.label}>
          이름
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="학생 이름을 입력하세요"
          />
        </label>
        {/* 학번 입력 */}
        <label style={styles.label}>
          학번
          <input
            type="text"
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="예: 20230001"
          />
        </label>
        {/* 학년 입력 */}
        <label style={styles.label}>
          학년
          <input
            type="number"
            name="grade"
            value={form.grade}
            onChange={handleChange}
            required
            min="1"
            max="4"
            style={styles.input}
            placeholder="예: 1, 2, 3, 4"
          />
        </label>
        {/* 연락처 입력 */}
        <label style={styles.label}>
          연락처
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="010-1234-5678"
          />
        </label>
        {/* 등록 버튼 */}
        <button type="submit" style={styles.button}>
          등록
        </button>
      </form>
    </div>
  );
};

// 간단한 인라인 스타일 예시
const styles = {
  container: {
    maxWidth: 400,
    margin: "40px auto",
    padding: 24,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 3,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  input: {
    padding: "8px 12px",
    fontSize: 15,
    border: "1px solid #ccc",
    borderRadius: 6,
    outline: "none",
  },
  button: {
    marginTop: 12,
    padding: "10px 0",
    background: "#005bea",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: 6,
    fontSize: 16,
    cursor: "pointer",
  },
};

export default StudentEnroll;

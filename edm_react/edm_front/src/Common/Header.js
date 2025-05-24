import { useState } from "react";
import { Link } from "react-router-dom";
import "../Css/Common/Header.css";

const menuList = [
  {
    title: "학생관리",
    sub: [
      {name: "학생정보등록", path:"/studentEnroll"},
      {name: "학생출결관리", path: "#"},
      {name: "학생성적관리", path: "#"}
    ],
  },

  {
    title: "수업관리",
    sub: [
        {name:"수업일정관리", path:"#"},
        {name:"커리큘럼관리", path:"#"},
        {name:"과제관리",     path:"#"}
    ]
  },
  {
    title: "과금관리",
    sub: [
        {name:"수업료관리", path:"#"},
        {name:"납부내역",   path:"#"},
        {name:"미납관리",   path:"#"}
    ]
  },
  {
    title: "통계/리포트",
    sub: [
        {name:"성적분석", path:"#"},
        {name:"출석률분석",   path:"#"},
        {name:"수익분석",   path:"#"}
    ]
  },

  {
    title: "사용자 관리",
    sub: [
      { name: "선생님 목록", path: "/teacherList" },
      { name: "관리자 목록", path: "#" },
    ],
  },
];

export default function Header() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  
  // 화면 너비 체크(모바일/PC 구분)
  const isMobile = window.innerWidth <= 992;
  
  // 메뉴 클릭 시
  const handleMenuClick = (idx) => {
    // 같은 메뉴 누르면 닫힘, 아니면 해당 메뉴만 열림
    setActiveIndex(idx === activeIndex ? null : idx);
  };

  return (
    <header className="custom-header">
      <div className="logo-wrap">
        <Link to="/">
        <img src="/Images/logo.png" alt="로고" className="logo-img" />
        </Link>
        {/* 햄버거 버튼: 모바일에서만 표시 */}
        <button
          className={`hamburger-btn${hamburgerOpen ? " open" : ""}`}
          onClick={() => setHamburgerOpen(!hamburgerOpen)}
          aria-label="메뉴 열기"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      
      <nav className={`main-nav${hamburgerOpen ? " open" : ""}`}>
        <ul className="nav-list">
          {menuList.map((menu, idx) => (
            <li
              key={menu.title}
              className={`nav-item ${activeIndex === idx ? "active" : ""}`}
              onClick={() => handleMenuClick(idx)}
            >
              <span className="nav-title">{menu.title}</span>
              {/* 서브메뉴는 한 개만, 메뉴 바로 아래만 */}
              {activeIndex === idx && (
                <ul className="dropdown-list mobile-dropdown">
                  {menu.sub.map((sub, sidx) => (
                    <li key={sub.name} className="dropdown-item">
                      <Link to={sub.path}>{sub.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
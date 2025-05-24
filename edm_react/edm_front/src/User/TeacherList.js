import React, { useEffect, useState } from 'react';
import { fetchTeachers } from '../api/UserAPI';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const data = await fetchTeachers();
        setTeachers(data);
      } catch (err) {
        console.error('불러오기 실패:', err);
      }
    };

    getTeachers();
  }, []);

  return (
    <div>
      <h2>선생님 목록</h2>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            {teacher.name} ({teacher.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherList;

# 학생 데이터 출처: https://www.kaggle.com/datasets/aljarah/xAPI-Edu-Data
# 선생님 데이터 출처: https://www.kaggle.com/datasets/sheilnaik/nj-teacher-salaries-2016

import pandas as pd
import random
import datetime
import os
import json

# 📁 설정
STUDENT_SAVE_PATH = "../data/students_data.csv"
TEACHER_SAVE_PATH = "../data/teachers_data.csv"

#------ 학생 데이터 -----
def web_scraping(num_samples=1000):
    return pd.DataFrame({
        'gender': [random.choice(['M', 'F']) for _ in range(num_samples)],
        'GradeID': [f"G-{str(random.randint(1,12)).zfill(2)}" for _ in range(num_samples)],
        'StageID': [random.choice(['lowerlevel', 'MiddleSchool', 'HighSchool']) for _ in range(num_samples)],
        'raisedhands': [random.randint(0, 100) for _ in range(num_samples)],
        'VisITedResources': [random.randint(0, 100) for _ in range(num_samples)],
        'AnnouncementsView': [random.randint(0, 100) for _ in range(num_samples)],
        'Discussion': [random.randint(0, 100) for _ in range(num_samples)],
        'ParentAnsweringSurvey': [random.choice(['Yes', 'No']) for _ in range(num_samples)],
        'ParentschoolSatisfaction': [random.choice(['Good', 'Bad']) for _ in range(num_samples)],
        'StudentAbsenceDays': [random.choice(['under-7', 'above-7']) for _ in range(num_samples)],
        'Class': [random.choice(['L', 'M', 'H']) for _ in range(num_samples)],
    })

def estimate_age(grade_id):
    try:
        grade_number = int(grade_id.split('-')[1])
        return 6 + grade_number
    except:
        return random.randint(10, 18)

def clean_and_diversify(df):
    nationalities = ['Kuwait','Lebanon','Egypt','USA','South Korea','Japan','China','France','Germany','UK','Brazil','Russia','India']
    topics = ['English', 'Spanish', 'Math', 'Chemistry', 'Biology', 'Programming', 'Music', 'Art']
    guardians = ['mom', 'father', 'grandparent', 'older sibling', 'guardian']

    cleaned = pd.DataFrame()
    cleaned["name"] = ["Student_" + str(i) for i in range(len(df))]
    cleaned["age"] = df["GradeID"].apply(estimate_age)
    cleaned["gender"] = df["gender"]
    cleaned["school"] = "Global Learning Center"
    cleaned["level"] = df["StageID"]
    cleaned["nationality"] = [random.choice(nationalities) for _ in range(len(df))]
    cleaned["topic"] = [random.choice(topics) for _ in range(len(df))]
    cleaned["guardian"] = [random.choice(guardians) for _ in range(len(df))]
    cleaned["birth_date"] = [datetime.date(2000 + random.randint(0, 6), random.randint(1, 12), random.randint(1, 28)) for _ in range(len(df))]

    def create_ai_json(row):
        return {
            "raised_hand": row["raisedhands"],
            "visited_resources": row["VisITedResources"],
            "announcements_viewed": row["AnnouncementsView"],
            "discussion_participation": row["Discussion"],
            "parent_survey": row["ParentAnsweringSurvey"],
            "parent_satisfaction": row["ParentschoolSatisfaction"],
            "absence": row["StudentAbsenceDays"],
            "achievement_level": row["Class"]
        }

    cleaned["ai_type"] = df.apply(create_ai_json, axis=1)
    return cleaned

#------ 선생님 데이터 -----
def simulate_teacher_scraping(num_samples=1000):
    return pd.DataFrame({
        'first_name': [random.choice(['John', 'Emily', 'David', 'Sarah', 'Alex']) for _ in range(num_samples)],
        'last_name': [random.choice(['Smith', 'Lee', 'Kim', 'Brown', 'Garcia']) for _ in range(num_samples)],
        'primary_job': [random.choice(['Math Teacher', 'English Teacher', 'Science Teacher']) for _ in range(num_samples)],
        'school': [random.choice(['Highland HS', 'Greenwood MS', 'Lakeside School']) for _ in range(num_samples)],
        'fte': [random.choice(['Full-time', 'Part-time']) for _ in range(num_samples)],
        'salary': [random.randint(40000, 120000) for _ in range(num_samples)],
        'certificate': [random.choice(['Standard', 'Provisional', 'Emergency']) for _ in range(num_samples)],
        'subcategory': [random.choice(['Secondary', 'Elementary']) for _ in range(num_samples)],
        'teaching_route': [random.choice(['Traditional', 'Alternate']) for _ in range(num_samples)],
        'highly_qualified': [random.choice(['Yes', 'No']) for _ in range(num_samples)],
        'experience_total': [random.randint(1, 30) for _ in range(num_samples)]
    })

def transform_teacher_data(df):
    nationalities = ["USA", "UK", "Canada", "Australia", "New Zealand", "Ireland", "South Africa", "India", "Philippines", "Singapore"]
    cleaned = pd.DataFrame()
    cleaned["user_id"] = [1000 + i for i in range(len(df))]
    cleaned["name"] = df["first_name"].str.strip() + " " + df["last_name"].str.strip()
    cleaned["age"] = [random.randint(30, 60) for _ in range(len(df))]
    cleaned["gender"] = [random.choice(["M", "F"]) for _ in range(len(df))]
    cleaned["resident_num"] = [f"{random.randint(100,999)}-{random.randint(10,99)}-{random.randint(1000,9999)}" for _ in range(len(df))]
    cleaned["subject"] = df["primary_job"].fillna("Unknown")
    cleaned["hire_date"] = df["experience_total"].apply(
        lambda years: datetime.date(
            datetime.datetime.now().year - int(years) if pd.notnull(years) else 2015,
            random.randint(1, 12),
            random.randint(1, 28)
        )
    )
    cleaned["profile"] = df.apply(
        lambda row: f"{row['first_name']} is a {row['primary_job']} at {row['school']}, with {int(row['experience_total']) if not pd.isnull(row['experience_total']) else 0} years of total experience.",
        axis=1
    )

    def create_ai_type(row):
        return json.dumps({
            "fte": row["fte"],
            "salary": row["salary"],
            "certificate": row["certificate"],
            "subcategory": row["subcategory"],
            "teaching_route": row["teaching_route"],
            "highly_qualified": row["highly_qualified"],
            "experience_total": row["experience_total"]
        })

    cleaned["ai_type"] = df.apply(create_ai_type, axis=1)
    cleaned["nationality"] = [random.choice(nationalities) for _ in range(len(df))]
    return cleaned

# user_tbl용 데이터 생성 및 저장
def generate_user_tbl_from_teachers(teacher_df):
    user_data = pd.DataFrame()
    user_data["id"] = teacher_df["user_id"]
    user_data["username"] = ["teacher" + str(i) for i in range(len(teacher_df))]
    user_data["password"] = ["hashed_pw" for _ in range(len(teacher_df))]
    user_data["mobile"] = [f"000-0000-{1000 + i}" for i in range(len(teacher_df))]
    user_data["email"] = ["teacher" + str(1000 + i) + "@edmaster.com" for i in range(len(teacher_df))]
    user_data["user_type"] = ["teacher" for _ in range(len(teacher_df))]
    return user_data

USER_SAVE_PATH = "../data/user_teachers_named.csv"

# 공통 저장 함수(저장 전에 기존 파일 자동 삭제) - 항상 최신 정제 데이터유지
def save_to_csv(df, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if os.path.exists(path):
        os.remove(path)  # 기존 파일 있으면 삭제
    df.to_csv(path, index=False)
    print(f"✔ 저장 완료: {path}")

# 메인 실행
if __name__ == "__main__":
    student_raw = web_scraping(num_samples=1000)
    student_clean = clean_and_diversify(student_raw)
    save_to_csv(student_clean, STUDENT_SAVE_PATH)

    teacher_raw = simulate_teacher_scraping(num_samples=1000)
    teacher_clean = transform_teacher_data(teacher_raw)
    save_to_csv(teacher_clean, TEACHER_SAVE_PATH)

    user_tbl_df = generate_user_tbl_from_teachers(teacher_clean)
    user_tbl_df.to_csv(USER_SAVE_PATH, index=False)
    print(f"✔ 유저 CSV 저장 완료: {USER_SAVE_PATH}")

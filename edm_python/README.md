# EDM_Project
EDM Project

<!-- #기본 세팅
#가상환경 생성 & 활성화
프로젝트 폴더에서 -->
# macOS/Linux
python3 -m venv .venv
source .venv/bin/activate

# Windows PowerShell
# EDM_PROJECT 에서 
 python -m venv .venv  <!-- 한번만 -->
.venv\Scripts\activate

# 의존성 설치
pip install --upgrade pip
# 혹은(경로주의)
D:\DEV\edm_project\.venv\Scripts\python.exe -m pip install --upgrade pip 

pip install -r requirements.txt
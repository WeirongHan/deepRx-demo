## Setup
### 1. Backend

- **Install Dependencies**:  
  - cd backend
  - python3 -m venv env
  - source env/bin/activate
  - cd backend
  - pip install -r requirements.txt
- **DB Migration**: 
  - cd ..
  - python manage.py makemigrations
  - python manage.py migrate
- **Start Backend Server**:  
  - python manage.py runserver

### 2. Frontend
- **Install Dependencies**:  
  - cd frontend
  - npm install
  - npm install axios react-router-dom jwt-decode
- **Start Frontend Server**:  
  - npm run dev



![image](https://github.com/user-attachments/assets/3a8a1c09-2e74-4e7a-bb45-0281c068be9f)

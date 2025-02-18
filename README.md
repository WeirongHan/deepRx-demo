Backend:
- python3 -m venv env
- source env/bin/activate 
- pip install -r requirements.txt
- python manage.py makemigrations
- python manage.py migrate
- python manage.py runserver

Frontend: 
- npm create vite@latest frontend -- --template react
- cd frontend
- npm install axios react-router-dom jwt-decode
- npm run dev    


![image](https://github.com/user-attachments/assets/3a8a1c09-2e74-4e7a-bb45-0281c068be9f)

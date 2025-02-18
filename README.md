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

#  Dynamic Form Renderer (React + Vite)

This project is a **React + Vite frontend** for rendering dynamic forms with support for text fields, dropdowns, multiselect, and file uploads.  
It can also connect to a **backend API** if needed (e.g., to submit form data).

---

# How it runs

- **Frontend (Vite React)** → Runs by default on **port 5173**  
- **Backend (Node/Express API)** → Runs on a **different port**, usually **5000**  
- The frontend communicates with the backend via **HTTP fetch calls**.  

⚠️ **If the backend is NOT running, API calls from the frontend will fail (e.g., fetch/network errors).**


⚠️ Important Notes:

✅ Frontend must be running on 5173 (or another port)

✅ Backend must be running on 5000 (or another port)

❌ If backend is not running, frontend will show errors when fetching data



# 1. Requirements

Before running, make sure you have the following installed:

- **Node.js ≥ 16**  
- **npm ≥ 8**  
- A code editor (VS Code recommended)

Check your installed versions:

```bash
node -v
npm -v

# 2. Setup & Installation

Step 1: Extract the project
unzip dynamic-form-renderer.zip
cd dynamic-form-renderer


Step 2: Install dependencies for the frontend
npm install

3. Running the Project
You will need TWO TERMINALS because the frontend and backend run on different ports.

# Terminal 1 → Start Frontend
Run inside the main project folder:
npm run dev
Now open http://localhost:5173 in your browser.

# Terminal 2 → Start Backend
Run inside the backend folder:
cd backend
npm start
it will run on http://localhost:5000



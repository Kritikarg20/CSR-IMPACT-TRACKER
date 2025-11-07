
**CSR Impact Tracker**

CSR Impact Tracker is a **full-stack web application** designed to help organizations efficiently **track, analyze, and visualize their Corporate Social Responsibility (CSR) initiatives.**
It provides an **integrated dashboard** where users can log CSR events, view impact analytics, and measure performance — enabling data-driven insights into an organization’s CSR efforts.

Built with the **MERN stack**, the project demonstrates strong understanding of frontend–backend communication, database management, and real-world app deployment.
---
**Objective**

The goal of this project was to build a **scalable and data-centric web application** that connects the frontend, backend, and database layers seamlessly. It focuses on secure authentication, **real-time data visualization**, and clean architecture to **simulate enterprise-level CSR tracking systems.**
---
**Preview**

![CSR Impact Tracker Dashboard](.h-2/5src/assets/preview.png)
---

**Tech Stack**

**Frontend:** React.js, Tailwind CSS
**Backend:** Node.js, Express.js
**Database:** MongoDB (Mongoose)
**Deployment:** Vercel (Frontend), Render (Backend)
---
**Key Features**

**User Authentication –** Secure sign-up and login with validation.

**Analytics Dashboard –** Displays CSR data, KPIs, and progress charts in real-time.

**Event Management –** Add, view, and analyze CSR initiatives easily.

**Cloud Integration –** MongoDB Atlas for cloud-hosted database access.

**Scalable Architecture –** Modular codebase and clean REST API integration.

**Responsive UI –** Tailwind CSS-based modern, mobile-friendly interface.
---
**Installation & Setup**
**1. Backend**
cd backend
npm install
npm run dev

**2. Frontend**
cd frontend
npm install
npm start


Visit http://localhost:5173
 to access the application.
---
**Usage**

Sign up or log in to your account.

Add CSR events and upload related data.

View your performance metrics through interactive dashboards.

Track organization-wide CSR progress in real time.
---
**Project Structure**
csr-impact-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── AuthForm.jsx
│   │   ├── Dashboard.jsx
│   │   ├── UploadPage.jsx
│   │   ├── KPICard.jsx
│   │   ├── ChartCard.jsx
│   │   └── InsightCard.jsx
│   ├── utils/
│   │   ├── constants.js
│   │   └── csvHelpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
---
**License**

This project is licensed under the MIT License.
---
**Acknowledgments**

Created as part of a self-driven learning project to strengthen MERN stack development skills and understand the technical flow behind data-driven web applications.
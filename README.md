# PeaceOfMind

# Therapist-Patient Platform

## Overview

This project is a web application designed to bridge the gap between therapists and patients, creating a secure and user-friendly platform for mental health support. The platform enables therapists to manage their profiles and appointments while allowing patients to seek guidance, book sessions, and access mental health resources.

## Key Features

### For Patients:

+ Therapist Search: Patients can browse therapists based on specialization, availability, and experience.

+ Appointment Booking: Book sessions with therapists directly through the platform.

+ Personalized Advice: Scroll through randomly generated advice based on categories like anxiety, depression, and eating disorders.

+ Mental Health Resources: Access curated resources tailored to college students and their mental health needs.

+ Journals and Surveys: Track personal growth and receive custom recommendations.

### For Therapists:

+ Registration and Profile Management: Fields include First Name, Last Name, Email, Address, License Number, Specialization, Experience, Availability, and Monthly Rate.

+ Appointment Management: View, accept, or decline appointment requests.

+ Messaging: Communicate with patients securely.

+ Reviews: Manage and respond to patient feedback.

## Tech Stack

+ Frontend: React

+ Backend: Express.js (Node.js)

+ Database: PostgreSQL


## Getting Started
### Prereq
+ Node.js (v16+)
+ PostgreSQL
+ Git

# Setup Instructions
1. Clone the repository:
git clone https://github.com/AnasCD/PeaceOfMind.git
cd therapist-patient-platform
2. Install dependencies:
npm install
3. Configure environment variables by creating a .env file in the root directory with the following:
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_secret_key
PORT=5000
4. Setup database:
npx sequelize-cli db:migrate
5. Start the server:
npm start/ npm run dev
6. Access the app
http://localhost:3000

# DriveEasy - Car Rental Platform

A modern, full-stack car rental application built with React, TypeScript, and Node.js. DriveEasy allows users to browse and book cars across multiple cities with a seamless booking experience.

## 🚀 Features

- **City Selection**: Choose from multiple cities across India
- **Car Browsing**: Browse cars by category (Hatchback, Sedan, SUV, Luxury)
- **Real-time Booking**: Book cars with date/time selection
- **Secure Payments**: Integrated payment system with multiple options
- **User Authentication**: Login system for booking management
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Local Storage**: Persistent booking data and user sessions

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Authentication
- **Supabase** - Authentication service (configured but using localStorage for demo)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd driveeasy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/driveeasy
   PORT=5000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Start the backend server**
   ```bash
   node src/backend/server.cjs
   ```

6. **Start the frontend (in a new terminal)**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
driveeasy/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # App header with navigation
│   │   ├── CitySelector.tsx # City selection component
│   │   ├── CarList.tsx      # Car listing component
│   │   ├── BookingModal.tsx # Booking form modal
│   │   ├── PaymentModal.tsx # Payment processing modal
│   │   ├── LoginModal.tsx   # User login modal
│   │   └── BookingSuccess.tsx # Booking confirmation
│   ├── data/                # Static data files
│   │   ├── cars.ts          # Car inventory data
│   │   └── cities.ts        # Available cities data
│   ├── hooks/               # Custom React hooks
│   │   └── useAuth.ts       # Authentication hook
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # All type interfaces
│   ├── backend/             # Backend server
│   │   └── server.cjs       # Express server setup
│   ├── App.tsx              # Main app component
│   └── main.tsx             # App entry point
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md                # Project documentation
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 API Endpoints

### Backend Server (`http://localhost:5000`)

- `GET /` - Server status
- `GET /data` - Fetch sample data from MongoDB

## 📱 Features in Detail

### City Selection
- Browse available cities with car counts
- Persistent city selection in localStorage

### Car Booking
- View car details, pricing, and features
- Select booking dates and times
- Calculate total cost with GST and fees
- Secure payment processing

### User Management
- User registration and login
- Booking history tracking
- Profile management

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
```
Deploy the `dist` folder to your hosting service (Netlify, Vercel, etc.)

### Backend Deployment
Deploy the backend to services like Heroku, Railway, or AWS.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support, email support@driveeasy.com or join our Discord community.

---

Built with ❤️ using React and TypeScript

# Output
<img width="1908" height="963" alt="output1" src="https://github.com/user-attachments/assets/f78715fe-0902-41f3-9cac-d3b7c5cca10f" />
<img width="1920" height="972" alt="output2" src="https://github.com/user-attachments/assets/36ad63df-6b19-41e0-be67-a6c28492cef4" />
<img width="1920" height="968" alt="output3" src="https://github.com/user-attachments/assets/37e193f2-890e-45d4-9487-2bd5f417b9ae" />
<img width="1920" height="973" alt="output4" src="https://github.com/user-attachments/assets/fae23528-254e-4a4e-88fc-d04bec6c904e" />


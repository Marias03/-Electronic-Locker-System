# 🧳 Electronic Locker System

A modern electronic locker reservation system built with Next.js, PostgreSQL, and deployed on Vercel.

🔗 **Live Demo:** [electronic-locker-system-k1l8.vercel.app](https://electronic-locker-system-k1l8.vercel.app)

---

## ✨ Features

- 🔒 20 lockers in 3 sizes (Small, Medium, Large)
- 📧 PIN sent automatically to user's email on reservation
- 🌍 4 languages: English, Spanish, Russian, Chinese
- 📊 Real-time stats (total, available, occupied, occupancy %)
- 🔑 PIN-based release system
- 🛠️ Admin panel with force release capability
- 📈 Observability with Prometheus, Grafana and Axiom logs

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Frontend   | Next.js 16, Tailwind CSS, i18next |
| Backend    | Next.js API Routes                |
| Database   | PostgreSQL (Supabase)             |
| Email      | Nodemailer + Gmail                |
| Logs       | Axiom                             |
| Metrics    | Prometheus + Grafana              |
| Deploy     | Vercel                            |
| Containers | Docker Compose                    |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- Docker Desktop
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Marias03/-Electronic-Locker-System.git
cd -Electronic-Locker-System

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your values in .env

# Run database migrations
npx prisma db push

# Seed the database
npm run seed

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL=your_postgresql_url
DIRECT_URL=your_postgresql_direct_url
GMAIL_USER=your_gmail@gmail.com
GMAIL_PASS=your_gmail_app_password
AXIOM_TOKEN=your_axiom_token
```

---

## 📊 Observability

### Start Prometheus + Grafana

```bash
docker-compose up -d
```

| Service    | URL                   |
| ---------- | --------------------- |
| App        | http://localhost:3000 |
| Prometheus | http://localhost:9090 |
| Grafana    | http://localhost:3001 |

### Available Metrics

- `locker_total` — Total number of lockers
- `locker_occupied` — Occupied lockers
- `locker_available` — Available lockers
- `locker_small` — Small lockers
- `locker_medium` — Medium lockers
- `locker_large` — Large lockers

---

## 🔐 Admin Panel

Access at `/admin` with password `admin1234`

- View all occupied lockers with user, email and PIN
- Force release any locker without PIN
- View all available lockers

---

## 📁 Project Structure

```
casilleros/
├── app/
│   ├── admin/          # Admin panel
│   ├── api/
│   │   ├── casilleros/ # Locker CRUD API
│   │   └── metrics/    # Prometheus metrics
│   ├── components/     # Reusable components
│   └── lib/            # Logger (Axiom)
├── prisma/             # Database schema & migrations
├── public/locales/     # i18n translations (en, es, ru, ch)
├── docker-compose.yml  # Prometheus + Grafana
└── prometheus.yml      # Prometheus config
```

## 👩‍💻 Author

Maria Juliana Arias — [@Marias03](https://github.com/Marias03)

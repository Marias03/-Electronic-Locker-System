🧳 Electronic Locker System


Full-stack airport luggage locker reservation platform — built, deployed, and monitored end-to-end.



🔗 Live Demo: electronic-locker-system-k1l8.vercel.app


📌 What is this?

A production-ready locker reservation system for airport branches. Users can browse available lockers by size, reserve one with a single click, and receive a PIN by email to release their luggage — no account required. Admins manage lockers through a dedicated panel with real-time occupancy data.

Built as an individual academic project for a KFU/MTS Web Services course, designed to meet the complexity requirements of a real internship evaluation.


✨ Key Features


🏢 Multi-branch architecture — 3 airport branches, each with automatic sector assignment
📦 Tiered locker system — Small, Medium, Large with different pricing per duration
📧 PIN-based flow — reserve → get PIN by email → release with PIN (no login needed)
🌍 4 languages — English, Spanish, Russian, Chinese (i18next)
📊 20+ Prometheus metrics with Grafana dashboard for real-time observability
🛠️ Per-branch admin panels with force release and occupancy stats
📍 Yandex Maps integration for branch location display
📈 Yandex Metrica for user analytics



🛠️ Tech Stack

LayerTechnologyFrontendNext.js 16 (App Router), Tailwind CSSBackendNext.js API RoutesORMPrisma v5DatabasePostgreSQL via SupabaseAuthNextAuth.jsEmailNodemailer + Gmail SMTPObservabilityPrometheus + Grafana, Axiom, Yandex MetricaDeployVercelContainersDocker Compose (local dev)i18ni18next (EN / ES / RU / ZH)


🚀 Getting Started

Prerequisites


Node.js 22+
Docker Desktop
npm


Installation

bash# Clone the repository
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

Environment Variables

envDATABASE_URL=your_postgresql_url
DIRECT_URL=your_postgresql_direct_url
GMAIL_USER=your_gmail@gmail.com
GMAIL_PASS=your_gmail_app_password
AXIOM_TOKEN=your_axiom_token
NEXTAUTH_SECRET=your_secret


📊 Observability

bash# Start Prometheus + Grafana locally
docker-compose up -d

ServiceURLApphttp://localhost:3000Prometheushttp://localhost:9090Grafanahttp://localhost:3001

Available metrics (sample):

MetricDescriptionlocker_totalTotal number of lockerslocker_occupiedCurrently occupied lockerslocker_availableAvailable lockerslocker_small/medium/largeCount by size+ 15 more custom metrics


📁 Project Structure

├── app/
│   ├── admin/            # Per-branch admin panels
│   ├── api/
│   │   ├── casilleros/   # Locker CRUD API
│   │   └── metrics/      # Prometheus metrics endpoint
│   └── components/       # Reusable UI components
├── prisma/               # Schema & migrations
├── public/locales/       # i18n (en, es, ru, zh)
├── docker-compose.yml    # Prometheus + Grafana setup
└── prometheus.yml        # Prometheus config


🔐 Admin Panel

Access at /admin — view all lockers, occupancy stats, and force-release any locker without PIN.



 

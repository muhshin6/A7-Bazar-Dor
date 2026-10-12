# A7-Bazar-Dor (বাজার দর)

A modern Bangladeshi marketplace platform for real-time bazaar prices, product listings, and vendor management. Built to connect buyers and sellers in local markets with transparent pricing and seamless transactions.

## 🚀 Technologies Used

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** React 19, JavaScript (ES6+)
- **Styling:** TailwindCSS v4, DaisyUI, HeroUI
- **Authentication:** Better Auth (MongoDB Adapter, Google OAuth)
- **Database:** MongoDB
- **UI Components:** HeroUI, Gravity UI Icons
- **Notifications:** React Toastify
- **Animation:** React Marquee Text
- **Development:** ESLint, Babel React Compiler

## ✨ Key Features

### 1. **Real-Time Market Prices**
Live price tracking for vegetables, fruits, fish, meat, and daily essentials across multiple bazaars in Bangladesh. Prices updated regularly by verified vendors with min/max/average price summaries per market.

### 2. **Multi-Category Product Catalog**
Browse products organized by categories (vegetables, fruits, proteins, spices, pantry items) with detailed views, images, and unit-based pricing (kg, litre, dozen, piece).

### 3. **Secure Authentication System**
Better Auth with email/password and Google social login. Protected routes with middleware, toast notifications for auth redirects, and a profile page with update information feature.

### 4. **Responsive & Accessible UI**
Mobile-first design with TailwindCSS + HeroUI, fully responsive across devices (grid collapses, navbar + ticker stays usable, hero stacks, btn-sm sm:btn-md, max-w-6xl container). Includes loading skeletons, marquee announcements, and RTL support for Bangla content.

### 5. **Developer Experience**
Static generation for dynamic routes (`generateStaticParams`), custom 404 page with friendly "হোম পেজে ফিরে যান" link, loading skeletons on all data-fetching pages, and Vercel-ready deployment with no hard 404 on refresh.

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or cloud)
- npm/yarn/pnpm/bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd a7-bazar-dor

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your MongoDB URI and auth secrets

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth routes (sign-in, sign-up)
│   ├── categories/        # Category listing & detail pages
│   ├── products/          # Product listing & detail pages
│   ├── profile/           # User profile & update info
│   ├── api/auth/          # Better Auth API routes
│   ├── not-found.jsx      # Custom 404 page
│   └── loading.jsx        # Loading skeletons
├── components/            # Reusable UI components
│   ├── home/             # Homepage-specific components
│   ├── Header.jsx        # Navigation header with dropdown
│   ├── Footer.jsx        # Site footer
│   ├── Hero.jsx          # Hero section
│   ├── Skeleton.jsx      # Loading skeleton components
│   └── ...
├── data/                  # Static JSON data (products, categories)
├── lib/                   # Utility libraries
│   ├── auth.js           # Better Auth configuration
│   └── auth-client.js    # Client-side auth helpers
└── middleware.ts         # Next.js middleware for auth protection
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🌐 Deployment

Deploy easily on **Vercel** (recommended for Next.js):

1. Push to GitHub/GitLab/Bitbucket
2. Import project in Vercel
3. Add environment variables
4. Deploy

Dynamic routes (`/categories/[slug]`, `/products/[id]`) use `generateStaticParams` for static generation, ensuring no hard 404 on refresh after deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [HeroUI](https://heroui.com/) - Beautiful, accessible UI components
- [Better Auth](https://www.better-auth.com/) - Authentication framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [DaisyUI](https://daisyui.com/) - TailwindCSS components

---

**Made with ❤️ for Bangladesh's local markets**

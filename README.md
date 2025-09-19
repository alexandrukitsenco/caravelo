# Caravelo - Flight Management System

A modern web application developed with Vue 3 for managing user flight quotas. The application allows viewing users with their available flights and managing quotas through an interactive form.

## 🛠️ Technologies

- **Vue 3** - Reactive JavaScript framework
- **TypeScript** - Static typing for JavaScript
- **Vite** - Fast build tool
- **PrimeVue** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Pinia** - State management
- **Vue Router** - Routing
- **Vuelidate** - Form validation
- **Vitest** - Testing framework

## 📋 Prerequisites

- Node.js (version 20.19.0 or higher, or 22.12.0+)
- pnpm (recommended) or npm

## 🚀 Installation and Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd caravelo
```

### 2. Install dependencies
```bash
pnpm install
# or
npm install
```

## 🏃‍♂️ Available Scripts

### Development
```bash
pnpm dev
# or
npm run dev
```
Starts the development server with hot-reload.

### Build
```bash
pnpm build
# or
npm run build
```
Builds the application for production.

### Linting
```bash
pnpm lint
# or
npm run lint
```
Run ESLint to check and fix code.

### Formatting
```bash
pnpm format
# or
npm run format
```
Format code with Prettier.


## 🔧 Additional Configuration

### TypeScript
The project uses `vue-tsc` for type checking. In editors, Volar is needed for full TypeScript support with `.vue` files.

### Vite
See [Vite Configuration Reference](https://vite.dev/config/) for additional customizations.

## 📝 Development Notes

- The project uses mock data for demonstration
- Flight updates are simulated with a mock API call
- The application is optimized for modern development with TypeScript and Vue 3 Composition API
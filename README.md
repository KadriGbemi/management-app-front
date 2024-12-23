
# Management App Frontend

This repository contains the frontend code for the **Management App**, built with React, TypeScript, and Vite.

## Features
- Modern UI built with React and Tailwind CSS
- Type-safe code using TypeScript
- API integration with a backend service
- State management and optimized performance
- Development and production-ready configurations using Vite

---

## Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js** (v16 or later)
- **npm** (v8 or later) or **yarn** (v1.22 or later)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/KadriGbemi/management-app-front.git
cd management-app-front
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and configure the following environment variables:

```env
VITE_API_URL=http://localhost:5000 or https://management-app.fly.dev/# (Replace with your API backend URL)
```

> Ensure the backend service is running at the URL specified in `VITE_API_URL`.

### 4. Run the Application

#### Development Mode

```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

Visit the app in your browser at: [http://localhost:5173](http://localhost:5173)

#### Production Mode

To build the application for production:

```bash
# Using npm
npm run build

# Or using yarn
yarn build
```

Serve the built files locally to test:

```bash
# Using npm
npm run preview

# Or using yarn
yarn preview
```

---

## Project Structure

```plaintext
management-app-front/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page-level components
│   ├── styles/         # Global and component-specific styles
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   └── main.tsx        # Entry point of the app
├── vite.config.ts      # Vite configuration
├── package.json        # Dependency definitions and scripts
└── tsconfig.json       # TypeScript configuration
```

---

## Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the project for production.
- **`npm run preview`**: Preview the production build locally.

---

## Dependencies

- **React**: Frontend library
- **Vite**: Build tool
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework

---

## Contributing

Contributions are welcome! If you’d like to contribute, please fork the repository and create a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For questions or support, feel free to reach out:

- GitHub: [KadriGbemi](https://github.com/KadriGbemi)

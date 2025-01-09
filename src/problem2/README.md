
# **Token Swap Application**

A React-based token swap application built with **Ant Design** for UI components.

---

## **Features**
- Swap tokens with dynamic dropdowns.
- Displays token prices and images in dropdown options.
- Calculates and displays the swapped amount.
- Fully responsive and styled using Ant Design.

---

## **Tech Stack**
- **React**: For building the user interface.
- **Ant Design**: For pre-built UI components and styling.
- **Vite**: For fast development and bundling.
- **pnpm**: For efficient package management.

---

## **Setup Instructions**

### **Prerequisites**
Make sure you have the following installed on your system:
- **Node.js**: Version 16 or later.
- **pnpm**: Installed globally. To install, run:
  ```bash
  npm install -g pnpm
  ```

---

### **Install Dependencies**
Install all required dependencies using **pnpm**:
```bash
pnpm install
```

---

### **Run the Development Server**
Start the development server:
```bash
pnpm dev
```

This will start the server, and the app will be accessible at `http://localhost:5173`.

---

## **Project Structure**

```plaintext
.
├── src
│   ├── components
│   │   └── index.tsx    # App file
│   ├── hooks
│   │   └── useTokenSwap.ts # Custom hook for token swap logic
│   ├── services
│   │   └──apiService.ts # Api call
│   │   └──stringService.ts # String service
│   ├── main.tsx            # Entry point for the React app
│   └── style.css           # Global CSS (reset styles, if required)
├── public                  # Public assets
├── package.json            # Project dependencies and scripts
├── pnpm-lock.yaml          # Lockfile for pnpm
└── vite.config.ts          # Vite configuration
```

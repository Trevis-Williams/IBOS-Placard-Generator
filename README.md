# Logistics Placard Generator

A modern web application for creating professional, print-ready logistics placards for warehouse and shipping operations.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://trevis-williams.github.io/IBOS-Placard-Generator/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)](https://tailwindcss.com/)

**[View Live Demo](https://trevis-williams.github.io/IBOS-Placard-Generator/)**

---

## Screenshot

<!-- Add a screenshot of the app here -->
![Placard Generator Preview](screenshot.png)

---

## Features

- **Real-time Live Preview** - See your placard update instantly as you type
- **Comprehensive Form Fields** - Task Number, Receiving/Ship Dates, Locations, Priority, and Description
- **QR Code Generation** - Automatically generates a scannable QR code linked to the task
- **Multi-page Support** - Long descriptions automatically paginate across multiple pages
- **Color Customization** - Customize text and background colors to match your needs
- **Print-ready Output** - Optimized for standard Letter size (8.5" x 11") printing
- **Auto-save** - All form data persists to localStorage between sessions
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Priority Badges** - Visual priority indicators (Low, Medium, High, Urgent)

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 18](https://reactjs.org/) | UI Framework |
| [TypeScript](https://www.typescriptlang.org/) | Type Safety |
| [Vite](https://vitejs.dev/) | Build Tool & Dev Server |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |
| [react-qr-code](https://www.npmjs.com/package/react-qr-code) | QR Code Generation |
| [Lucide React](https://lucide.dev/) | Icons |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Trevis-Williams/IBOS-Placard-Generator.git
   cd IBOS-Placard-Generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

---

## Usage

1. **Fill in the form fields** on the left panel:
   - Enter the Task Number
   - Set Receiving and Ship dates
   - Add creator name and attention recipient
   - Specify logical location and destination
   - Set pallet/box count and priority level
   - Add any additional notes or description

2. **Preview your placard** in real-time on the right panel

3. **Customize appearance** using the color pickers for text and background

4. **Click "Print Placard"** to open the print dialog with a formatted, print-ready document

---

## Deployment

This app is deployed automatically to GitHub Pages via GitHub Actions.

**Live URL:** [https://trevis-williams.github.io/IBOS-Placard-Generator/](https://trevis-williams.github.io/IBOS-Placard-Generator/)

To deploy your own instance:
1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Set the source to "GitHub Actions"
4. Push to the `main` branch to trigger a deployment

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

**Trevis Williams**

- GitHub: [@Trevis-Williams](https://github.com/Trevis-Williams)

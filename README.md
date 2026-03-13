# 📊 Token Usage Dashboard

A modern, glassmorphism-styled web application built to monitor, calculate, and track your AI API token usage (Google Gemini & OpenAI) entirely locally within your browser.

![Dashboard Preview](https://github.com/choonsik/token-dashboard/raw/main/public/favicon.svg) *(Note: Add a real screenshot here later!)*

## ✨ Features

- **🔒 100% Client-Side Security**: Your API keys never leave your browser. They are safely stored within your browser's local storage (`localStorage`). There is zero backend server involved.
- **🎨 Premium Aesthetic Design**: Features a beautiful dark mode and translucent glassmorphism interface built with Vanilla CSS and modern keyframe animations.
- **🧮 Live Token Calculator**: Paste any text prompt to calculate the exact token cost. Uses the official Google Gemini `countTokens` API for absolute accuracy.
- **📈 Usage Tracking**: Since some APIs (like Gemini) don't expose endpoint quotas directly via the API Key, this app intelligently tracks and accumulates the tokens you calculate locally, giving you a simulated "Monthly Quota" progress bar.
- **🚀 One-Click Deployment**: Fully configured to automatically deploy to GitHub Pages with zero hassle (`npm run deploy`).

## 🛠️ Technology Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid, Glassmorphism)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Hosting**: GitHub Pages (`gh-pages`)

## 🚀 Getting Started

To run this project on your local machine:

1. **Clone the repository**
   ```bash
   git clone https://github.com/choonsik/token-dashboard.git
   cd token-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

## 🌐 Live Demo

You can view the live deployed version of this dashboard here:
👉 **[Launch Token Dashboard](https://choonsik.github.io/token-dashboard/)**

## 💡 How to Use

1. Get your API Key from [Google AI Studio](https://aistudio.google.com/app/apikey) or [OpenAI Platform](https://platform.openai.com/api-keys).
2. Paste the key into the **API Configuration** section and click Connect.
3. Paste any text into the **Token Calculator** at the bottom to see how many tokens it consumes. The progress bar in the dashboard will automatically increment to track your usage locally!

---
*Built with React and Vite.*

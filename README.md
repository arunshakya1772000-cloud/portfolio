# Arun Kumar - Video Editing Portfolio

A modern, responsive React.js portfolio website built with Vite, Tailwind CSS, and Framer Motion, inspired by premium cinematic aesthetics.

## 🚀 Quick Setup Instructions

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Install Dependencies
Open your terminal in the root folder (`c:\Desktop\portfolio` or equivalent) and run:
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
> Open [http://localhost:5173](http://localhost:5173) in your browser to view the portfolio.

---

## 🛠 Troubleshooting: "My Website Looks Like Raw HTML!"
If you launch the project and there is **no styling/CSS applied**, this means Tailwind CSS did not compile correctly. Try these exact steps to fix it:

1. **Check your Vite installation:** Sometimes global or cached files conflict. Delete `node_modules` and `package-lock.json`, then run `npm install` again.
2. **Re-initialize Tailwind:** If `postcss.config.js` or `tailwind.config.js` got modified manually, ensure they match the default syntax. We are using **Tailwind v3.4.19**. Running `npm install -D tailwindcss@3 postcss autoprefixer` strictly forces the stable v3 config.
3. **Verify the Index CSS:** Make sure `src/index.css` contains: 
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
4. **Vite PostCSS:** Our `vite.config.js` strictly links the `postcss.config.js` to avoid loose failures on Windows environments.

---

## 🎬 How to Add New Videos (Frontend-only)
Currently, the `/upload` page acts as an **Admin Mockup**. 

1. Navigate to your app and append `/upload` to the URL. (e.g., `http://localhost:5173/upload`).
2. Fill out the form. You can select **YouTube URL** or **Local File** (`.mp4`).
3. If you select **Local File**, the browser creates an ephemeral URL (`blob:http...`) for the video and caches the video data securely within your browser's `localStorage`.
4. Return to the home page; your new video will appear instantly!

*Note: Frontend uploads via `createObjectURL` are session-based. For permanent storage, connect the backend.*

---

## 🔌 Optional Backend Scaffold (Ready for Production)

Inside the `backend-scaffold` folder, you will find a fully configured Node.js API using **Express.js, Mongoose (MongoDB), and Multer**.

### Setup the Backend:
1. Open a new terminal and navigate to: `cd backend-scaffold`
2. Create `uploads/` matching directory: `mkdir uploads`
3. Install dependencies: `npm install express mongoose cors multer dotenv`
4. Start the server (runs on `http://localhost:5000`):
   ```bash
   node server.js
   ```

### Connecting React to Backend:
In `src/pages/UploadForm.jsx` and `src/components/VideoSection.jsx`:
- Replace `localStorage.setItem(...)` with an Axios or Fetch `POST` request to `http://localhost:5000/api/videos`. Example:
  ```javascript
  const formData = new FormData();
  formData.append('video', videoFile);
  formData.append('title', title);
  // ... append other fields ...
  fetch('http://localhost:5000/api/videos', { method: 'POST', body: formData })
  ```
- Replace `localStorage.getItem(...)` with a `GET` fetch to that same endpoint.

### Deploying the Files (Vercel / AWS S3)
- **Frontend**: Link your GitHub repo to [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/). The build command is `npm run build` and the output directory is `dist`.
- **Media Assets**: `multer` currently saves to the local disk `uploads/`. On a real production server (like Vercel, which limits filesystem use), you MUST shift to **AWS S3 Cloud Storage** using libraries like `multer-s3` and `@aws-sdk/client-s3`.

---

## 📐 Included Components Architecture
- `Navbar.jsx`: Smooth scroll hash links and routing config.
- `Hero.jsx`: Intro typography and call-to-action buttons.
- `About.jsx`: Two-column professional summary component.
- `Skills.jsx`: Animated dark grid mapping out software (Premiere Pro, Resolve, etc.) using `lucide-react` icons.
- `GalleryGrid.jsx`: Masonry layout showcasing portfolio work filtering (replaces basic Projects structure per new constraints).
- `VideoSection.jsx`: The parent housing the gallery, `<VideoCard>`, and Search logic.
- `VideoCard.jsx` & `VideoModal.jsx`: ARIA-labeled, accessible components providing modal overlay parsing logic for native DOM `<video>` elements and YouTube `<iframe>` elements.
- `UploadForm.jsx`: The data entry portal ensuring mock-to-schema parity.
- `ContactForm.jsx`: Contact integration routing mapping external social APIs (`href`) and basic localized form validation.

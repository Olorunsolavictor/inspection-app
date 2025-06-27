# Inspection App

This is a responsive inspection web application built using Nuxt 3, Vue 3, TypeScript, Pinia, and Tailwind CSS. The application allows users to access their device's back camera, take step-by-step inspection photos, preview them, and manage the images locally via the browser.

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/victor-olorunsola/inspection-app.git
cd inspection-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Summary of Features Implemented

Camera Access:

- The application attempts to access the device's back-facing camera using the MediaDevices API.
- If the camera is not available or permission is denied, an appropriate error message is shown.

Step-by-Step Photo Capture:

- Users are guided through a predefined sequence of inspection steps.
- One image is captured per step, and each is labeled accordingly.

Image Validation:

- Captured images are compressed and checked to ensure they are under 2MB.
- Both JPEG and PNG formats are supported depending on the compression.

Gallery View:

- Captured images are displayed in a simple gallery view with labels.
- Users can clear all saved images when needed.

State Management:

- Pinia is used for managing camera overlay state and tracking inspection progress.

Styling and Layout:

- Tailwind CSS is used for styling.
- The layout is mobile-first and responsive.

SEO and Metadata:

- Basic head meta tags are added using `useHead()`.

## Known Limitations or Assumptions

- Devices without a back-facing camera will not be able to use the capture functionality.
- All images are stored locally using localStorage; no cloud storage or backend integration is included.
- There is a download option for captured images.
- No formal testing framework has been implemented yet. The project is structured to support Vitest or Playwright if required.

## Folder Structure Overview

```
pages/
  index.vue             # App entry point
  camera.vue
  gallery.vue
components/
camera/

  home/
    Header.vue          # App title and header
    Card.vue            # Step instructions and preview
    ButtonSection.vue   # Primary action buttons
composables/
  useCamera.ts          # Camera logic and helpers
stores/
  camera.ts             # State management for inspection steps
assets/css/
  app.css               # Global styles
```

## Deployment

The project is deployed using platforms such as Vercel.
https://inspection-app-one.vercel.app

## Author

Victor Olorunsola
Frontend Developer

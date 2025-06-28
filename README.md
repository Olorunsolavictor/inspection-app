# (Vehicle) Inspection App

A mobile-first web application for guided vehicle inspections. Built with Nuxt 3, Vue 3, TypeScript, and Tailwind CSS, the app enables users to take photos using their device's back camera, follow a defined inspection process, preview each capture, and manage images locally.

---

## Setup Instructions

### Requirements

- Node.js v18 or higher
- npm v9 or higher
- Git

### Installation

```bash
git clone https://github.com/Olorunsolavictor/inspection-app.git
cd my-nuxt-app
npm install
```

### Development

```bash
npm run dev
```

The application will be available at:  
[http://localhost:3000](http://localhost:3000)

### Running Tests

```bash
npm run test
```

Vitest is configured for component-level testing.

---

## How to Use the App

1. **Launch the App**  
   Open the application on a supported mobile browser (iOS Safari or Android Chrome). The app is optimized for mobile and expects a device with a working back-facing camera.

2. **Start Inspection**  
   Proceed through the onboarding steps. These are introductory and guide the user before the actual inspection.

3. **Camera Access**  
   Allow the browser to access your device’s camera. If access is denied or no camera is detected, an error message is displayed.

4. **Photo Capture**  
   You’ll be guided to take photos for each inspection step:

   - Front View
   - Left Side View
   - Right Side View
   - Back View
   - Chassis Number
   - Dashboard View
   - Interior Back View

   Tap the screen to focus. A countdown ring indicates when the photo will be taken. After capture, you can either approve (verify) the photo or retake it.

5. **Image Review**  
   Confirmed images are stored locally. The app automatically moves to the next step in the flow.

6. **Gallery View**  
   After all steps are completed, a gallery is shown containing all the approved images.

7. \*\*Download Captures
   Users can download individual images from the gallery.

---

## Summary of Features Implemented

- Camera access using `getUserMedia` API with support for back-facing camera
- Compatible with iOS and Andriod
- Portrait and landscape orientation handling
- Capture validation: images must be JPG/PNG under 2MB
- Local storage of confirmed images
- Optional download of each captured image
- Guided inspection flow using defined steps
- Tap-to-focus with animated countdown
- Overlay-based capture interface
- Final gallery view of all captured photos
- Built-in state management using Pinia
- Modular architecture using composables and scoped styles
- Fully responsive layout using Tailwind CSS
- Testable components using Vitest

---

## Known Limitations or Assumptions

- The app (Capture) only works on devices with a functional rear-facing camera
- Captures are stored in browser `localStorage` which may be cleared by the browser
- Orientation detection may behave differently on older iOS versions due to limited support for screen orintation
- No server or cloud storage integration is provided; all operations are frontend-on
- Test coverage is minimal but setup is in place

---

## Deployment

This project is deployed and accessible at:

**[https://inspection-app-one.vercel.app/](https://inspection-app-one.vercel.app/)**

---

Developed by Victor Olorunsola

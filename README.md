(WIP)

- [x] Remove the nav bar and the Explore tab
- [x] Add cooldown to the vibe buttons
- [x] Add context window to the vibe buttons
- [x] Add the add/edit vibe screen
- [ ] Add the settings screen
- [x] Add the button press raindrop animation

# Vibelink

Vibelink is a React Native application designed to let users express their emotions through customizable "vibes." Users can create, edit, and send vibes with emojis, colors, and text, making communication more expressive and fun.

## Features

- **Vibe Buttons**: Create and customize vibe buttons with emojis, colors, and text.
- **Cooldown Animation**: Prevent spamming with a cooldown animation for vibe buttons.
- **Context Menu**: Long-press vibe buttons to access options like edit, move, or delete.
- **Add/Edit Vibe Screen**: Easily add or modify vibes with a user-friendly interface.
- **Settings Screen**: Customize the app's behavior, such as emoji visibility on vibe buttons.
- **Raindrop Animation**: Enjoy a falling emoji animation when sending vibes.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/vibelink.git
   cd vibelink
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add a `.env` file to the root of the project with the following content (replace with your Firebase project details):

   ```env
   FIREBASE_API_KEY=your-api-key
   FIREBASE_AUTH_DOMAIN=your-auth-domain
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_STORAGE_BUCKET=your-storage-bucket
   FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   FIREBASE_APP_ID=your-app-id
   FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

4. Start the development server:
   ```bash
   npm run start
   ```

## Scripts

- `npm run start`: Start the Expo development server.
- `npm run android`: Run the app on an Android emulator or device.
- `npm run ios`: Run the app on an iOS simulator or device.
- `npm run web`: Run the app in a web browser.
- `npm run reset-project`: Reset the project to a blank state.
- `npm run test`: Run unit tests with Jest.
- `npm run lint`: Lint the codebase.

## Project Structure

```
.vscode/           # VS Code settings
app/               # Application screens and layouts
components/        # Reusable UI components
constants/         # App-wide constants
hooks/             # Custom React hooks
models/            # TypeScript models
scripts/           # Utility scripts
utils/             # Helper functions and utilities
assets/            # Fonts, images, and other static assets
```

## Development

This project uses [Expo](https://expo.dev/) for development. To get started, ensure you have the Expo CLI installed:

```bash
npm install -g expo-cli
```

### TypeScript

The project is written in TypeScript for type safety and better developer experience. Ensure your editor is configured to support TypeScript.

### Linting

Run the following command to lint the codebase:

```bash
npm run lint
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [Apache License, Version 2.0](LICENSE).

## Acknowledgments

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Firebase](https://firebase.google.com/)

---

Happy vibing! 🎉

# Runbook: AiLingo Setup and Execution

This document provides detailed instructions on how to download and run the AiLingo project on your local machine. The project consists of two main folders: `app` and `api`.

## Prerequisites

Make sure you have the following programs installed on your machine:

- Node.js (version 20.12.2 or higher)
- npm (version 10.5.0 or higher)
- Expo CLI
- Git

## Cloning the Repository

To start, clone the project repository from GitHub.

```sh
git clone https://https://github.com/deleonjuan/AiLingo
cd AiLingo
```

## Project Setup

The project consists of two main folders:

1. `app`: The mobile app developed with Expo.
2. `api`: The backend application developed with Astro.

### In the root folder just run
    npm install

This will install the dependencies, also it will automatically run a postinstall command that prebuilds the expo app
  

### Mobile App Setup (app)

1.  **Navigate to the mobile app folder:**

    ```sh
    cd app
    ```

2.  **Set the API URL:**

    ```sh
    touch .env.local
    ```

    Open the `.env.local` file in your favorite text editor and add the following line:

    ```env
    EXPO_PUBLIC_API_URL=http://192.168.1.70:4321/api/
    ```

    > [!NOTE]
    > During August 2024, there will be a service available that you can use. \
    > However, you must provide your own Google Gemini API key via the app: \
    > `EXPO_PUBLIC_API_URL=https://ai-lingo-mauve.vercel.app/api/`. \
    > If you point to this service, you won't need to run the backend, as you'll be using the cloud version.

    By default, the Astro app exposes the API to the local network, and the API path is `/api`.

5.  **Run the application:**

    - For Android devices:

      ```sh
      npm run android
      ```

    - For iOS devices:

      ```sh
      npm run ios
      ```

### Backend App Setup (api)
In another terminal:
1. **Navigate to the backend app folder:**

   ```sh
   cd api
   ```

2. **Create a `.env` file in the `api` folder and add your Google Generative AI API key:**

   ```sh
   touch .env
   ```

   Open the `.env` file in your favorite text editor and add the following line:

   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=<your_api_key_here>
   ```

   > [!IMPORTANT]  
   > If you provide an API key via the app, it will override the one declared in the `.env` file.

3. **Run the backend server:**

   ```sh
   npm run dev
   ```

## Verification

To verify everything is working correctly:

1. **Ensure the backend server is running without errors.** You should see messages in the terminal indicating that the server is active and listening for requests.
2. **Open the mobile app on an emulator or physical device.** Make sure the app can communicate with the backend correctly.

## Troubleshooting

- **Connection errors:** Ensure the backend is running and that the backend URL in the mobile app is correct.
- **Expo issues:** Make sure you have the latest version of Expo CLI installed and run `expo doctor` to diagnose potential issues.
- **Dependency errors:** Run `npm install` in both folders (`app` and `api`) to ensure all dependencies are installed correctly.

## Conclusion

By following these steps, you should be able to set up and run AiLingo on your local machine without issues. If you encounter any problems, feel free to review the official documentation of the technologies used or contact the development team for assistance.

---

Thank you for contributing to AiLingo!

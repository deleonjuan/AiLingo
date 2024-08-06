# Runbook: Configuración y Ejecución de AiLingo

Este documento proporciona instrucciones detalladas sobre cómo descargar y ejecutar el proyecto AiLingo en tu máquina local. El proyecto consta de dos carpetas principales: `app` y `api`.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- Node.js (versión 20.12.2 o superior)
- npm (versión 10.5.0 o superior)
- Expo CLI
- Git

## Clonando el Repositorio

Para comenzar, clona el repositorio del proyecto desde GitHub.

```sh
git clone https://https://github.com/deleonjuan/AiLingo
cd AiLingo
```

## Configuración del Proyecto

El proyecto consta de dos carpetas principales:

1. `app`: La aplicación móvil desarrollada con Expo.
2. `api`: La aplicación backend desarrollada con Astro.

### Configuración de la Aplicación Móvil (app)

1.  **Navega a la carpeta de la aplicación móvil:**

    ```sh
    cd app
    ```

2.  **Instala las dependencias:**

    ```sh
    npm install
    ```

3.  **Prebuild:**

    ```sh
    npm run prebuild
    ```

4.  **Indica la url de la api**

    ```sh
    touch .env.local
    ```

    Abre el archivo `.env.local` en tu editor de texto favorito y agrega la siguiente línea:

    ```env
    EXPO_PUBLIC_API_URL=http://192.168.1.70:4321/api/
    ```

    > [!NOTE]  
    > durante el mes de agosto 2024 habrá un servicio disponible que podrás usar, \
    > sin embargo debes proveer tu propia api key de google gemini desde la aplicación \
    > EXPO_PUBLIC_API_URL=https://ai-lingo-mauve.vercel.app/api/ \
    > si apuntas a este servicio no sera necesario hacer funcionar el backend, pues estaras usando la version de la nube

    by default the astro app exposes the api to the local network and the api path is `/api`

5.  **Ejecuta la aplicación:**

    - Para dispositivos Android:

      ```sh
      npm run android
      ```

    - Para dispositivos iOS:

      ```sh
      npm run ios
      ```

### Configuración de la Aplicación Backend (api)

1. **Navega a la carpeta de la aplicación backend:**

   ```sh
   cd api
   ```

2. **Crea un archivo `.env` en la carpeta `api` y agrega tu API key de Google Generative AI:**

   ```sh
   touch .env
   ```

   Abre el archivo `.env` en tu editor de texto favorito y agrega la siguiente línea:

   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=<tu_api_key_aqui>
   ```

   > [!IMPORTANT]  
   > Si provees una api key desde la app, esta sera tomada en vez de la declarada en el archivo `.env`

3. **Instala las dependencias:**

   ```sh
   npm install
   ```

4. **Ejecuta el servidor backend:**

   ```sh
   npm run dev
   ```

## Verificación

Para verificar que todo está funcionando correctamente:

1. **Asegúrate de que el servidor backend esté corriendo sin errores.** Deberías ver mensajes en la terminal indicando que el servidor está activo y escuchando peticiones.
2. **Abre la aplicación móvil en un emulador o dispositivo físico.** Asegúrate de que la aplicación pueda comunicarse con el backend correctamente.

## Solución de Problemas

- **Errores de conexión:** Verifica que el backend está corriendo y que la URL del backend en la aplicación móvil es correcta.
- **Problemas con Expo:** Asegúrate de tener la última versión de Expo CLI instalada y ejecuta `expo doctor` para diagnosticar posibles problemas.
- **Errores con dependencias:** Ejecuta `npm install` en ambas carpetas (`app` y `api`) para asegurarte de que todas las dependencias estén correctamente instaladas.

## Conclusión

Siguiendo estos pasos, deberías poder configurar y ejecutar AiLingo en tu máquina local sin problemas. Si encuentras algún inconveniente, no dudes en revisar la documentación oficial de las tecnologías utilizadas o contactar al equipo de desarrollo para obtener asistencia.

---

¡Gracias por contribuir a AiLingo!

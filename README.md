## Prerequisites

You will need to [install docker](https://www.docker.com/get-started/) on your local machine.

If you do not have docker, go here to download and install: <https://www.docker.com/get-started/>

## Installation

1. Create a .env file inside the project's root directory.

2. Copy and paste variables from `.env.example` into `.env` and complete with your database credentials

3. Install NPM packages

   ```sh
   npm i
   ```

4. Generate a version of Prisma Client that is tailored to the models.

   ```js
   npx prisma generate
   ```

5. Open Docker Desktop Application and go back to your VSCode terminal and run this command:

   ```sh
   docker compose up -d
   ```

6. Once your database is ready, push your prisma schema to the database.

   ```sh
   npx prisma db push
   ```

7. Finally start your dev server.

   ```sh
   npm run dev
   ```

Open your browser and visit <http://localhost:3000> to see the application running.

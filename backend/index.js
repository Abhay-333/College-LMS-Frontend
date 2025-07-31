// A Vercel deployment of a Node.js Express server does not use app.listen().
// Instead, the Vercel builder wraps your app, so you only need to export it.

import dotenv from "dotenv";
import express from "express";
import dbConnection from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// It's a good practice to keep this for local development,
// but Vercel handles environment variables separately.
dotenv.config();

const app = express();

// Set up CORS dynamically for Vercel environments.
// We use the VERCEL_URL environment variable (which Vercel provides automatically)
// and fall back to a local URL for development.
// For production, you might want to hardcode your final domain.
const allowedOrigins = [
  "https://college-lms-2.onrender.com/", // Your existing origin
  "https://college-lms.vercel.app", // Added your new frontend Vercel URL
  process.env.FRONTEND_URL, // A custom env variable you can set on Vercel
  `https://${process.env.VERCEL_URL}`, // Vercel's automatic deployment URL
  "http://localhost:5173" // For local development testing
];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      // Check if the origin is in our allowed list
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// We need to call the database connection here, within a handler,
// because Vercel's serverless functions are stateless.
// The `app.listen` block won't run.
dbConnection();

app.use("/", authRouter);

// CRITICAL CHANGE: Export the app instance directly.
// Vercel's builder will handle listening on the correct port and routing.
export default app;


// import dotenv from "dotenv";
// import express from "express";
// import dbConnection from "./config/db.js";
// import authRouter from "./routes/auth.routes.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "https://college-lms.vercel.app/",
//     credentials: true,
//   })
// );

// app.use("/", authRouter);

// app.listen(process.env.PORT || 6000, () => {
//   dbConnection();
// });

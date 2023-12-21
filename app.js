import express from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import morgan from "morgan";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import error from "./middlewares/error.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

// app.get("/favicon.ico", (req, res) => res.status(204));
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Unicorn Shop API",
      version: "1.0.0",
      description: "Document for A UnicornShopAPI project",
    },
    component: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          schema: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    secutity: {
      bearerAuth: []
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
// parse json request body
app.use(bodyParser.json());

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: true }));

// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
// app.options("*", cors);

// v1 api routes
app.use("/api", routes);

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);


export default app;


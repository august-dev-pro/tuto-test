"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const db_1 = __importDefault(require("./config/db"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const reservationRoutes_1 = __importDefault(require("./routes/reservationRoutes"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const taskerSpecificsRoutes_1 = __importDefault(require("./routes/taskerSpecificsRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const path_1 = __importDefault(require("path"));
const serviceOptionRoutes_1 = __importDefault(require("./routes/serviceOptionRoutes"));
const authController_1 = __importDefault(require("./controllers/authController"));
const express_2 = __importDefault(require("express"));
const authDisgress = (0, express_2.default)();
dotenv_1.default.config();
const app = (0, express_1.default)();
// Configuration CORS
const corsOptions = {
    origin: [
        "http://localhost:3000",
        "https://easy-reserve-backend-production.up.railway.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
};
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token,Origin, X-Requested-With, Content, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("optionsSuccessStatus", 200);
    res.setHeader("origin", [
        "http://localhost:3000",
        "https://easy-reserve-backend-production.up.railway.app",
    ]);
    next();
});
(0, db_1.default)();
app.use(express_1.default.json());
// Routes
// Route par défaut
app.get("/", (req, res) => {
    try {
        res.status(200).json({
            statusCode: 200,
            message: "Bienvenue sur EasyReserve API",
        });
    }
    catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Une erreur est survenue.",
        });
    }
});
app.use("/user", userRoutes_1.default);
app.use("/comment", commentRoutes_1.default);
app.use("/reservation", reservationRoutes_1.default);
app.use("/service", serviceRoutes_1.default);
app.use("/taskerSpecifics", taskerSpecificsRoutes_1.default);
app.use("/review", reviewRoutes_1.default);
app.use("/auth", authRoutes_1.default);
app.use("/sign-out", authDisgress.post("/", authController_1.default.logoutUser));
app.use("/serviceOptions", serviceOptionRoutes_1.default);
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "uploads")));
// Middleware pour lister toutes les routes
/* app.use("/", (req, res, next) => {
  console.log("Liste des routes disponibles:");
  const routes = listRoutes(app._router);
  routes.forEach((route) => {
    console.log(`${route.method} -> ${route.path}`);
  });
  next();
}); */
// Middleware de gestion des erreurs
app.use(errorMiddleware_1.default);
exports.default = app;

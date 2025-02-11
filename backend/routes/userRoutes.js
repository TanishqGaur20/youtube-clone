import { register, login } from "../controllers/userController.js";

// Define the user routes
export function userRoutes(app) {
    // Register route
    app.post("/register", register);

    // Login route
    app.post("/login", login);
}

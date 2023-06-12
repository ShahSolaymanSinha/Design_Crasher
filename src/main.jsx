import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ThemeProvider } from "./providers/ThemeProvider";
import AuthProvider from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "sweetalert2/dist/sweetalert2.css";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ThemeProvider>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>
);

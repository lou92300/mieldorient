import { useEffect, useState } from "react";

function RequireAuth(Component) {
    return function ProtectedAdminRoutes(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            async function updateAuth() {
                const response = await fetch(
                    // à vérifier la route 
                    "/api/v1/check-token",
                    {
                        credentials: "include",
                    }
                );
                console.log(response)

                const authJson = await response.json();
                if (response.ok || authJson.user.role === "admin") {
                    setIsAuthenticated(true);
                }
            }

            updateAuth();
        }, []);

        if (isAuthenticated) return <Component {...props} />;
    };
}

export default RequireAuth;
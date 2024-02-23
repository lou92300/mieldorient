import { Routes, Route } from "react-router-dom";

import UserLayout from "../views/layout/UserLayout";
import Home from "../views/user/Home/index";
import ArticleDetail from "../views/user/Articles/Detail";
import CharactersList from "../views/user/Characters/List";
import CharacterDetail from "../views/user/Characters/Detail";
import Dashboard from "../views/user/Dashboard";
import Register from "../views/Auth/Register";
import Login from "../views/Auth/Login";
import PrivacyPolicy from "../views/user/PrivacyPolicy";
import TermsOfUse from "../views/user/TermsOfUse";
import requireAuth from "../HOC/ProtectedUserRoutes";

function UserRoutes() {

    const DashboardWithAuth = requireAuth(Dashboard);

    return (
        <Routes>
             {/* on définit le layout de l'utilisateur comme étant le layout par défaut de l'admin sera passé dans le HOC pour vérifier si il a les droits 
            système de routes imbriquées, les sous composants seront invoqués grâçe à au composant Outlet 
            */}
            <Route path="/" element={<UserLayout />}>
                <Route>
                    <Route index element={<Home />} />
                    <Route path="article/:id" element={<ArticleDetail />} />
                    <Route
                        path="liste-des-personnages"
                        element={<CharactersList />}
                    />
                    <Route
                        path="liste-des-personnages/:id"
                        element={<CharacterDetail />}
                    />
                    <Route
                        path="authentification/inscription"
                        element={<Register />}
                    />
                    <Route
                        path="authentification/connexion"
                        element={<Login />}
                    />
                    <Route
                        path="utilisateur/compte"
                        element={<DashboardWithAuth />}
                    />

                    <Route
                        path="politique-de-confidentialite"
                        element={<PrivacyPolicy />}
                    />

                    <Route
                        path="conditions-d-utilisation"
                        element={<TermsOfUse />}
                    />
                </Route>
            </Route>
            <Route path="*" element={<h1>404</h1>} />
            
        </Routes>
    );
}

export default UserRoutes;

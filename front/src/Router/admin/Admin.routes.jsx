import { Routes, Route } from "react-router-dom";

import AdminLayout from "../views/layout/AdminLayout";
import Admin from "../views/admin/Home";
import requireAuth from "../../HOC/ProtectedAdminRoutes";
import Datas from "../views/admin/Datas";
import Characters from "../views/admin/DatasList/Characters";
import Articles from "../views/admin/DatasList/Articles";
import Categories from "../views/admin/DatasList/Categories";
import AddCategory from "../../views/admin/Dataslist/AddCategory";
import Users from "../views/admin/DatasList/Users";
import UpdateCategory from "../views/admin/DatasList/UpdateCategory";

function AdminRoutes() {
    // on applique le HOC requireAuth sur le layout de l'admin
    const LayoutWithAuth = requireAuth(AdminLayout);

    return (
        <Routes>
            {/* on définit le layout de l'admin comme étant le layout par défaut de l'admin sera passé dans le HOC pour vérifier si il a les droits 
            système de routes imbriquées, les sous composants seront invoqués grâçe à au composant Outlet 
            */}
            <Route path="/admin" element={<LayoutWithAuth />}>
                <Route path="" index element={<Admin />} />
                <Route path="donnees" element={<Datas />} >
                    <Route path="articles" element={<Articles />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="categories/ajouter" element={<AddCategory />} />
                    <Route path="categories/modifier/:id" element={<UpdateCategory />} />
                    <Route path="personnages" element={<Characters />} />
                    <Route path="utilisateurs" element={<Users />} />
                </Route>
                
                <Route path="*" element={<h1>404</h1>} />
            </Route>

            
        </Routes>
    );
}

export default AdminRoutes;
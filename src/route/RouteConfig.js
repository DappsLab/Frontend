import MainPage from "../container/MainPage";
import Login from "../container/Login";

export const routes = [
    {
        path:'/Login',
        component:Login,
    },
    {
        path: '/',
        component:MainPage,
    }
];
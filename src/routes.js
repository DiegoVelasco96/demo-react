import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';

const routes = [
    {
        index: 1,
        path: '/',
        exact: true,
        component: Products
    },
    {
        index: 2,
        path: '/categories',
        component: Categories
    }
]

export default routes;
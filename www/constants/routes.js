import configureStore from '../stores';
import Layout from '../components/Layout/Layout';
import BlogsPage from '../containers/BlogsPage';
import BlogPage from '../containers/BlogPage';
import TagPage from '../containers/TagPage';
import ArchivePage from '../containers/ArchivePage';
import CategoryPage from '../containers/CategoryPage';
import AboutPage from '../containers/AboutPage';

const routes = [
  { path: '/',
    component: Layout,
    indexRoute: { component: BlogsPage },
    childRoutes: [
      {path: 'blog', component: BlogsPage },
      {path: 'blog/p/:pageNum', component: BlogsPage},
      {path: 'blog/:blogName', component: BlogPage},
      {path: 'tag', component: TagPage },
      {path: 'category', component: CategoryPage },
      {path: 'archive', component: ArchivePage },
      {path: 'about', component: AboutPage }
    ]
  }
];
export default routes;

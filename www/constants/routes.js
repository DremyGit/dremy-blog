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
      { path: 'blog(/p/:pageNum)', component: BlogsPage },
      { path: 'blog/:blogName', component: BlogPage },
      { path: 'tag', component: TagPage },
      { path: 'tag/:tagName(/p/:pageNum)', component: BlogsPage },
      { path: 'category', component: CategoryPage },
      { path: 'category/:categoryName(/p/:pageNum)', component: BlogsPage },
      { path: 'archive', component: ArchivePage },
      { path: 'archive/:year(/p/:pageNum)', component: BlogsPage },
      { path: 'about', component: AboutPage },
      { path: 'search/:words(/p/:pageNum)', component: BlogsPage },
    ],
  },
];
export default routes;

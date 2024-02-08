import { createLazyFileRoute } from '@tanstack/react-router';
import { HomePage } from './home/-home.page';

export const Route = createLazyFileRoute('/')({
  component: HomePage,
});

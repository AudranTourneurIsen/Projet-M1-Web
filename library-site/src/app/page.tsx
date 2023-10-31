import { FC, ReactElement } from 'react';
import { Menu } from '@/components/Menu';

const menu = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
];

const Home: FC = (): ReactElement => (
  <>
    <Menu menu={menu} />
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Home page
    </main>
  </>
);

export default Home;

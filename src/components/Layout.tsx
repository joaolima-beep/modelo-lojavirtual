import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  itemCount: number;
}

export default function Layout({ itemCount }: LayoutProps) {
  const { pathname, key } = useLocation();
  const scrollKey = pathname === '/' ? key : pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [scrollKey]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header itemCount={itemCount} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

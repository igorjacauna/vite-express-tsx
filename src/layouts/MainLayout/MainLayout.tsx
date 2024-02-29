import { ReactNode } from 'react';
import { defineScripts, defineStyles } from '../../runtime/page';
import { Footer } from './components/Footer';
import TopBar from './components/TopBar/TopBar';

type MainLayoutProps = {
  children: ReactNode | ReactNode[];
  showHead?: boolean;
};

export default function MainLayout({
  children,
}: MainLayoutProps) {
  defineStyles([
    {
      innerHTML: '@content(src/assets/styles/base.css)',
    },
  ]);
  defineScripts([
    {
      src: '@source(src/layouts/MainLayout/MainLayout.script.ts)',
      defer: true,
    },
  ]);
  return (
    <section>
      <div className='hero' data-theme='dark'>
        <TopBar />
      </div>
      <main className='container'>{children}</main>
      <Footer />
    </section>
  );
}
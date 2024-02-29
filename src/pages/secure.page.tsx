import { defineAuthPage, definePageHead } from './../runtime/page';
import MainLayout from '../layouts/MainLayout';

export default defineAuthPage((_, { extra }) => {
  definePageHead({
    title: 'Restricted page to authenticated users',
  });
  return function RestrictPage() {
    return (
      <MainLayout showHead={false}>
        <div className='container'>Restricted</div>
        <pre>{JSON.stringify(extra, null, 2)}</pre>
      </MainLayout>
    );
  };
});
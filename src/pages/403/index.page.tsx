import { definePage, definePageHead } from '../../runtime/page';

export default definePage(tes => {
  definePageHead({
    title: 'Denied',
  });
  tes.params;

  return function NotAllowed() {
    return (
      <main>
        <h1>Acesso negado</h1>
      </main>
    );
  };
});
import { SnackProvider, useSnackBar } from './Provider';
import { ThemeProvider } from '@rneui/themed';

const MyChild = () => {
  const { show, hide } = useSnackBar();
  return (
    <button
      onClick={() => {
        show('this is demo');
        show('this is demo', [
          {
            icon: 'dmeo',
            onClick: () => console.log('yo'),
          },
          (id) => ({
            icon: 'demoe',
            onClick: ()=>hide(id),
          }),
        ]);
      }}>
      Toast
    </button>
  );
};

const OtherChild = ({ children }: any) => <>{children}</>;

export default function App() {
  return (
    <ThemeProvider>
      <SnackProvider>
        <OtherChild>
          <MyChild />
        </OtherChild>
      </SnackProvider>
    </ThemeProvider>
  );
}

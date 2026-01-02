import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from './routers/Root';
import AuthProvider from './providers/AuthProvider';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import './App.css';

function ToastWithTheme() {
  const { theme } = useTheme();
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
    />
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastWithTheme />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

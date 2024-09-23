import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';

import { baselightTheme } from './theme/DefaultColors';
import AuthCheck from './views/authentication/auth/AuthCheck';

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  return (
    <ThemeProvider theme={theme}>
      <AuthCheck />

      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
}

export default App;

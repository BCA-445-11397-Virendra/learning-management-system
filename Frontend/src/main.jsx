import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import { appStore } from './app/store'
import CustomLoader from './pages/CustomLoader'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <CustomLoader>
        <App />
        <Toaster />
      </CustomLoader>
    </Provider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "@/components/ui/provider"
import { BrowserRouter } from 'react-router-dom'
import { Toaster, toaster } from "@/components/ui/toaster"

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <Provider>
        <Toaster />
        <App />
      </Provider>
    </BrowserRouter>
)

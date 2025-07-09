import { RouterProvider } from "react-router-dom"
import router from "./router"
import { Toaster } from "sonner"

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
      <Toaster/>
    </div>
  )
}

export default App
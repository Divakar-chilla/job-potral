import { RouterProvider } from "react-router-dom"
import "./components/styles/Style.css"
import Routes from "./components/routes/Routes"
import { Toaster } from "react-hot-toast"


const App = () => {
    return (<>
    
        <RouterProvider router={Routes}></RouterProvider>
        <Toaster></Toaster>
        
        
        </>
    )
}
export default App
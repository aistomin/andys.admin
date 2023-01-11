import './App.css'
import VideoTable from "./VideoTable.jsx";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
  return (
    <div className="App">
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <main>
                <VideoTable/>
            </main>
        </ThemeProvider>
    </div>
  )
}

export default App

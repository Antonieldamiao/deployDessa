import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import './index.css'
import Routes from "./routes";

function App() {
  const [viewHeight, setViewHeight] = useState(window.innerHeight);

  const handleHeightResize = () => {
    if (window.innerWidth > 800) {
      setViewHeight(window.innerHeight);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleHeightResize);

    return () => {
      window.removeEventListener("resize", handleHeightResize);
    };
  }, []);

  const theme = {
    primaryColor: "#4D4D4D",
    secondaryColor: "#000",
    textColor: "#000000",
    backgoundColor: "#eee",
    viewportHeightPercent: viewHeight / 100,
  };

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;

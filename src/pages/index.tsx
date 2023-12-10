import React, { FormEvent, StrictMode, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import {
  Button,
  Card,
  StyledEngineProvider,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import config from "../../config";
import "../stylesheets/index.css";
import "../stylesheets/common.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  CustomSnackbar,
  CustomSnackbarStateType,
  ThemeToggle,
} from "squarecomponents";
import { MuiOtpInput } from "mui-one-time-password-input";

const isBrowser = typeof window !== "undefined";

export const Head: HeadFC = () => <title>{config.appName}</title>;

const IndexPage: React.FC<PageProps> = () => {
  // get stuff from local storage
  let localStorageTheme;
  if (isBrowser) {
    localStorageTheme = window.localStorage.getItem("theme");
  } else {
    localStorageTheme = null;
  }
  let defaultThemeState: "dark" | "light";
  if (localStorageTheme !== null) {
    defaultThemeState = localStorageTheme === "dark" ? "dark" : "light";
  } else {
    defaultThemeState = config.defaultThemeState;
    if (isBrowser) {
      window.localStorage.setItem("theme", config.defaultThemeState);
    }
  }
  // state
  const [themeState, changeThemeState] = useState(defaultThemeState);
  const [snackbarState, changeSnackbarState] =
    useState<CustomSnackbarStateType>({
      isOpen: false,
      message: "",
      severity: "error",
    });
  const [username, changeUsername] = useState("");
  const [roomNumber, changeRoomNumber] = useState("");

  // functions
  const customChangeThemeState = (newThemeState: "dark" | "light") => {
    changeThemeState(newThemeState);
    if (isBrowser) {
      window.localStorage.setItem("theme", newThemeState);
    }
  };
  const navigateToSinglePlayer = () => {
    window.open(config.singlePlayerLink, "_blank");
  };

  const handleJoinRoomSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const ws = new WebSocket("ws://localhost:10011/ws");
    ws.addEventListener("open", (_) => {
      let messageToSend = {
        game: "truecolor",
        gameData: {
          roomNumber,
          username,
        },
      };
      ws.send(JSON.stringify(messageToSend));
    });
  };
  // misc
  let currentTheme = createTheme({
    palette: {
      mode: themeState,
    },
    typography: {
      fontFamily: config.defaultFont,
    },
  });
  return (
    <StrictMode>
      <ThemeProvider theme={currentTheme}>
        <StyledEngineProvider injectFirst>
          <Card className="main" square>
            <div className="inside-main">
              <Typography variant="h1" color="primary">
                {config.appName}
              </Typography>
              <form>
                <form onSubmit={handleJoinRoomSubmit}>
                  <TextField
                    value={username}
                    label="username"
                    onChange={(e) => changeUsername(e.target.value)}
                    required
                  />

                  <MuiOtpInput
                    value={roomNumber}
                    onChange={(newValue) => changeRoomNumber(newValue)}
                    length={5}
                    TextFieldsProps={{ required: true, label: "room id" }}
                  />
                  <Button type="submit" variant="outlined">
                    join
                  </Button>
                </form>
              </form>
              <Button variant="outlined" onClick={navigateToSinglePlayer}>
                single player
              </Button>
              <ThemeToggle
                themeState={themeState}
                customChangeThemeState={customChangeThemeState}
              />
            </div>
          </Card>
          <CustomSnackbar
            snackbarState={snackbarState}
            changeSnackbarState={changeSnackbarState}
          />
        </StyledEngineProvider>
      </ThemeProvider>
    </StrictMode>
  );
};

export default IndexPage;

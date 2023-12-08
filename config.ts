interface Config {
  appName: string;
  defaultThemeState: "dark" | "light";
  defaultFont: string;
  serverUrl: string;
  singlePlayerLink: string;
}
const config: Config = {
  appName: "multicolor",
  defaultThemeState: "dark",
  defaultFont: "roboto",
  serverUrl: "http://localhost:10011/",
  singlePlayerLink: "https://thepmsquare.github.io/truecolor",
};

export default config;

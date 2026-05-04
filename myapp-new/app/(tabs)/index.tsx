import { WebView } from "react-native-webview";

export default function HomeScreen() {
  return (
    <WebView
      source={{
        uri: "https://17fa4b5d-9197-419c-be2e-9f6187a017ed-00-3sf2btqku6kyu.pike.replit.dev:3000",
      }}
      style={{ flex: 1 }}
    />
  );
}

import { WebView } from "react-native-webview";

export default function HomeScreen() {
  return (
    <WebView
      source={{ uri: "https://connect-t-h650.onrender.com" }}
      style={{ flex: 1 }}
    />
  );
}

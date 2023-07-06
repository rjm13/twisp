import { registerRootComponent } from "expo"
import App from "./App"
import TrackPlayer from "react-native-track-player"
import { PlaybackService } from './services';

registerRootComponent(App)
//TrackPlayer.registerPlaybackService(() => require("./services.js"))
TrackPlayer.registerPlaybackService(() => PlaybackService);
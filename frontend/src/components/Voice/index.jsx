import "./VoiceChat.css"
import { useState } from "react";
import AgoraUIKit from "agora-react-uikit";

export default function Voice() {
  const [videoCall, setVideoCall] = useState(true);

  const rtcProps = {
    appId:  process.env.AGORA_API_ID,
    channel: process.env.AGORA_CHANNEL_NAME,
    token: process.env.AGORA_TOKEN
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };
  AgoraUIKit.onAutoplayFailed = () => {
    // Create button for the user interaction.
    const btn = document.createElement("button");
    // Set the button text.
    btn.innerText = "Click me to resume the audio/video playback";
    // Remove the button when onClick event occurs.
    btn.onClick = () => {
      btn.remove();
    };
    // Append the button to the UI.
    document.body.append(btn);
  };

  return videoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }} className="video-feed">
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <h3 onClick={() => setVideoCall(true)}>Join</h3>
  );
}

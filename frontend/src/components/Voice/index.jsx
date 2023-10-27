import "./VoiceChat.css"
import { useState } from "react";
import AgoraUIKit from "agora-react-uikit";

export default function Voice() {
  const [videoCall, setVideoCall] = useState(false);

  // // const rtcProps = {
  // //   appId:  "ae917d6dd31d40dbb0d3e15ac98445e6",
  // //   channel: "League",
  // //   token: "007eJxTYLjNqscRdV/D6+Zb15bp26WEjxyQUDsqseXoVa7wurnz90YrMCSmWhqap5ilpBgbppgYpCQlGaQYpxqaJiZbWpiYmKaa/ZPRSG0IZGRwkY9lZWSAQBCfjcEnNTG9NJWBAQBBSR61"
  // // };
  // // const callbacks = {
  // //   EndCall: () => setVideoCall(false),
  // // };
  // // AgoraUIKit.onAutoplayFailed = () => {
  // //   // Create button for the user interaction.
  // //   const btn = document.createElement("button");
  // //   // Set the button text.
  // //   btn.innerText = "Click me to resume the audio/video playback";
  // //   // Remove the button when onClick event occurs.
  // //   btn.onClick = () => {
  // //     btn.remove();
  // //   };
  // //   // Append the button to the UI.
  // //   document.body.append(btn);
  // // };

  // return videoCall ? (
  //   <div style={{ display: "flex", width: "100vw", height: "100vh" }} className="video-feed">
  //     {/* <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} /> */}
  //   </div>
  // ) : (
  //   <h3 onClick={() => setVideoCall(true)}>Join</h3>
  // );
  return (
    <></>
  )
}

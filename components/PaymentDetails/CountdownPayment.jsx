import CountDown from "react-native-countdown-component-maintained";

export default function CountdownPayment({
  lastTimeDate,
  timeToShow = ["H", "M", "S"],
}) {
  return (
    <CountDown
      until={lastTimeDate}
      size={13}
      timeToShow={timeToShow}
      timeLabels={{ m: null, s: null, h: null }}
      showSeparator={true}
      digitStyle={{ backgroundColor: "#FA2C5A" }}
      digitTxtStyle={{ color: "white", fontWeight: "bold" }}
    />
  );
}

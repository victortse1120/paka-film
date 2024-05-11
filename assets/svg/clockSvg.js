import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ClockSvg = (props) => (
  <Svg fill="none" viewBox="0 0 18 18" {...props}>
    <Path
      fill="#FFC800"
      d="M0 9a9 9 0 1 1 18 0A9 9 0 0 1 0 9Zm8.088-2.621v2.535a.917.917 0 0 0 .989 1h3.794a.969.969 0 0 0 .448-.095.947.947 0 0 0 .491-1.042.9.9 0 0 0-.886-.7c-.938 0-1.875-.005-2.813 0-.165 0-.2-.045-.2-.205.006-1.32 0-2.64 0-3.96a1.854 1.854 0 0 0-.022-.312.909.909 0 0 0-1.8.226V6.38"
    />
  </Svg>
);
export default ClockSvg;

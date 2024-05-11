import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SettingSvg = (props) => (
  <Svg fill={props.fill} width={24} height={24} {...props}>
    <Path
      d="M18 6A6 6 0 1 0 6 6a6 6 0 0 0 12 0ZM0 20.474c0 1.762 4.5 3.523 12 3.523 7.036 0 12-1.762 12-3.523 0-3.524-4.708-7.047-12-7.047-7.5 0-12 3.523-12 7.047Z"
    />
  </Svg>
)
export default SettingSvg


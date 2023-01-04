import React from 'react';
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

const ToolTip = ({ content, children }) => (
  <Tooltip
      overlay={content}
      mouseLeaveDelay={0.2}
      mouseEnterDelay={0.1}
      defaultVisible={false}
      placement="bottom"
      overlayClassName="bbs-tooltip"
      overlayInnerStyle={{
          color: "#2DA5FC",
          background: "#FFFFFF",
          width: "223px",
          height: " 33px",
          fontSize: "18px",
          textAlign: "center",
          opacity: "1",
         
          position:"absolute",
        
      }}
  >
      {children}
  </Tooltip>
);

export default ToolTip;
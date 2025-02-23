import "./index.scss";

import { CommonProps } from "utils/common/props";
import React from "react";
import classNames from "classnames";

const getStyleSize = (size: number | string | undefined) => {
  // const unitRegexp = /^(em|px)/;
  if (typeof size === "number") {
    return size + "px";
  }
  return size;
};

export interface ScrollBoxProps extends CommonProps {
  height?: number;
  maxHeight?: number;

  /** 스크롤 굵기 설정 */
  type?: "thin" | "transparent";
  children?: React.ReactElement | React.ReactElement[] | React.ReactNode;
  classes?: string;
}
// eslint-disable-next-line react/display-name
const ScrollBox = React.forwardRef<HTMLDivElement, ScrollBoxProps>(
  (
    { height, maxHeight, type, classes, children }: ScrollBoxProps,
    ref?: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        className={classNames(
          "scroll-box scroll-box-root",
          {
            "scroll-box__type-thin": type === "thin",
            "scroll-box__type-transparent": type === "transparent",
          },
          classes
        )}
        style={{
          height: getStyleSize(height),
          maxHeight: getStyleSize(maxHeight),
        }}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

export default ScrollBox;

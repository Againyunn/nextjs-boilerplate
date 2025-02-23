import React, { CSSProperties } from 'react';

export interface CommonProps {
  /**`Component`에 추가 되는 CSS class */
  classes?: string;

  /**`Component`에 추가 되는 CSS style<br/>(`style` property는 대부분 사용이 안된다, 주로 `classes` 사용하여서 style 적용) */
  style?: CSSProperties;
}

export interface ForwardCommonProps extends CommonProps {
  /**`Component`의 children */
  children?: React.ReactNode;
}

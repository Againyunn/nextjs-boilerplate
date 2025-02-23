"use client";

import "./index.scss";

import Draggable, {
  DraggableBounds,
  DraggableData,
  DraggableEvent,
} from "react-draggable";
import React, { useEffect, useRef, useState } from "react";

import { CommonProps } from "utils/common/props";
import ScrollBox from "components/atom/ScrollBox";
import XButton from "components/atom/Xbutton";
import classNames from "classnames";
import dynamic from "next/dynamic";
import useModal from "hooks/useModal";
import useWindowSize from "hooks/useWindowSize";

const ModalPortal = dynamic(() => import("utils/modal/ModalPortal"), {
  ssr: false,
});

export interface PopupProps extends CommonProps {
  /**`Popup`의 제목 영역 */
  title: string | React.ReactNode;

  /**`Popup`의 제목 영역하단에 들어가는 text */
  helpText?: string;

  /**`Popup`의 우측 하단에 삽입되는 항목, 일반적으로 팝업을 닫거나 상호작용을 하는 버튼을 넣어준다 */
  footer: React.ReactNode;

  /**`Popup`의 좌측 측하단에 삽입되는 항목 */
  footerLeft?: React.ReactNode;

  /**`Popup`의 보여줌 여부를 결정한다 */
  open: boolean;

  /**`Popup`을 종료하기 위한 함수 */
  onClose: () => void;

  /**팝업의 너비를 지정해준다, ex) `"100px"` */
  width?: string;

  /**children이 표시 되는 영역의 높이를 제한한다 */
  contentMaxHeight?: number;

  /**입력을 하게 되면 `Popup` 우측에 접히는 영역을 추가로 표시해준다 */
  folder?: React.ReactNode;
  classes?: string;
  children?: React.ReactNode;
}

export interface Position {
  x: number;
  y: number;
}

const Popup: React.FC<PopupProps> = ({
  title,
  helpText,
  footer,
  footerLeft,
  open,
  onClose,
  width = "600px",
  contentMaxHeight,
  classes,
  children,
  folder,
}) => {
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const [bound, setBound] = useState<DraggableBounds>({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  const handleDrag = (e: DraggableEvent, ui: DraggableData): void | false => {
    const { x, y } = position;
    setPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };

  const nodeRef = React.useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [windowInnerWidth, windowInnerHeight] = useWindowSize();
  const folderPopup = useModal();

  useEffect(() => {
    if (open) {
      const popupWidth = (popupRef.current as HTMLElement).offsetWidth;
      const popupHeight = (popupRef.current as HTMLElement).offsetHeight;

      setBound({
        left: -(windowInnerWidth - popupWidth) / 2 + 10,
        top: -(windowInnerHeight - popupHeight) / 2 + 10,
        right: (windowInnerWidth - popupWidth) / 2 - 10,
        bottom: (windowInnerHeight - popupHeight) / 2 - 10,
      });
    } else {
      setPosition({ x: 0, y: 0 });
      setBound({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      });
    }
  }, [open, windowInnerHeight, windowInnerWidth]);

  // // Outbound 클릭시 꺼지는 기능 && ESC 누를때 꺼지는 기능
  // const handleKeydownEscape = useCallback(
  //   (event: KeyboardEvent) => {
  //     if (event.key === 'Escape' && onClose) {
  //       onClose();
  //     }
  //   },
  //   [onClose],
  // );
  // const handleClickOutside = useCallback((e: MouseEvent) => {
  //   if (popupRef.current && !(popupRef.current! as any).contains(e.target)) {
  //     onClose();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (open) {
  //     // document.addEventListener('click', handleClickOutside);
  //     window.addEventListener('keyup', handleKeydownEscape);
  //   } else {
  //     // document.removeEventListener('click', handleClickOutside);
  //     window.removeEventListener('keyup', handleKeydownEscape);
  //   }
  //   return () => {
  //     window.removeEventListener('keyup', handleKeydownEscape);
  //   };
  // }, [open, handleKeydownEscape]);

  // useEffect(() => {
  //   // closed상태였는데, folder에 데이터가 들어오면? open시켜주기
  //   if (folderPopup.opened === false && folder) {
  //     folderPopup.openPopup();
  //   }
  // }, [folder, folderPopup]);

  return (
    <ModalPortal>
      <div className={classNames("popup-back-root", { on: open })} />
      <Draggable
        nodeRef={nodeRef as React.RefObject<HTMLElement>}
        handle=".tit"
        defaultPosition={{ x: 0, y: 0 }}
        position={position}
        onDrag={handleDrag}
        bounds={bound}
      >
        <div
          ref={nodeRef}
          className={classNames(
            "popup-root",
            {
              on: open,
            },
            classes
          )}
        >
          <div ref={popupRef} className="inner">
            <div
              className="popup-left"
              style={{
                width: `${width}`,
              }}
            >
              <div className={`popup-head ${helpText ? "help" : ""}`}>
                <p className="tit">
                  {title}
                  {helpText && <div className="popup-top-help">{helpText}</div>}
                </p>

                <XButton onClick={onClose} />
              </div>
              {contentMaxHeight ? (
                <ScrollBox classes="popup-content" maxHeight={contentMaxHeight}>
                  {folder && onClose && <XButton onClick={onClose} />}
                  <div className="content">{children}</div>
                </ScrollBox>
              ) : (
                <div className="popup-content">
                  {folder && (
                    <div
                      className={classNames("popup-folder-button", {
                        on: folderPopup.opened,
                      })}
                      onClick={
                        folderPopup.opened
                          ? folderPopup.closePopup
                          : folderPopup.openPopup
                      }
                    >
                      {/* <ChevronLeftIcon /> */}
                    </div>
                  )}
                  <div className="content">{children}</div>
                </div>
              )}
              <div className="popup-foot">
                <div className="popup-foot-left">{footerLeft}</div>
                <div className="popup-foot-right">{footer}</div>
              </div>
            </div>
            {folder && (
              <div
                className={classNames("popup-right", {
                  on: folderPopup.opened,
                })}
              >
                {folder}
              </div>
            )}
          </div>
        </div>
      </Draggable>
    </ModalPortal>
  );
};

export default Popup;

"use client";

import Draggable, {
  DraggableBounds,
  DraggableData,
  DraggableEvent,
} from "react-draggable";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { CommonProps } from "utils/common/props";
import ScrollBox from "components/atom/ScrollBox";
import XButton from "components/atom/Xbutton";
import clsx from "clsx";
import dynamic from "next/dynamic";
import useModal from "hooks/useModal";
import useWindowSize from "hooks/useWindowSize";

const ModalPortal = dynamic(() => import("utils/modal/ModalPortal"), {
  ssr: false,
});

export interface PopupProps extends CommonProps {
  title: string | React.ReactNode;

  helpText?: string;

  footer: React.ReactNode;
  footerLeft?: React.ReactNode;

  open: boolean;
  onClose: () => void;

  width?: string;

  /**children이 표시 되는 영역의 높이를 제한 */
  contentMaxHeight?: number;

  /**입력을 하게 되면 `Popup` 우측에 접히는 영역을 추가로 표시 */
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

  // Outbound 클릭시 꺼지는 기능 && ESC 누를때 꺼지는 기능
  const handleKeydownEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) {
        onClose();
      }
    },
    [onClose]
  );
  // const handleClickOutside = useCallback((e: MouseEvent) => {
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   if (popupRef.current && !(popupRef.current! as any).contains(e.target)) {
  //     onClose();
  //   }
  // }, []);

  useEffect(() => {
    if (open) {
      window.addEventListener("keyup", handleKeydownEscape);
      // window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("keyup", handleKeydownEscape);
      // window.removeEventListener("click", handleClickOutside);
    }
    return () => {
      window.removeEventListener("keyup", handleKeydownEscape);
    };
  }, [open, handleKeydownEscape]);

  return (
    <ModalPortal>
      <div
        className={clsx(
          {
            hidden: !open,
          },
          {
            "block fixed top-0 left-0 right-0 bottom-0 bg-black z-40 items-center justify-center opacity-30":
              open,
          }
        )}
      />
      <Draggable
        nodeRef={nodeRef as React.RefObject<HTMLElement>}
        // tit 지우면 안됨! (drag event target : tit)
        handle=".tit"
        defaultPosition={{ x: 0, y: 0 }}
        position={position}
        onDrag={handleDrag}
        bounds={bound}
      >
        <div
          ref={nodeRef}
          className={clsx(
            {
              hidden: !open,
            },
            {
              "z-40 overflow-hidden fixed left-0 right-0 top-0 bottom-0  flex items-center justify-center":
                open,
            },
            classes
          )}
        >
          <div
            ref={popupRef}
            className="relative bg-white shadow-0-4-12-rgba-0-0-0-16  flex  rounded-md"
          >
            <div
              className="flex-col p-2"
              style={{
                width: `${width}`,
              }}
            >
              <div
                // tit 지우면 안됨! (drag event target : tit)
                className={`tit h-50px w-full top-0 left-0 bg-white cursor-move flex items-center border-b-2`}
              >
                <p className="flex-1 overflow-initial text-xl font-medium">
                  {title}
                  {helpText && <div className="h-88px">{helpText}</div>}
                </p>

                <XButton onClick={onClose} />
              </div>
              {contentMaxHeight ? (
                <ScrollBox
                  classes="pt-9px px-20px"
                  maxHeight={contentMaxHeight}
                >
                  {folder && onClose && <XButton onClick={onClose} />}
                  <div className="">{children}</div>
                </ScrollBox>
              ) : (
                <div className="pt-9px px-20px">
                  {folder && (
                    <div
                      className={clsx(
                        "absolute top-70px right-0 w-16px h-28px rounded-8px bg-white border-color-dadee5 border-1px hover:bg-white hover:filter-drop-shadow-0-4-6-rgba-25-31-40-12",
                        {
                          "right-317px pt-5px pl-4px": folderPopup.opened,
                        }
                      )}
                      onClick={
                        folderPopup.opened
                          ? folderPopup.closePopup
                          : folderPopup.openPopup
                      }
                    ></div>
                  )}
                  <div className="py-8px">{children}</div>
                </div>
              )}
              <div className="flex w-full px-28px py-14px">
                <div className="flex w-full justify-start">{footerLeft}</div>
                <div className="flex w-full justify-end">{footer}</div>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </ModalPortal>
  );
};

export default Popup;

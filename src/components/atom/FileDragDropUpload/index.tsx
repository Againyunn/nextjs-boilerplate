"use client";

import { ChangeEvent, useCallback, useEffect, useRef } from "react";

export interface DragDropAreaProps {
  /** 2개 이상의 파일 입력 가능 여부 지정 */
  multiple?: boolean;
  /** upload 비활성화 여부 지정 */
  disabled?: boolean;
  /** Drag&Drop 안에 출력될 항목 지정 */
  children?: React.ReactNode;
  /** drap&drop 높이 지정 */
  height?: number;
  onChange: (files: File[]) => void;
  classes?: string;
  // /** upload 시 envent 비활성화 여부 지정 */
  // notEvent?: boolean;
}

export interface FileState {
  file: File;
  name: string;
  password: string | null;
  isChanging: boolean;
  isIncluded: boolean;
}

const FileDragDropArea = ({
  multiple,
  disabled,
  height,
  onChange,
  classes,
  children,
}: DragDropAreaProps) => {
  // 드래그 이벤트를 감지하는 ref 참조변수
  const dragRef = useRef<HTMLDivElement | null>(null);

  // // 드래그 중일때와 아닐때의 스타일을 구분하기 위한 state 변수
  // const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragIn = (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOut = (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    // setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer?.files) {
      // setIsDragging(true);
    }
  };
  // handleDrop 함수의 deps로 사용되므로 useCallback으로 감싸지 않으면 매번 리렌더링됨
  const onChangeFiles = useCallback(
    // 타입 추론이 모호하거나 이미 제품에 사용중인 any 타입은 린트 예외 처리
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      if (disabled) {
        return;
      }
      let selectFiles: File[] = [];
      if (e.type === "drop") {
        // 드래그 앤 드롭 했을때
        selectFiles = e.dataTransfer.files;
      } else {
        // "파일 첨부" 버튼을 눌러서 이미지를 선택했을때
        selectFiles = e.target.files;
      }
      if (selectFiles.length < 1) {
        onChange([]);
        return;
      }

      let tempFiles: File[] = [];
      // for (const file of selectFiles) {
      //   tempFiles = [...tempFiles, file];
      // }
      tempFiles = Array.from(selectFiles);

      if (multiple) {
        onChange(tempFiles);
      } else {
        onChange([tempFiles[0]]);
      }
    },
    [multiple, onChange]
  );

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      // setIsDragging(false);
    },
    [onChangeFiles]
  );

  // 4개의 이벤트에 Listener 등록 (마운트 될때)
  const initDragEvents = (): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  };

  const resetDragEvents = (): void => {
    // 4개의 이벤트에 Listener를 삭제 (언마운트 될때)
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  };

  useEffect(() => {
    // || !notEvent
    if (!disabled) {
      initDragEvents();
    }
    return () => resetDragEvents();

    // disabled, notEvent가 deps 추적에 빠져있지만, 이를 추가할 시 연쇄 로직 모두에 영향을 끼치므로 린트 무시 처리로 결정
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initDragEvents, resetDragEvents]);

  return (
    <div
      className={classes}
      ref={dragRef}
      style={{
        height: height,
      }}
    >
      <input
        hidden
        type="file"
        id="fileUpload"
        style={{ display: "none" }}
        multiple={multiple}
        disabled={disabled}
      />

      <div className={"file-dragdrop-upload"} ref={dragRef}>
        {children ?? "드래그 드롭"}
      </div>
    </div>
  );
};

export default FileDragDropArea;

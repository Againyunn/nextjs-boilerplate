import { useState } from "react";

const useIsHovering = () => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  return { isHovering, setIsHovering };
};

export default useIsHovering;

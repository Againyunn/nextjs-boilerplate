import { Boundary } from "components/atom/Boundary";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return <Boundary>{children}</Boundary>;
}

import { ReactNode } from "react";
async function layout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export default layout;

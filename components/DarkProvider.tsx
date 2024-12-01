import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

const DarkProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default DarkProvider;

import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <div className="h-screen flex justify-center">{children}</div>;
};

export default PageContainer;

import React, { ReactNode } from "react";

const ProductPageLayout = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-[1800px] mx-auto">{children}</div>;
};

export default ProductPageLayout;

import { ReactNode } from 'react';

/**
 * 工具页专用layout
 * 不包含header和footer,由ToolDetailLayout组件自己管理布局
 */
export default function ToolsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

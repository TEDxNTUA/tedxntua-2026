import { Outlet } from "react-router-dom";

export default function EventLayout({ children }) {
  const content = children ?? <Outlet />;
  return (
    <div className="container mx-auto px-4 py-6">
      <div>{content}</div>
    </div>
  );
}

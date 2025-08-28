import { useThemeStore } from "../store/useThemeStore";
import { LuLoaderPinwheel } from "react-icons/lu";

const PageLoader = () => {
  const { theme } = useThemeStore();
  return (
    <div className="min-h-screen flex items-center justify-center" data-theme={theme}>
      <LuLoaderPinwheel className="animate-spin size-10 text-primary" />
    </div>
  );
};
export default PageLoader;
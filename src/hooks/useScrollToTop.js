import { useEffect } from "react";

const useScrollToTop = (dep) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
};

export default useScrollToTop;

import { useEffect, useState } from "react";

export const useDelay = (ms: number) => {
  const [isDelayed, setIsDelayed] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsDelayed(false);
    }, ms);
  }, []);

  return { isDelayed };
};

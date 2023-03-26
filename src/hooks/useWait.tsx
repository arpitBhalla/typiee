import { useEffect, useState } from "react";

export const useWait = (seconds = 1000) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let timeout = setTimeout(() => {
      setIsLoading(false);
    }, seconds);
    () => {
      clearTimeout(timeout);
    };
  }, []);

  return { isLoading } as const;
};

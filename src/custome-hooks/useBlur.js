import { useEffect } from "react";

const useBlur = (cb, navigation) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", cb);

    return unsubscribe;
  });
};

export default useBlur;

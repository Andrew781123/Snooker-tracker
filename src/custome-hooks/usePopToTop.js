import React, { useEffect } from "react";
import { StackActions } from "@react-navigation/native";

const usePopToTop = navigation => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () =>
      navigation.dispatch(StackActions.popToTop())
    );

    return unsubscribe;
  });
};

export default usePopToTop;

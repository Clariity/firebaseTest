import React, { useEffect, useContext } from "react";
import { StoreContext, ActionType } from "../store/store";

function NotFound() {
  const { dispatch } = useContext(StoreContext);

  useEffect(() => {
    dispatch({ type: ActionType.SET_TITLE, payload: "Page Not Found" });
  }, [dispatch]);

  return <div>Page Not Found</div>;
}

export default NotFound;

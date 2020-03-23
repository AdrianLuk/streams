import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut } from "../actions";

const GoogleAuth = props => {
  const auth = useSelector(state => state.auth);
  const onAuthChange = isSignedIn => {
    if (isSignedIn) {
      props.signIn(auth.currentUser.get().getId());
    } else {
      props.signOut();
    }
  };
  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "38566974823-crdoa20cs6ah3n0j3pdtjiiet84rl32d.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();

          onAuthChange(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  }, []);
  return <div></div>;
};

export default GoogleAuth;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut } from "../actions";

const GoogleAuth = () => {
  const [gAuth, setGAuth] = useState(null);
  const auth = useSelector(state => state.auth);
  const { isSignedIn } = auth;
  const dispatch = useDispatch();
  const onAuthChange = isSignedIn => {
    if (isSignedIn) {
      dispatch(
        signIn(
          window.gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getId()
        )
      );
    } else {
      dispatch(signOut());
    }
  };
  const onSignInClick = () => {
    gAuth.signIn();
  };
  const onSignOutClick = () => {
    gAuth.signOut();
  };
  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button onClick={onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
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
          setGAuth(window.gapi.auth2.getAuthInstance());
          onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;

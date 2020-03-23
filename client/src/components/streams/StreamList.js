import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStreams } from "../../actions";
const StreamList = () => {
  const dispatch = useDispatch();
  const streams = useSelector(state => Object.values(state.streams));
  console.log(streams);
  useEffect(() => {
    dispatch(fetchStreams());
  }, []);
  return (
    <div>
      {streams?.map(stream => (
        <p key={stream.id}>{stream.title}</p>
      ))}
    </div>
  );
};

export default StreamList;

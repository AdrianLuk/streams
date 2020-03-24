import React, { useEffect, useRef } from "react";
import flv from "flv.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchStream } from "../../actions";
import { useParams } from "react-router-dom";

const StreamShow = () => {
  let player = null;
  const params = useParams();
  const videoRef = useRef();
  const dispatch = useDispatch();
  const stream = useSelector(state => state.streams[params.id]);
  const buildPlayer = () => {
    if (player || !stream) {
      return;
    }
    const { id } = params;
    player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`
    });
    player.attachMediaElement(videoRef.current);
    player.load();
  };
  useEffect(() => {
    console.log(stream);
  }, [stream]);
  useEffect(() => {
    dispatch(fetchStream(params.id));
  }, [dispatch, params.id]);
  useEffect(() => {
    buildPlayer();
    return () => player && player.destroy();
  }, [player]);
  if (!stream) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} controls />
      <h1>{stream.title}</h1>
      <h5>{stream.description}</h5>
    </div>
  );
};

export default StreamShow;

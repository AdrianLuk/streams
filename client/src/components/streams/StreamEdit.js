import _ from "lodash";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const stream = useSelector(state => state.streams[params.id]);

  const handleSubmit = formValues => {
    dispatch(editStream(params.id, formValues));
  };
  useEffect(() => {
    dispatch(fetchStream(params.id));
  }, [dispatch, params.id]);
  if (!stream) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        initialValues={_.pick(stream, "title", "description")}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default StreamEdit;

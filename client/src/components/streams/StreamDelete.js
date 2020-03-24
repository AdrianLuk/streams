import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Modal from "../Modal";
import { fetchStream, deleteStream } from "../../actions";

const StreamDelete = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const stream = useSelector(state => state.streams[params.id]);
  console.log(
    useSelector(state => state.streams),
    stream
  );
  const renderActions = () => {
    const { id } = params;
    return (
      <>
        <button
          onClick={() => {
            dispatch(deleteStream(id));
          }}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  };
  const renderContent = () => {
    if (!stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete the stream with title: ${stream.title}`;
  };
  useEffect(() => {
    dispatch(fetchStream(params.id));
  }, [dispatch, params.id]);
  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push("/")}
    />
  );
};

export default StreamDelete;

import PropTypes from "prop-types";
import axios from "axios";
import { useAuth } from "../context/authContext";

export default function Comment({ commentary, handleDeleteComment }) {
  const { user } = useAuth();

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/comments/${commentary.id}`,
        { withCredentials: true }
      );
      handleDeleteComment(commentary.id);
    } catch (err) {
      console.error(
        "Un problème est survenu lors du delete d'un commentaire: ",
        err
      );
    }
  };

  return (
    <div className="CommentItem">
      <h2>{commentary.username}</h2>
      <p>{commentary.content}</p>
      <small>{new Date(commentary.created_at).toLocaleString()}</small>
      {user && user.id === commentary.user_id ? (
        <div>
          <button onClick={handleDelete} type="button">
            Supprimer
          </button>
        </div>
      ) : null}
    </div>
  );
}

Comment.propTypes = {
  commentary: PropTypes.shape({
    id: PropTypes.string,
    user_id: PropTypes.string,
    username: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
};

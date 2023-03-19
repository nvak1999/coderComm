import React from "react";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import useAuth from "../../hooks/useAuth";
import { deleteComment } from "./commentSlice";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { getPosts } from "../post/postSlice";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CommentCard({ comment }) {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const [openModel, setOpenModel] = React.useState(false);

  const handleOpenModel = () => {
    setOpenModel(true);
  };
  const handleCloseModel = () => {
    setOpenModel(false);
  };

  const rederModal = (
    <Modal
      open={openModel}
      onClose={handleCloseModel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          sx={{ textAlign: "center" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Ask before deleting
        </Typography>
        <Typography
          sx={{ textAlign: "center", mt: 2 }}
          id="modal-modal-description"
        >
          Are you sure to delete this comment ?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
          <Button variant="outlined" onClick={() => deleteCmt(comment._id)}>
            Yes
          </Button>
          <Button variant="outlined" onClick={handleCloseModel}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );

  const deleteCmt = () => {
    const userId = user._id;
    dispatch(deleteComment(comment._id));
    dispatch(getPosts({ userId }));
  };
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Box>
            <Typography variant="caption" sx={{ color: "text.disabled" }}>
              {fDate(comment.createdAt)}
            </Typography>
            {user._id === comment.author._id ? (
              <Button
                onClick={() => handleOpenModel()}
                startIcon={<DeleteIcon />}
                sx={{ ml: 1 }}
                size="small"
                color="error"
              >
                Delete
              </Button>
            ) : null}
          </Box>
          {rederModal}
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;

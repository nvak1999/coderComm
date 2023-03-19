import React from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from "./PostReaction";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import { useDispatch } from "react-redux";
import { deletePost } from "./postSlice";
import PostForm from "./PostForm";
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
function PostCard({ post }) {
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [editMode, setEditMode] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  const postOption = (option) => {
    setAnchorEl(null);
    if (option === "Delete") handleOpenModel();
    if (option === "Edit") setEditMode(true);
  };
  const options = ["Edit", "Delete"];

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
          Are you sure to delete this post ?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() =>
              dispatch(
                deletePost({ postID: post._id, userId: post.author._id })
              )
            }
          >
            Yes
          </Button>
          <Button variant="outlined" onClick={handleCloseModel}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
  const renderOptionPost = (
    <Menu
      id="primary-search-account-menu"
      MenuListProps={{
        "aria-labelledby": "long-button",
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        horizontal: "right",
        vertical: "center",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5,
          width: "20ch",
        },
      }}
    >
      {options.map((option) => (
        <MenuItem
          key={option}
          selected={option === "Pyxis"}
          onClick={() => postOption(option)}
        >
          {option}
        </MenuItem>
      ))}
    </Menu>
  );
  const renderPost = (
    <Card>
      {rederModal}
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post?.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post?.createdAt)}
          </Typography>
        }
        action={
          <IconButton onClick={handleClick}>
            <MoreVertIcon sx={{ fontSize: 30 }} />
          </IconButton>
        }
      />
      {renderOptionPost}
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>

        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
  const renderPostForm = (
    <>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post?.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <IconButton onClick={handleClick}>
            <MoreVertIcon sx={{ fontSize: 30 }} />
          </IconButton>
        }
      />
      <PostForm post={post} handleClose={handleClose} />
    </>
  );
  if (editMode) return renderPostForm;
  else return renderPost;
}

export default PostCard;

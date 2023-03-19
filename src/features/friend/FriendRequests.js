import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Card,
  Box,
  Pagination,
  Grid,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFriendRequests, getFriendRequestsIncoming } from "./friendSlice";
import UserCard from "./UserCard";
import SearchInput from "../../components/SearchInput";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

function FriendRequests() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = React.useState(1);
  const [value, setValue] = React.useState("send");
  const { currentPageUsers, usersById, totalUsers, totalPages } = useSelector(
    (state) => state.friend
  );
  const users = currentPageUsers.map((userId) => usersById[userId]);
  const dispatch = useDispatch();

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  useEffect(() => {
    if (value === "send") dispatch(getFriendRequests({ filterName, page }));
    if (value === "recieve")
      dispatch(getFriendRequestsIncoming({ filterName, page }));
  }, [filterName, page, dispatch, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friend Requests
      </Typography>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Send" value="send" />
              <Tab label="Recieve" value="recieve" />
            </TabList>
          </Box>
        </TabContext>
      </Box>

      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalUsers > 1
                ? `${totalUsers} requests found`
                : totalUsers === 1
                ? `${totalUsers} request found`
                : "No request found"}
            </Typography>

            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, page) => setPage(page)}
            />
          </Stack>
        </Stack>

        <Grid container spacing={3} my={1}>
          {users.map((user) => (
            <Grid key={user._id} item xs={12} md={4}>
              <UserCard profile={user} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
}

export default FriendRequests;

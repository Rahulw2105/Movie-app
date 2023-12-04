import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  Typography,
} from "@mui/material";
import { Search } from "../../../../Pages/search/search";
import { fetchVideoForMovie } from "../../../utils/axios";
import React, { useState } from "react";
import { TransitionProps } from "@mui/material/transitions";

export const MoviesCard = (props) => {
  /* variables */
  const imgURL = "https://image.tmdb.org/t/p/w500";
  const [open, setOpen] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /* methods */
  const handleChangePage = (pageNumber) => {
    props.pageChanged(pageNumber);
  };

  const handleClick = (id) => {
    fetchVideoForMovie(id).then((res) => {
      console.log(res);
      const officalVideo = res.data.results.filter(
        (item) => item.official === true
      );
      if (officalVideo.length > 0) {
        setSelectedMovie({
          title: officalVideo[0].name,
          key: officalVideo[0].key,
        });
      }

      console.log(res);
      handleClickOpen();
    });
  };

  return (
    <div>
      <Grid container spacing={2}>
        {props?.results?.map((row) => (
          <Grid item xs={12} sm={2} md={4} key={row.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={imgURL + row.backdrop_path}
                  alt={row.title}
                />
                <CardContent>
                  <Typography>{row.title}</Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small">Relates: {row.release_date}</Button>
                <Button
                  size="small"
                  onClick={() => {
                    handleClick(row.id);
                  }}
                >
                  Watch Trailer
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            disabled={props.page > 1 ? false : true}
            onClick={() => handleChangePage(props.page - 1)}
          >
            Back
          </Button>
          <Button
            disabled={props?.total_pages > props.page ? false : true}
            onClick={() => handleChangePage(props.page + 1)}
          >
            Next
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`${selectedMovie?.title}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${selectedMovie?.key}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

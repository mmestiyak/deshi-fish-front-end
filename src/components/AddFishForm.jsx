import React, { useState } from "react";
import axios from "axios";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useForm } from "react-hook-form";
import { useFishes } from "../contexts/FishesContext";

const AddFishForm = () => {
  const { setFishesUpdated } = useFishes();

  const [fishImage, setFishImage] = useState();
  const [buttonDisable, setButtonDisable] = useState(false);
  const { register, handleSubmit, reset } = useForm(); // initialize the hook
  const onSubmit = async (data) => {
    if (!fishImage) {
      alert(
        "Upload image, If already uploaded wait a bit until upload complete"
      );
      return;
    }
    setButtonDisable(true);
    try {
      var addedFish = await axios.post("//localhost:8989/fishes", {
        ...data,
        image: fishImage,
      });
      setFishesUpdated(true);
      setButtonDisable(false);
      setFishImage();
      reset();
      alert("Fish Added Successfully");
      setFishesUpdated();
    } catch (err) {
      console.log(addedFish, err);
    }
  };
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const imageData = new FormData();
    imageData.set("key", "efce7d6b26649bb40c7ad81b4173af0f");
    imageData.append("image", image);
    try {
      const uploadedImage = await axios.post(
        "https://api.imgbb.com/1/upload",
        imageData
      );
      setFishImage(uploadedImage.data.data.display_url);
    } catch (err) {
      if (err) console.log(err);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Add fish
      </Typography>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item sm={6} xs={12}>
            <TextField
              label="Fish Name"
              variant="outlined"
              fullWidth
              inputRef={register({ required: true })}
              name="name"
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <label htmlFor="contained-button-file">
              <Button
                style={{ marginTop: ".3em" }}
                size="large"
                variant="contained"
                color="primary"
                component="span"
              >
                <span style={{ marginRight: "10px" }}>Upload Photo </span>
                <CloudUploadIcon />
              </Button>
            </label>
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              label="Weight (kg)"
              type="number"
              variant="outlined"
              inputRef={register({ required: true })}
              name="weight"
              step="0.01"
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              label="Price(৳)"
              type="number"
              variant="outlined"
              inputRef={register({ required: true })}
              name="price"
              step="any"
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={buttonDisable}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddFishForm;

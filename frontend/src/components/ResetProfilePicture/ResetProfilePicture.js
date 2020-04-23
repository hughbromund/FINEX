import React, { Component } from "react";
import Dropzone from "react-dropzone";
import ReactCrop from "react-image-crop";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Alert from "react-bootstrap/Alert";

import classes from "./ResetProfilePicture.module.css";
import "react-image-crop/dist/ReactCrop.css";

import history from "../../routing/History";

import {
  PUT_PROFILE_IMAGE,
  POST_CREATE_BUDGET,
  ACCOUNT_PATH,
} from "../../constants/Constants";

const imageMaxSize = 1000;
const acceptedFileTypes = ["png", "jpg"];

/*
 * Code Borrowed from:
 *
 * https://levelup.gitconnected.com/crop-images-on-upload-in-your-react-app-with-react-image-crop-5f3cd0ad2b35
 */

export default class ResetProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      src: null,
      crop: {
        unit: "%",
        width: 100,
        aspect: 1 / 1,
      },
      croppedImageUrl: null,
      success: false,
      error: false,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting");
    if (
      this.state.croppedImage === null ||
      this.state.croppedImage === undefined
    ) {
      console.log("No Image");
      return;
    }

    const formData = new FormData();

    formData.append("image", this.state.croppedImage);

    var res = await fetch(PUT_PROFILE_IMAGE, {
      method: "POST",
      credentials: "include",
      withCredentials: true,
      body: formData,
    });

    var response = await res.json();

    if (res.status === 200) {
      this.setState({ error: false, success: true });
    } else {
      this.setState({ error: true, success: false });
      console.log(response);
    }
  };

  handleFile = (e) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ src: fileReader.result });
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  onCropComplete = (crop) => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = this.getCroppedImg(this.imageRef, crop);
      //console.log(croppedImageUrl)
      // this.setState({ croppedImageUrl: croppedImageUrl });
    }
  };

  getCroppedImg(image, crop) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const reader = new FileReader();
    canvas.toBlob((blob) => {
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.dataURLtoFile(reader.result, "cropped.jpg");
      };
    });
  }

  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    //console.log(croppedImage)
    this.setState({
      croppedImage: croppedImage,
      croppedImageUrl: URL.createObjectURL(croppedImage),
    });
    console.log(this.state.croppedImageUrl);
  }

  render() {
    const { crop, profile_pic, src } = this.state;
    return (
      <div className={classes.wrapper}>
        <div className={classes.inner}>
          <h1>Update Profile Picture</h1>
          <Collapse in={this.state.success}>
            <div>
              <Alert variant="success">
                <Alert.Heading>Success</Alert.Heading>
                <p>You successfully updated your Profile Picture!</p>
                <p>
                  If you don't need to change it again, you can navigate back to
                  the Account Screen
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                  <Button
                    variant="outline-success"
                    onClick={() => history.push(ACCOUNT_PATH)}
                  >
                    Account
                  </Button>
                </div>
              </Alert>
            </div>
          </Collapse>
          <Collapse in={this.state.error}>
            <div>
              <Alert variant="danger">
                <Alert.Heading>Error</Alert.Heading>
                <p>
                  Something went wrong. Please try submitting again. If this
                  error continues please try checking your internet connection
                  or try restarting your Web Browser.
                </p>
              </Alert>
            </div>
          </Collapse>
          <Form onSubmit={this.handleSubmit}>
            <label htmlFor="profile_pic"></label>
            <input
              type="file"
              id="profile_pic"
              value={profile_pic}
              onChange={this.handleFile}
            />
            {src && (
              <ReactCrop
                src={src}
                crop={crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
            )}
            <hr />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Collapse in={this.state.croppedImageUrl !== null}>
            <div>
              <h1>Profile Picture Preview</h1>
              <img src={this.state.croppedImageUrl}></img>
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}

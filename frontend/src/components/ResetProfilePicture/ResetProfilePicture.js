import React, { Component } from "react";
import Dropzone from "react-dropzone";
import ReactCrop from "react-image-crop";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import classes from "./ResetProfilePicture.module.css";
import "react-image-crop/dist/ReactCrop.css";

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
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
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
      this.setState({ croppedImageUrl });
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
    this.setState({ croppedImage: croppedImage });
  }

  render() {
    const { crop, profile_pic, src } = this.state;
    return (
      <div className={classes.wrapper}>
        <div className={classes.inner}>
          <h1>Update Profile Picture</h1>
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

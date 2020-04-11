import React, { Component } from "react";
import Dropzone from "react-dropzone";

import classes from "./ResetProfilePicture.module.css";

const imageMaxSize = 1000;
const acceptedFileTypes = ["png", "jpg"];

export default class ResetProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }
  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.inner}>
          <h1>Update Profile Picture</h1>
          <Dropzone
            onDrop={(acceptedFiles) => {
              // console.log(acceptedFiles);
              this.setState({
                file: URL.createObjectURL(acceptedFiles[0]),
              });
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
          <img src={this.state.file} />
        </div>
      </div>
    );
  }
}

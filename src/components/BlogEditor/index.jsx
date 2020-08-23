import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

import "react-quill/dist/quill.snow.css";

import "./blog.editor.css";

import { firebase } from "../../utils/firebase";
import { generateId } from "../../utils/common";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export function BlogEditor(props) {
  const firebaseRef = useRef(null);
  const blogTitleRef = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    firebase.then((firebase) => {
      console.log("Firebase", firebase);
      firebaseRef.current = firebase;
    });
  }, []);

  console.log("Quill value", content);

  const onBlogSubmit = () => {
    console.log("blogs/" + generateId("blog"), blogTitleRef.current.value);
    firebaseRef.current
      .database()
      .ref("blogs/" + generateId("blog"))
      .set({
        title: blogTitleRef.current.value,
        content: content,
      });
    setContent("");
    blogTitleRef.current.value = null;
  };

  return (
    <React.Fragment>
      <h2>Blog editor</h2>
      <div className={"blogEditContainer"}>
        <div>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter blog title"
                ref={blogTitleRef}
              />
            </Form.Group>
          </Form>
        </div>
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            className={"editor"}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onBlogSubmit}>Submit</Button>
        </div>
      </div>
    </React.Fragment>
  );
}

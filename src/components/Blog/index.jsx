import React, { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";

import { firebase } from "../../utils/firebase";
// import { generateId } from "../../utils/common";

import "./blog.css";

export function Blog(props) {
  const firebaseRef = useRef(null);
  const [content, setContent] = useState([]);

  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    firebase.then((firebase) => {
      console.log("Firebase", firebase);
      firebaseRef.current = firebase;
      let starCountRef = firebase.database().ref("blogs/");
      starCountRef.on("value", function (snapshot) {
        let list = [];
        console.log(
          snapshot.forEach((value) => {
            list.push(value.val());
          })
        );
        console.log(setContent(list));
        setIsloading(false);
      });
    });
  }, []);

  console.log("Quill value", content[0]);

  return (
    <React.Fragment>
      <h2>Blogs</h2>
      {!isLoading ? (
        <div className={"blogContainer"}>
          {content.length > 0 ? (
            content.map((value) => {
              return (
                <div>
                  <h2>{value.title}</h2>
                  <ReactQuill
                    readOnly={true}
                    value={value.content}
                    modules={{ toolbar: false }}
                  />
                </div>
              );
            })
          ) : (
            <div>No blog found!</div>
          )}
        </div>
      ) : (
        <div>Loading ....</div>
      )}
    </React.Fragment>
  );
}

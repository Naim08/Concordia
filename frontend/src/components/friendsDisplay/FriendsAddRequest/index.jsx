import "./FriendsAddRequest.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getErrors, removeErrors } from "../../../store/errors";
import { createFriendRequest } from "../../../store/friendRequest";
import { getAddFriendResult, setAddFriendResult } from "../../../store/ui";
const FriendsAdd = () => {
  const dispatch = useDispatch();

  const errors = useSelector(getErrors);
  const friendResult = useSelector(getAddFriendResult);
  const [username, setUsername] = useState("");
  const [button, setButton] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (button.disabled) return;
    if (errors) dispatch(removeErrors());

    dispatch(createFriendRequest(username));
  };

  useEffect(() => {
    if (errors) dispatch(removeErrors());

    setButton(document.querySelector(".add-friend-button"));
    const input = document.querySelector(".add-friend-input");
    const inputContainer = document.querySelector(
      ".add-friend-input-container"
    );

    input.addEventListener("focus", () => {
      errors?.error
        ? (inputContainer.style.borderColor = "#fa777c")
        : errors?.duplicate || friendResult
        ? (inputContainer.style.borderColor = "#2dc770")
        : (inputContainer.style.borderColor = "#00a8fc");
    });

    input.addEventListener("focusout", () => {
      errors?.error
        ? (inputContainer.style.borderColor = "#fa777c")
        : errors?.duplicate || friendResult
        ? (inputContainer.style.borderColor = "#2dc770")
        : (inputContainer.style.borderColor = "#1e1f22");
    });

    return () => {
      dispatch(setAddFriendResult(false));
      dispatch(removeErrors());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    let start = e.target.selectionStart;
    let end = e.target.selectionEnd;
    let replaced = e.target.value.replace(/^\s+|/gm, "");

    if (replaced !== e.target.value) {
      e.target.value = replaced;
      e.target.setSelectionRange(start, end - 1);
    }

    if (
      /^[\w\d\s]{0,32}#\d{0,4}$/gm.test(e.target.value) ||
      /^[\w\d\s]{0,32}$/gm.test(e.target.value)
    ) {
      setUsername(e.target.value);
      button.disabled = !/^[\w\d\s]+#\d{4}$/gm.test(e.target.value);
    }

    if (errors) dispatch(removeErrors());
    if (friendResult) dispatch(setAddFriendResult(false));
  };

  const formatPasteInput = (e) => {
    e.preventDefault();
    e.target.value = e.clipboardData
      .getData("Text")
      .trim()
      .replace(/\s+#/gm, "#");
    handleChange(e);
  };

  const getStatus = () => {
    if (errors?.error) return "error";
    else if (errors?.duplicate || friendResult) return "success";
    else return "";
  };

  return (
    <div className="add-friend-wrapper">
      <h2 className="add-friend-title">ADD FRIEND</h2>
      <form
        className="add-friend-form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="add-friend-form-span">
          You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!
        </div>
        <div className={`add-friend-input-container ${getStatus()}`}>
          <div className="add-friend-input-wrapper">
            <input
              className="add-friend-input"
              type="text"
              placeholder="Enter a Username#0000"
              value={errors?.duplicate || friendResult ? "" : username}
              onChange={handleChange}
              onPaste={formatPasteInput}
            />
          </div>
          <button className="add-friend-button" type="submit" disabled>
            Send Friend Request
          </button>
        </div>

        {errors?.error ? (
          <div className="add-friend-result error">{errors.error}</div>
        ) : errors?.duplicate || friendResult ? (
          <div className="add-friend-result success">
            Success! Your friend request to
            <span className="bold"> {username} </span>
            was sent.
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default FriendsAdd;

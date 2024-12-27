"use client";
import { supportApi } from "@/api/support";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../storage/local";

const SupportForm = ({ data }) => {
  const [dataSupport, setDataSupport] = useState(data);

  const [dataFeedback, setDataFeedback] = useState({
    user: "",
    content: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const idLocal = getLocalStorage("_CM_id");
    if (!idLocal) {
      setMessage("You must login first");
    }
    setDataFeedback((prev) => {
      return {
        ...prev,
        user: idLocal,
      };
    });
  }, []);

  const handleChange = (e) => {
    setDataFeedback((prev) => {
      return {
        ...prev,
        content: e.target.value,
      };
    });
  };

  const submit = async () => {
    if (!dataFeedback.user) {
      return;
    }
    const payload = {
      ...data,
      feedback: [...data.feedback, dataFeedback],
    };

    const res = await supportApi.addFeedback(payload);

    if (res.status !== 200) {
      setMessage("Can't send your problems");
    }

    setMessage("Send your problems success");
  };

  return (
    <div className="support_form">
      <h2>#Form</h2>
      <span>{message}</span>
      <div className="support_form_g">
        <span>Your Issuse</span>
        <textarea
          placeholder="Your Issuse"
          value={dataFeedback.content}
          onChange={handleChange}
        />
      </div>
      <p className="send" onClick={submit}>
        Send
      </p>
    </div>
  );
};

export default SupportForm;

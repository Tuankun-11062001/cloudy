import { login, register } from "@/api/auth";
import { appSvg } from "@/data/svg";
import React, { useState } from "react";
import { setLocalStorage } from "../storage/local";

const Auth = ({ funcUser, closeFunc, stateAuth }) => {
  const [loginContent, setLoginContent] = useState(true);

  const switchContent = () => {
    setLoginContent(!loginContent);
  };

  return (
    <div className="login">
      {loginContent ? (
        <LoginContent
          stateAuth={stateAuth}
          closeFunc={closeFunc}
          switchContent={switchContent}
          funcUser={funcUser}
        />
      ) : (
        <SignupContent
          stateAuth={stateAuth}
          closeFunc={closeFunc}
          switchContent={switchContent}
        />
      )}
    </div>
  );
};

const LoginContent = ({ funcUser, stateAuth, closeFunc, switchContent }) => {
  const [loginData, setLoginData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginError("");
    setLoginData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await login(loginData);
      if (res.status === 404 || res.status === 401) {
        return setLoginError(res.response.data.message);
      }

      if (res.status === 200) {
        setLoginError(res.data.message);
        setLocalStorage("_CM_id", res.data.data._id);
        setLocalStorage("_CM_info", {
          avatar: res.data.data.avatar,
          serName: res.data.data.userName,
        });

        closeFunc();
        funcUser(true);

        // Tải lại trang hiện tại
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="content">
      <div className="content_login">
        <div className="head">
          <h1>Đăng nhập</h1>
          <p onClick={() => closeFunc(!stateAuth)}>{appSvg.close}</p>
        </div>

        <div className="form">
          <div className="group">
            {appSvg.email}
            <input
              placeholder="Email của bạn"
              onChange={handleChange}
              name="userEmail"
              value={loginData.userEmail}
            />
          </div>

          <div className="group">
            {appSvg.key}
            <input
              type="password"
              placeholder="Mật khẩu của bạn"
              onChange={handleChange}
              name="userPassword"
              value={loginData.userPassword}
            />
          </div>
        </div>

        {loginError && <p className="error">{loginError}</p>}

        <p className="submit" onClick={handleSubmit}>
          Đăng nhập
        </p>

        <p className="bottom">
          Ủa bạn chưa có tài khoản sao?
          <span onClick={switchContent}> Đăng ký ở đây nè!</span>
        </p>
      </div>
    </div>
  );
};

const SignupContent = ({ stateAuth, closeFunc, switchContent }) => {
  const [registerData, setRegisterData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    rePassword: "",
  });

  const [registerError, setRegisterError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterError("");
    setRegisterData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    const fields = Object.values(registerData);
    if (fields.some((field) => field === "")) {
      return setRegisterError("Missing filed...");
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(registerData.userEmail)) {
      setRegisterError("Invalid email format...");
      return;
    }

    if (registerData.userPassword !== registerData.rePassword) {
      return setRegisterError("Password not match");
    }

    try {
      const res = await register(registerData);
      if (res.status === 403) {
        return setRegisterError(res.response.data.message);
      }
      if (res.status === 200) {
        return setRegisterError(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content">
      <div className="content_signup">
        <div className="head">
          <h1>Đăng ký</h1>
          <p onClick={() => closeFunc(!stateAuth)}>{appSvg.close}</p>
        </div>
        <div className="form">
          <div className="group">
            {appSvg.user}
            <input
              placeholder="Tên của bạn"
              onChange={handleChange}
              value={registerData.userName}
              name="userName"
            />
          </div>

          <div className="group">
            {appSvg.email}
            <input
              placeholder="Email của bạn"
              onChange={handleChange}
              value={registerData.userEmail}
              name="userEmail"
            />
          </div>

          <div className="group">
            {appSvg.key}
            <input
              type="password"
              placeholder="Mật khẩu của bạn"
              onChange={handleChange}
              value={registerData.userPassword}
              name="userPassword"
            />
          </div>

          <div className="group">
            {appSvg.key}
            <input
              type="password"
              placeholder="Nhập lại mật khẩu nhén"
              onChange={handleChange}
              value={registerData.rePassword}
              name="rePassword"
            />
          </div>
        </div>
        {registerError && <p className="error">{registerError}</p>}

        <p className="submit" onClick={handleSubmit}>
          Đăng ký
        </p>

        <p className="bottom">
          Ui bạn có tài khoản rồi sao?
          <span onClick={switchContent}> Đăng nhập đây nhé!</span>
        </p>
      </div>
    </div>
  );
};

export default Auth;

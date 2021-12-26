import { Box, Link, Typography, MenuItem, TextField, ButtonGroup, Button } from '@mui/material'
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import './index.css'
import useStyle from '../style'
import ReactInputVerificationCode from 'react-input-verification-code';
import LoadingButton from '@mui/lab/LoadingButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AuthenService from '../../../services/authentication'
import storage from '../../../utils/storage';
import React from "react";
import firebase from "../../../firebase";
export const Container = styled('div')({
  position: 'fixed',
  top: '0',
  left: '0',
  bottom: '0',
  right: '0',
  background: 'rgba(0,0,0,0.3)',
  zIndex: '99'
})

function Login() {
  const classes = useStyle()
  const [loading, setLoding] = useState(false)
  const [otp, setOtp] = useState('')
  const logOut = () => AuthenService.logOut()

  useEffect(() => {
    const user = storage.getUserInfo();
    if (user.phone) {
      onSignInSubmit()
    }
  }, [])

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
        },
        defaultCountry: "VN"
      }
    );
  };

  const onSignInSubmit = (e) => {
    e?.preventDefault();
    configureCaptcha();
    const user = storage.getUserInfo()
    const phoneNumber = "+84" + user.phone;
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        alert("OTP has been sent");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error);
      });
  };

  const onSubmitOTP = (e) => {
    e?.preventDefault();
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        const user = storage.getUserInfo();
        storage.setVerify(true)
        window.location.href='/'
        alert("User is verified");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  return (
    <Container>
      <Box className={classes.title}>
        <Typography >
          Đăng kí tài khoản Zalo
          để kết nối với ứng dụng Zalo Chat
        </Typography>
      </Box>

      <Box className={classes.wraper} sx={{ boxShadow: 3 }}>
        <Box className="custom-styles">
          <Box>
            Nhập mã xác nhận
          </Box>
          <div id="sign-in-button"></div>
          <ReactInputVerificationCode length={6} onChange={setOtp} />
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mt: 3, alignSelf: 'flex-start', ml: 2 }} onClick = {onSubmitOTP}>
              <Typography>Gửi lại </Typography>
              <RestartAltIcon />
            </Link>
            <Link sx={{ alignSelf: 'flex-end', mr: 2, cursor: 'pointer' }} onClick={logOut}>Thoát</Link>
          </Box>
          <LoadingButton
            loading={loading}
            variant="contained"
            sx={{ mt: 4, width: 120 }}
            onClick={onSubmitOTP}
          >
            Verify
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;

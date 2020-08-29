import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { loginUser } from "../../_actions/user_action"
import { withRouter } from "react-router-dom"
import SocialLogin from "./SocialLogin"
import styled from "styled-components"
import { TextField } from "@material-ui/core"
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://assets.nflxext.com/ffe/siteui/vlv3/c385496a-2ed6-4081-9783-49a1ac8a5bbf/7e9484b8-19af-4bcc-8956-501c4b2165fc/KR-ko-20200629-popsignuptwoweeks-perspective_alpha_website_large.jpg");
  background-size: cover;
  background-position: center center;
  min-height: 100vh;
  font-weight: 400;
  font-family: "Noto Sans KR", sans-serif;
`
const Wrapper = styled.div`
  width: 450px;
  margin: auto;
  background: rgba(0, 0, 0, 0.75);
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
`
const TextWrapper = styled.div`
  margin-bottom: 10px;
`
const MyTextField = styled(TextField)({
  backgroundColor: "white",
  width: "100%",
  borderRadius: "5px",
})
function Login(props) {
  const dispatch = useDispatch()
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault() //페이지 refresh 방지
    let body = {
      email: Email,
      password: Password,
    }
    //redux action => loginUser는 action이름
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        window.localStorage.setItem("userId", response.payload.userId) //
        props.history.push("/")
      } else {
        alert("로그인 실패")
      }
    })
  }
  return (
    <Container>
      <Wrapper>
        <div style={{ fontSize: "25px", marginBottom: "20px" }}>로그인</div>
        <form onSubmit={onSubmitHandler}>
          <TextWrapper>
            <MyTextField
              // placeholder="이메일"
              value={Email}
              onChange={onEmailHandler}
              type="email"
              label="이메일 주소 또는 전화번호"
              variant="filled"
              size="small"
            />
          </TextWrapper>
          <TextWrapper>
            <MyTextField
              size="small"
              onChange={onPasswordHandler}
              value={Password}
              label="비밀번호"
              type="password"
              autoComplete="current-password"
              variant="filled"
            />
          </TextWrapper>
          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              style={{ backgroundColor: "mediumslateblue", borderColor: "mediumslateblue" }}
            >
              로그인
            </button>
          </div>
          <SocialLogin />
          <br />
          <a href="/sign-up">Bongflix 회원이 아닌가요? 지금 가입하세요.</a>
        </form>
      </Wrapper>
    </Container>
    // <div className="auth-wrapper">
    //   <div className="auth-inner">
    //     <form onSubmit={onSubmitHandler}>
    //       <div className="form-group">
    //         <input
    //           type="email"
    //           className="form-control"
    //           placeholder="이메일"
    //           value={Email}
    //           onChange={onEmailHandler}
    //         />
    //       </div>
    //       <div className="form-group">
    //         <input
    //           type="password"
    //           className="form-control"
    //           placeholder="비밀번호"
    //           value={Password}
    //           onChange={onPasswordHandler}
    //         />
    //       </div>
    //       <button type="submit" className="btn btn-primary btn-block">
    //         로그인
    //       </button>
    //       <SocialLogin />
    //       <br />
    //       <a href="/sign-up">회원이 아니신가요?</a>
    //     </form>
    //   </div>
    // </div>
  )
}
export default withRouter(Login)

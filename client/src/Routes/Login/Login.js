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
  /* font-family: "Noto Sans KR", sans-serif; */
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
        <div style={{ fontSize: "30px", marginBottom: "40px", fontWeight: "600" }}>로그인</div>
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
          <br />
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
          <br />
          <br />
          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              style={{ backgroundColor: "mediumslateblue", borderColor: "mediumslateblue" }}
            >
              로그인
            </button>
          </div>
          <br />
          <div style={{ display: "flex" }}>
            {/* <div
              style={{
                color: "#B3B3B3",
              }}
            >
              로그인 정보 저장
            </div>
            */}
            {/* <input type="button" name="로그인 정보 저장" style={{color:"#b3b3b3"}}></input> */}
            <div style={{ display: "flex" }}>
              <input type="checkbox" style={{ margin: "-1px" }} />
              <div
                style={{
                  color: "#B3B3B3",
                  marginLeft: "5px",
                }}
              >
                로그인 정보 저장
              </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div style={{ margin: "-2px" }}>
              <a href="/sign-up">도움이 필요하신가요?</a>
            </div>
          </div>
          <br />
          <SocialLogin />
          <br />
          <span style={{ color: "#737373" }}>Bongflix 회원이 아닌가요?</span>&nbsp;&nbsp;
          <a href="/sign-up">지금 가입하세요.</a>
        </form>
      </Wrapper>
    </Container>

 
  )
}
export default withRouter(Login)

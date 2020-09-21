import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/user_action";
import "./SignUp.css";
import { withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { DEFAULT_PROFILE } from "../../Components/Config";
import styled from "styled-components";
import { TextField, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
const TextWrapper = styled.div`
margin-bottom:20px;
`;
const MyTextField = styled(TextField)({
  backgroundColor: "white",
  width: "100%",
  borderRadius: "5px",
  
});
function SignUp(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Number,setNumber]=useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [FilePath, setFilePath] = useState(DEFAULT_PROFILE);
  const [FileName, setFileName] = useState("");
  const [Gender, setGender] = useState("");
  const onEmailHandler = event => {
    setEmail(event.currentTarget.value);
  };
  const onNameHandler = event => {
    setName(event.currentTarget.value);
  };
  const onNumberHandler = event =>{
    setNumber(event.currentTarget.value)
  }
  const onPasswordHandler = event => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = event => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onGenderHandler = event => {
    setGender(event.currentTarget.value);
  };
  const onDrop = files => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    Axios.post("/api/image/upload", formData, config).then(response => {
      if (response.status === 200) {
        setFilePath(
          response.data.location
            ? response.data.location
            : DEFAULT_PROFILE
        );
        setFileName(response.data.key);
      } else {
        alert("이미지 업로드에 실패했습니다.");
      }
    });
  };
  const onSubmitHandler = event => {
    event.preventDefault(); //페이지 refresh 방지
    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }
    let body = {
      email: Email,
      password: Password,
      number: Number,
      name: Name,
      image: FilePath,
      gender: Gender,
    };
    // redux action => loginUser는 action이름
    dispatch(registerUser(body)).then(response => {
      if (response.payload.success) {
        props.history.push("/sign-in");
        alert("회원가입 성공!");
      } else {
        alert("회원가입 실패");
      }
    });
  };
  return (
    
    <div className="auth-wrapper">
      
      <div className="auth-inner">
      {/* <div style={{fontSize:"30px", display:"flex", }}>회원가입</div> */}
        <form onSubmit={onSubmitHandler} style={{ margin: "0" }}>
          <div className="form-group" style={{ textAlign: "center" }}>
            <label style={{ marginBottom: "20px", display: "inline-block" }}>
      
            </label>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              
              <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
                
                {({ getRootProps, getInputProps }) => (
                  <div
                    style={{
                    
                      marginBottom:"50px",
                      width: "60px",
                      height: "50px",
                      // border: "1px solid black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    {...getRootProps()}
                  >
                    
                    <input {...getInputProps()} />
                    
                    <img
                      style={{
                        display: "flex",
                        borderRadius: "10%",
                        justifyContent: "center",
                      }}
                      src={
                        FilePath
                          ? FilePath
                          : DEFAULT_PROFILE
                      }
                      alt="image"
                      width="110px"
                      height="110px"
                    />
                  </div>
                )}
              </Dropzone>
              
            </div>
            <div style={{textAlign:"center"}}>Image Edit</div>
          </div>
          <br/>
          <br/>
          <TextWrapper>
            <div>Email</div>
            <br/>
            <MyTextField style={{backgroundColor:"#e5e5e5"}}
              type="email"
              value={Email}
              onChange={onEmailHandler}
              placeholder="이메일"
              label="이메일을 입력해주세요"
              variant="filled"
              size="small"
            />
          </TextWrapper>
          <TextWrapper>
          <div>Name</div>
          <br/>
            <MyTextField style={{backgroundColor:"#e5e5e5"}}
              type="text"
              placeholder="이름"
              value={Name}
              label="이름을 입력해주세요"
              onChange={onNameHandler}
              variant="filled"
              size="small"
            />
          </TextWrapper>
          <TextWrapper>
            <div>Number</div>
            <br/>
            <MyTextField style={{backgroundColor:"#e5e5e5"}}
              type="number"
              value={Number}
              onChange={onNumberHandler}
              placeholder="전화번호"
              label="전화번호를 입력해주세요"
              variant="filled"
              size="small"
            />
          </TextWrapper>
          <TextWrapper>
          <div>Password</div>
          <br/>
            <MyTextField style={{backgroundColor:"#e5e5e5"}}
              type="password"
              label="비밀번호를 입력해주세요"
              placeholder="비밀번호"
              value={Password}
              onChange={onPasswordHandler}
              variant="filled"
              size="small"
            />
          </TextWrapper>
          <TextWrapper>
          <div>Confirm Password</div>
          <br/>
            <MyTextField style={{backgroundColor:"#e5e5e5"}}
              type="password"
              label="비밀번호 확인"
              placeholder="비밀번호 확인"
              value={ConfirmPassword}
              onChange={onConfirmPasswordHandler}
              variant="filled"
              size="small"
            />
          </TextWrapper>
          <TextWrapper style={{ itemAlign:"center"}}>
          <RadioGroup aria-label="gender" name="Gender" value={Gender} onChange={onGenderHandler} row>
        <FormControlLabel value="male" control={<Radio size="small"/>} label="남자" />
        <FormControlLabel value="female" control={<Radio size="small"/>} label="여자" />
      </RadioGroup>
          </TextWrapper>
          <button type="submit" className="btn btn-primary btn-block"  style={{backgroundColor:"mediumslateblue", borderColor:"mediumslateblue"}} >
            회원 가입
          </button>
        </form>
      </div>
    </div>
  );
}
export default withRouter(SignUp);
import React, { useState, useEffect } from "react"
import { Typography, Form, Input } from "antd"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import AccountCircle from "@material-ui/icons/AccountCircle"
import AccessTime from "@material-ui/icons/AccessTime"
import Email from "@material-ui/icons/Email"
import Person from "@material-ui/icons/Person"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Dropzone from "react-dropzone"
import Axios from "axios"
import { withRouter } from "react-router-dom"
import { DEFAULT_PROFILE } from "../../Components/Config"
import "antd/dist/antd.css"
import { Helmet } from "react-helmet"
const { Title } = Typography
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}))
function UpdateProfile(props) {
  const classes = useStyles()
  const [updatePasswordConfirm, setUpdatePasswordConfirm] = useState("")
  const [updatePassword, setUpdatePassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [FilePath, setFilePath] = useState("")
  const [currentEmail, setCurrentEmail] = useState("")
  const [currentName, setCurrentName] = useState("")
  const [currentImage, setCurrentImage] = useState("")
  const [UpdateName, setUpdateName] = useState("")
  useEffect(() => {
    Axios.post("/api/users/getUserInfo", {
      userId: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.data.success) {
        setCurrentEmail(response.data.user[0].email)
        setCurrentName(response.data.user[0].name)
        setCurrentImage(response.data.user[0].image)
      } else {
        alert("user 정보를 갖고오는데 실패했습니다.")
      }
    })
  }, [])
  const onDrop = (files) => {
    let formData = new FormData()
    const config = {
      header: { "content-type": "multipart/form-data" },
    }
    formData.append("file", files[0])
    Axios.post("/api/image/upload", formData, config).then((response) => {
      if (response.status === 200) {
        setFilePath(response.data.location)
      } else {
        alert("이미지 업로드에 실패했습니다.")
      }
    })
  }
  const handleChangeCurrentName = (event) => {
    setUpdateName(event.currentTarget.value)
  }
  const handleChangeCurrentPassword = (event) => {
    setCurrentPassword(event.currentTarget.value)
  }
  const handleChangeUpdatePassword = (event) => {
    setUpdatePassword(event.currentTarget.value)
  }
  const handleChangeUpdatePasswordConfirm = (event) => {
    setUpdatePasswordConfirm(event.currentTarget.value)
  }
  const removeProfileImage = () => {
    setFilePath(null)
    setCurrentImage(null)
  }
  const onSubmit = (event) => {
    if (currentEmail.includes("(google)") || currentEmail.includes("(kakao)")) {
      alert("소셜 계정입니다!")
    } else if (currentPassword === "") {
      alert("현재 비밀번호를 입력하세요")
    }
    event.preventDefault() //페이지 refresh 방지
    let variable = {
      id: window.localStorage.getItem("userId"),
      password: currentPassword,
      newName: UpdateName !== "" ? UpdateName : currentName,
      newPassword: updatePassword !== "" ? updatePassword : currentPassword,
      newImage: FilePath !== "" ? FilePath : currentImage,
    }
    if (updatePassword === updatePasswordConfirm) {
      Axios.post("/api/users/updateProfile", variable).then((response) => {
        if (response.data.success) {
          alert("변경되었습니다.")
          props.history.push("/")
        } else {
        }
      })
    } else {
      alert("비밀번호가 일치하지 않습니다!")
    }
  }
  return (
    <>
      <Helmet>
        <title>MyPage | Nomflix</title>
      </Helmet>
      <div>
        <Form
          className={classes.margin}
          {...formItemLayout}
          style={{
            width: "100%",
            backgroundColor: "white",
            padding: "70px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              width: "100%",
            }}
          >
            <Title style={{ color: "black" }}>회원정보 수정</Title>
            <h3 style={{ color: "black" }}>회원님의 소정한 정보를 안전하게 관리하세요.</h3>
          </div>
          <div
            style={{
              margin: "3rem auto",
              width: "50%",
              // borderRadius: "50px",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              border: "1px solid black",
            }}
          >
            <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    width: "6rem",
                    height: "6rem",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    top: "5px",
                    left: "5px",
                    margin: "0 auto",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <img
                    style={{
                      display: "flex",
                      borderRadius: "100%",
                      justifyContent: "center",
                    }}
                    src={FilePath ? FilePath : currentImage ? currentImage : DEFAULT_PROFILE}
                    alt="haha"
                    width="110px"
                    height="110px"
                  />
                </div>
              )}
            </Dropzone>
            <button
              onClick={removeProfileImage}
              style={{
                backgroundColor: "transparent",
                color: "2e2e2e",
                borderColor: "transparent",
                fontweight: "border",
              }}
            >
              X
            </button>
            <Form.Item
              style={{
                color: "black",
                width: "80%",
                float: "right",
                alignItems: "center",
                marginTop: "50px",
              }}
            >
              <Title>{currentEmail}</Title>
              <AccountCircle /> <span style={{ color: "darkgray" }}>User</span> &nbsp;&nbsp;
              <AccessTime /> <span style={{ color: "darkgray" }}>Joined August 18,2020</span>
            </Form.Item>
          </div>
          <hr style={{ width: "100%", border: "1px solid black" }} />
          {/* 이메일*/}
          <div
            style={{
              margin: "0 auto",
              width: "50%",
              borderRadius: "10px",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                width: "90%",
                margin: "0 auto",
              }}
            >
              <h1>Emails</h1>
              <Form.Item
                style={{
                  color: "black",
                }}
              >
                <Grid container spacing={3} alignItems="flex-end">
                  <Grid item>
                    <Email />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="input-with-icon-grid"
                      label="Email"
                      value={currentEmail}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Form.Item>
            </div>
          </div>
          {/* 이름 */}
          <div
            style={{
              margin: "0 auto",
              width: "50%",
              borderRadius: "50px",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                width: "90%",
                margin: "0 auto",
              }}
            >
              <h1>Name</h1>
              <Form.Item
                style={{
                  color: "black",
                }}
              >
                <Grid container spacing={3} alignItems="flex-end">
                  <Grid item>
                    <Person />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="input-with-icon-grid"
                      label={currentName}
                      value={UpdateName}
                      onChange={handleChangeCurrentName}
                    />
                  </Grid>
                </Grid>
              </Form.Item>
            </div>
          </div>
          {/* 현비밀번호 */}
          <div
            style={{
              margin: "0 auto",
              width: "50%",
              borderRadius: "50px",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                width: "90%",
                margin: "0 auto",
              }}
            >
              <h1>Current Password</h1>
              <Form.Item
                style={{
                  color: "black",
                }}
              >
                <Grid container spacing={3} alignItems="flex-end">
                  <Grid item>
                    <VisibilityOffIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="input-with-icon-grid"
                      label="*********"
                      onChange={handleChangeCurrentPassword}
                      type="password"
                    />
                  </Grid>
                </Grid>
              </Form.Item>
            </div>
          </div>
          {/* 새비밀번호 */}
          <div
            style={{
              margin: "0 auto",
              width: "50%",
              borderRadius: "50px",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                width: "90%",
                margin: "0 auto",
              }}
            >
              <h1>New Password</h1>
              <Form.Item
                style={{
                  color: "black",
                }}
              >
                <Grid container spacing={3} alignItems="flex-end">
                  <Grid item>
                    <VisibilityOffIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="input-with-icon-grid"
                      label="*********"
                      onChange={handleChangeUpdatePassword}
                      type="password"
                    />
                  </Grid>
                </Grid>
              </Form.Item>
            </div>
          </div>
          {/* 새비밀번호확인 */}
          <div
            style={{
              margin: "0 auto",
              width: "50%",
              borderRadius: "50px",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                width: "90%",
                margin: "0 auto",
              }}
            >
              <h1>New Password Confirm</h1>
              <Form.Item
                style={{
                  color: "black",
                }}
              >
                <Grid container spacing={3} alignItems="flex-end">
                  <Grid item>
                    <VisibilityOffIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="input-with-icon-grid"
                      label="*********"
                      onChange={handleChangeUpdatePasswordConfirm}
                      type="password"
                    />
                  </Grid>
                </Grid>
              </Form.Item>
            </div>
          </div>
          <div
            style={{
              margin: "0 auto",
              width: "50%",
              borderRadius: "50px",
              backgroundColor: "white",
              textAlign: "center",
            }}
          >
            <Button
              style={{
                backgroundColor: "black",
                borderRadius: "5px",
              }}
              variant="outlined"
              onClick={onSubmit}
            >
              Update Profile
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}
export default withRouter(UpdateProfile)

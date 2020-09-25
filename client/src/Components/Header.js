import React from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import Axios from "axios";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { DEFAULT_PROFILE } from "./Config";
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  z-index: 10;
  top: 0;
  left: 0;
  justify-content: center;
`;
const List1 = styled.ul`
  justify-content: flex-start;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;

  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 10px;
`;
const List2 = styled.ul`
  justify-content: flex-end;
  float: right;
  width: 100%;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;

  font-weight: 400;
  height: 44px;
`;
const Item = styled.li`
  width: 80px;
  height: 50px;
  float: right;
  text-align: center;
`;
const SLink = styled(Link)`
  font-size: 13px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:link {
    text-decoration: none;
    color: #e5e5e5;
  }
  &:visited {
    text-decoration: none;
    //color: white;
    color: #e5e5e5;
  }
  &:active {
    text-decoration: none;
    color: #e5e5e5;
  }
  &:hover {
    text-decoration: none;
    color: white;
  }
`;
//헤더 색 scroll에따라 변화/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const handleScroll = () => {
  const windowHeight =
    "innerHeight" in window
      ? window.innerHeight
      : document.documentElement.offsetHeight;
  const body = document.body;
  const html = document.documentElement;
  const docHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  const windowBottom = windowHeight + window.pageYOffset;
  var x = document.getElementById("header");
  var y = 0;
  if (docHeight > 2000) {
    y = 1800;
  } else if (docHeight > 1000) {
    y = 500;
  } else {
    y = 1;
  }
  if (windowBottom < docHeight - y) {
    if (x === null) {
      return (x = document.getElementById("header"));
    }
    x.style.backgroundColor = "transparent";
  } else if (windowBottom > docHeight - y) {
    if (x === null) {
      return (x = document.getElementById("header"));
    }
    x.style.backgroundColor = "#171717";
  }
};
export default withRouter(
  (
    props //withRouter 때문에 props를 가질 수 있다.
  ) => {
    const user = useSelector((state) => state.user);
    window.addEventListener("scroll", handleScroll);
    const {
      location: { pathname },
    } = props;
    const logoutHandler = () => {
      Axios.get("/api/users/logout").then((response) => {
        if (response.data.success) {
          console.log(response.data);
          props.history.push("/sign-in");
        } else {
          alert("로그아웃 하는데 실패 했습니다.");
        }
      });
    };
    return (
      <>
        <Header id="header">
          <List1>
            <Item current={pathname === "/"}>
              <SLink to="/">
                <img
                  src={require("./images/logo.png")}
                  alt="logo"
                  style={{ width: "70%", margin: "0 auto", marginTop: "0px" }}
                />
              </SLink>
            </Item>
            <Item current={pathname === "/search"}>
              <SLink to="/search">검색</SLink>
            </Item>
            <Item current={pathname === "/favorite"}>
              <SLink
                to={
                  user.userData && !user.userData.isAuth
                    ? "/sign-in"
                    : "/favorite"
                }
              >
                찜한 목록
              </SLink>
            </Item>
            <Item current={pathname === "/myscore"}>
              <SLink to="/myscore">평가</SLink>
            </Item>
            <Item current={pathname === "/product"}>
              <SLink to="/product">매점</SLink>
            </Item>
            {user.userData && user.userData.role ==="관리자"
            ? (
              <Item current={pathname === "/admin"}>
                <SLink to={user.userData.role==="관리자" ? "/admin" : "/sign-in"}>관리자</SLink>
              </Item>
              )
            : null
              }
          </List1>
          {user.userData && !user.userData.isAuth ? (
            <List2>
              <Item current={pathname === "/sign-in"}>
                <SLink to="/sign-in">로그인</SLink>
              </Item>
            </List2>
          ) : (
            <List2>
              <Item style={{ width: "95px" }}>
                <SLink to="/mypage/update">
                  {/* 내계정 */}
                  {user.userData && (
                    <div
                      style={{
                        display: "flex",
                        margin: "0px auto",
                        color: "#e5e5e5",
                      }}
                    >
                      <span
                        style={{
                          textAlign: "center",
                          marginTop: "6px",
                          color: "#e5e5e5",
                        }}
                      >
                        {user.userData && user.userData.name.length > 7
                          ? `${user.userData.name.substring(0, 4)}...`
                          : user.userData.name}
                      </span>
                      <img
                        style={{
                          display: "flex",
                          borderRadius: "70%",
                          overflow: "hidden",
                          objectFit: "cover",
                          marginLeft: "10px",
                          justifyContent: "center",
                          color: "#e5e5e5",
                        }}
                        src={
                          user.userData.image
                            ? user.userData.image
                            : DEFAULT_PROFILE
                        }
                        alt="haha"
                        color="#e5e5e5"
                        width="24rem"
                        height="23rem"
                      />
                    </div>
                  )}
                </SLink>
              </Item>
              <Item style={{ width: "40px" }}>
                {user.userData && (
                  <div
                    style={{
                      display: "flex",
                      itemAlign: "center",
                      margin: "0px auto",
                      color: "#e5e5e5",
                    }}
                  >
                    <Badge
                      count={user.userData && user.userData.cart.length}
                      style={{
                        marginBottom: -10,
                        backgroundColor: "mediumslateblue",
                        fontSize: 1,
                      }}
                      offset={[10, 10]}
                    >
                      <SLink to="/mymovie" className="head-example">
                        <ShoppingCartOutlined
                          style={{
                            fontSize: 25,
                            marginLeft: "10px",
                            color: "#e5e5e5",
                          }}
                        />
                      </SLink>
                    </Badge>
                  </div>
                )}
              </Item>
              <Item>
                <SLink to="/login" onClick={logoutHandler}>
                  로그아웃
                </SLink>
              </Item>
            </List2>
          )}
        </Header>
      </>
    );
  }
);

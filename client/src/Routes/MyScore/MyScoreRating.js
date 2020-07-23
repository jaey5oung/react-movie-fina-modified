import React, { useState } from "react";
import styled from "styled-components";
import { Rate } from "antd";
import "antd/dist/antd.css";
import axios from "axios";

const StarsWrapper = styled.span`
  line-height: 1;
  margin-left: 50px;
`;

const Rating = ({ movieId, count, setCount }) => { 

  const giveStarRating = (value) => {
    console.log("giving star rating");
    axios.post("/api/myscore/giveStarRating", {
      userFrom : localStorage.getItem("userId"),
      movieId : movieId,
      count : count+1,
      score : value,
    }).then(response => {
      if(response.data.success) {
        setCount(count+1)
      } else {
        alert("평가하기를 실패했습니다.")
      }
    })
  }

  const onClickHandler = (value) => {
      giveStarRating(value);
  };
  return (
    <StarsWrapper>
      <Rate onChange={onClickHandler} allowClear={false} />
    </StarsWrapper>
  );
};

export default Rating;
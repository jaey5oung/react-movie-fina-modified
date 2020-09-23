import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Reservation from "../Routes/Reservation/Reservation"
import ReservationAll from "../Routes/Reservation/ReservationAll"

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 60px;
  }
  margin: 0 auto;
  width: 100%;
`
const Title = styled.span`
  position: relative;
  font-size: 30px;
  font-weight: 600;
  padding: 0px 0px 30px;
`
const Grid = styled.div`
  margin-top: 30px;
  display: flex;
  border-radius: 0.8rem;
  align-items: center;
  width: 100%;
  height: 10%;
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    width: 2px;
    height: 9px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(123,104,238,0.4)
  }
`
const Section = (
  { title, children, nowPlaying } // children 예약된 react prop
) => {
  return (
    <Container>
      <Title>{title}</Title>
      {title === "Now Playing" ? (
        <>
          <Reservation nowPlaying={nowPlaying} userFrom={localStorage.getItem("userId")} />
          <ReservationAll nowPlaying={nowPlaying} userFrom={localStorage.getItem("userId")} />
        </>
      ) : null}
      <Grid>{children}</Grid>
    </Container>
  )
}
Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}
export default Section
// ddd
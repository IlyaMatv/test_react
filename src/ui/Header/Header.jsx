import React from "react";
import styled from "styled-components";

const AllProcess = styled.div`
  display: flex;
  min-height: max-content;
  margin-top: 40px;
  font-size: 26px;
  color: #fff;
  p {
    margin: 0 20px;
    max-width: max-content;
    font-weight: bold;
  }
`;
const AllProcessBtn = styled.button`
  background-color: inherit;
  color: #fff;
  outline: none;
  min-width: 60px;
  border: 2px solid #31353a;
  border-radius: 6px;
  :hover {
    background-color: #31353a;
  }
`;



const Header = (props) => {


  return (
    <>
      <AllProcess>
        <p>All Process: </p>
        <AllProcessBtn onClick={props.onClickFn}>show all process</AllProcessBtn>
      </AllProcess>
    </>
  );
};

export default Header;

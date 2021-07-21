import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineSetting } from "react-icons/ai";
import Modal from "./Modal";

const Container = styled.div`
  background: #0000e6;
  color: #f2f2f2;
  text-align: center;
  position: relative;
  padding: 0.5em;
  font-size: 1.5em;
  display: relative;
`;

const AddBtn = styled.button`
  all: unset;
  position: absolute;
  right: 3%;
`;

const Top = () => {
  const [showModel, setShowModel] = useState(false)
  return (
    <>
      {showModel && <Modal setShowModel = {setShowModel}/>}
      <Container>
        מעקב אשראי
        <AddBtn onClick = {() => setShowModel(prev => !prev)}>
          <AiOutlineSetting />
        </AddBtn>
      </Container>
    </>
  );
};

export default Top;

import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { AiOutlineClose } from "react-icons/ai";

import { updateCard, deleteCard } from "../api";

const EditBox = styled.div`
  padding: 1.5em;
  position: relative;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
`;
const EditCredit = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h3`
  color: #0000e6;
  text-align: center;
  margin-bottom: 1em;
`;

const FormLabel = styled.label`
  color: #1a1aff;
  margin-bottom: 0.3em;
`;

const FormInput = styled.input`
  border: none;
  background: #e6e6ff;
  font-size: 1.1em;
  padding: 0.5em 0.8em;
  width: 100%;
  &:focus {
    outline: none;
    border-bottom: 1px solid #1a1aff;
  }
`;

const FormBtn = styled.button`
  background: #1a1aff;
  padding: 0.5em 1em;
  color: #fff;
  border: none;
  font-size: 1.13em;
  margin-top: 1em;
`;
const DeleteBtn = styled.button`
  background: #ff1a1a;
  padding: 0.5em 1em;
  color: #fff;
  border: none;
  font-size: 1.13em;
  margin-top: 2em;
  width: 100%;
`;

const EditCard = ({ cardDetails, setCardDetails }) => {
  const { id } = cardDetails;
  const [credit, setCredit] = useState({ initialCredit: "" });

  const { mutateAsync, isLoading } = useMutation(updateCard);
  const { mutateAsync: mutate, isLoading: deleting } = useMutation(deleteCard);
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync({id, ...credit});
    queryClient.invalidateQueries("cards");
    setCredit({ initialCredit: "" });
    setCardDetails("")
  };

  const handleChange = (e) => {
    setCredit({ initialCredit: e.target.value });
  };

  const handleDelete = async () => {
    await mutate(id);
    queryClient.invalidateQueries("cards");
    setCardDetails("");
  };
  return (
    <EditBox>
      <AiOutlineClose
        style={{ position: "absolute", top: "10px" }}
        onClick={() => setCardDetails("")}
      />
      <Title>{`עריכת כרטיס ${cardDetails.number}`}</Title>
      <EditCredit onSubmit={handleSubmit}>
        <div>
          <FormLabel>הזן סכום:</FormLabel>
          <FormInput
            type="text"
            name="initialCredit"
            value={credit.initialCredit}
            onChange={handleChange}
          />
        </div>
        <FormBtn disabled={isLoading}>עדכן</FormBtn>
      </EditCredit>
      <DeleteBtn onClick={handleDelete}>
        {deleting ? "מסיר..." : "הסר כרטיס"}
      </DeleteBtn>
    </EditBox>
  );
};

export default EditCard;

import React, { useState } from "react";
import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { MdModeEdit } from "react-icons/md";
import { addCard, getCards } from "../api";
import { AiFillCaretDown } from "react-icons/ai";
import EditCard from "./EditCard";

const ModalBg = styled.section`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  min-height: 100%;
  width: 100%;
  @media (min-width: 950px) {
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
  }
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 0 2em 2em 2em;
  position: absolute;
  top: 3em;
  left: 5%;
  width: 90%;
  padding-top: 2em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.h1`
  color: #0000e6;
  text-align: center;
  margin: 2em 0;
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
  margin-bottom: 1em;
  width: 100%;
  &:focus {
    outline: none;
    border-bottom: 1px solid #1a1aff;
  }
`;

const InputsRow = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    width: 40%;
  }
`;

const FormBtn = styled.button`
  background: #1a1aff;
  padding: 0.5em 1em;
  color: #fff;
  border: none;
  font-size: 1.2em;
  margin-top: 1em;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5em;
  width: 90%;
  border-bottom: 1px solid #ccccff;
`;

const CardWraper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding 1em 0.8em 0 0.8em;
`;

const IconContainer = styled.div`
  width: 10%;
  display: grid;
  place-items: center;
  font-size: 1.2em;
  color: #8080ff;
`;

const CardNumber = styled.h4``;

const CardAmount = styled.p``;

const Modal = ({ setShowModel }) => {
  const [showCardsList, setShowCardList] = useState(false);
  const [cardDetails, setCardDetails] = useState();
  const [cardForm, setCardForm] = useState({
    name: "",
    number: "",
    initialCredit: "",
    resetDay: "",
  });

  const { isLoading, data } = useQuery("cards", getCards);

  const { mutateAsync, isLoading: isMutating } = useMutation(addCard);
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCardForm({ ...cardForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync(cardForm);
    queryClient.invalidateQueries("cards");
    setShowModel(false);
  };

  const handleClick = () => {
    setShowCardList((prev) => !prev);
  };

  const edit = (e) => {
    const { id, dataset } = e.target;
    setCardDetails({ id, number: dataset.number });
  };

  return (
    <ModalBg>
      <ModalContainer>
        {cardDetails && (
          <EditCard
            cardDetails={cardDetails}
            setCardDetails={setCardDetails}
            setShowModel={setShowModel}
          />
        )}
        <Form onSubmit={handleSubmit}>
          <FormTitle>הוסף כרטיס</FormTitle>
          <FormLabel>שם כרטיס:</FormLabel>
          <FormInput
            type="text"
            name="name"
            value={cardForm.name}
            onChange={handleChange}
          />
          <FormLabel>מספר כרטיס:</FormLabel>
          <FormInput
            type="text"
            name="number"
            value={cardForm.number}
            onChange={handleChange}
          />
          <InputsRow>
            <div>
              <FormLabel>מסגרת:</FormLabel>
              <FormInput
                type="text"
                name="initialCredit"
                value={cardForm.initialCredit}
                onChange={handleChange}
              />
            </div>
            <div>
              <FormLabel>תאריך:</FormLabel>
              <FormInput
                type="text"
                name="resetDay"
                value={cardForm.resetDay}
                onChange={handleChange}
              />
            </div>
          </InputsRow>
          <FormBtn disabled={isMutating}>
            {isMutating ? "מוסיף..." : "הוסף"}
          </FormBtn>
          <FormTitle>
            הכרטיסים שלי{" "}
            <AiFillCaretDown
              style={{ paddingTop: "0.25em" }}
              onClick={handleClick}
            />
          </FormTitle>
          {!isLoading &&
            showCardsList &&
            data &&
            data.data.map((card) => (
              <CardWraper key={card._id}>
                <IconContainer id={card._id} onClick={edit}>
                  <MdModeEdit id={card._id} data-number={card.number} />
                </IconContainer>
                <CardContainer>
                  <CardNumber>{card.number}</CardNumber>
                  <CardAmount>{`${card.initialCredit}₪`}</CardAmount>
                </CardContainer>
              </CardWraper>
            ))}
        </Form>
      </ModalContainer>
    </ModalBg>
  );
};

export default Modal;

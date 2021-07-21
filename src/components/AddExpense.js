import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { AddExpenses } from "../api";

const Container = styled.div`
  padding: 1em 1em;
`;

const Title = styled.h4`
  border-bottom: 1px solid #9999ff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  color: #000;
  margin-top: 1em;
  margin-bottom: 0.3em;
`;

const FormInput = styled.input`
  border: none;
  background: #fff;
  font-size: 1.1em;
  padding: 0.5em 0.8em;
  margin-bottom: 1em;
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
  font-size: 1.2em;
  margin-top: 1em;
`;

const AddExpense = () => {
  const [expenseForm, setExpenseForm] = useState({
    text: "",
    amount: "",
  });

  const { mutateAsync, isLoading } = useMutation(AddExpenses);
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseForm({ ...expenseForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync(expenseForm);
    queryClient.invalidateQueries("expenses");
    setExpenseForm({
      text: "",
      amount: "",
    });
  };
  return (
    <Container>
      <Title>הוסף רכישה:</Title>
      <Form onSubmit={handleSubmit}>
        <FormLabel>עבור:</FormLabel>
        <FormInput
          type="text"
          name="text"
          value={expenseForm.text}
          onChange={handleChange}
        />
        <FormLabel>סכום:</FormLabel>
        <FormInput
          type="text"
          name="amount"
          value={expenseForm.amount}
          onChange={handleChange}
        />
        <FormBtn disabled={isLoading}>{isLoading ? "שולח..." : "שלח"}</FormBtn>
      </Form>
    </Container>
  );
};

export default AddExpense;

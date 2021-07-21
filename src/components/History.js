import React from "react";
import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { RiDeleteBin2Line } from "react-icons/ri";

import { getExpenses } from "../api";
import { deleteExpense } from "../api";

const HistoryContainer = styled.div`
  padding: 2em 1em;
`;
const Title = styled.h4`
  border-bottom: 1px solid #9999ff;
`;

const ExpenseWraper = styled.div`
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
  color: #ff0000;
`;
const ExpenseContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5em;
  width: 90%;
  border-bottom: 1px solid #ccccff;
`;

const ExpenseName = styled.h4``;

const ExpenseAmount = styled.p`

`;

const History = () => {
  const { isLoading, isError, data, error } = useQuery("expenses", getExpenses);
  const { mutateAsync } = useMutation(deleteExpense);
  const queryClient = useQueryClient();
  if (isLoading) return <h1>Loading</h1>;
  if (isError) return <h1>{error}</h1>;

  const handleDelete = async (e) => {
    const { id } = e.target;
    await mutateAsync(id);
    queryClient.invalidateQueries("expenses");
  };
  return (
    <HistoryContainer>
      <Title>רכישות החודש</Title>
      {data &&
        data.data.map((expense) => (
          <ExpenseWraper key={expense._id}>
            <IconContainer id={expense._id} onClick={handleDelete}>
              {" "}
              <RiDeleteBin2Line id={expense._id} style={{ zIndex: "-99" }} />
            </IconContainer>
            <ExpenseContainer>
              <ExpenseName>{expense.text}</ExpenseName>
              <ExpenseAmount>{`${expense.amount}₪`}</ExpenseAmount>
            </ExpenseContainer>
          </ExpenseWraper>
        ))}
    </HistoryContainer>
  );
};

export default History;

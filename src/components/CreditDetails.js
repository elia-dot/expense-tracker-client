import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";

import { getCards, getExpenses } from "../api";
import { numberWithCommas } from "../utils/numWithCommas";
import {getHour} from '../utils/getHour'

const Container = styled.div`
  text-align: center;
  padding: 1em;
`;

const DetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailsTitle = styled.h2`
  margin: 1em;
`;

const DetailsText = styled.p`
  margin-bottom: 0.5em;
`;

const CreditAmount = styled.h6`
  font-size: 1em;
`;

const CreditDetails = () => {
  const { isLoading, isError, data, error } = useQuery("cards", getCards);
  const { isLoading: loading, data: expenseDate } = useQuery(
    "expenses",
    getExpenses
  );
  let amount = 0;
  let sum = 0;
  data && data.data.forEach((card) => (amount += card.initialCredit * 1));
  if (isError) return <h1>{error.message}</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  if (!loading) {
    expenseDate && expenseDate.data.forEach((exp) => (sum += exp.amount * 1));
  }
  return (
    <Container>
      <DetailsTitle>{getHour()}</DetailsTitle>
      <DetailsRow>
        {" "}
        <DetailsText>מסגרת האשראי היא:</DetailsText>
        <CreditAmount>{numberWithCommas(amount)}</CreditAmount>
      </DetailsRow>
      <DetailsRow>
        {" "}
        <DetailsText>סכום שנותר:</DetailsText>
        <CreditAmount>{numberWithCommas(amount - sum)}</CreditAmount>
      </DetailsRow>
    </Container>
  );
};

export default CreditDetails;

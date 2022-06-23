import React from "react";

import AppTemplate from "@layout/AppTemplate";
import LoadingSpinner from "@components/LoadingSpinner";
import { useCheeses } from "@hooks/cheese";

const HomePage = () => {
  const { isLoading, data } = useCheeses();

  const cheeses = data || [];
  return (
    <AppTemplate>
      <LoadingSpinner isLoading={isLoading} message="loading...">
        {cheeses.map((cheese) => cheese.name)}
      </LoadingSpinner>
    </AppTemplate>
  );
};

export default HomePage;

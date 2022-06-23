import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import AppTemplate from "@layout/AppTemplate";
import { useCheeses } from "@hooks/cheese";
import { Cheese } from "@api/generated";
import CheeseDialog from "@components/Dialog/CheeseDialog";
import CheeseCards from "@components/CheeseCards/CheeseCards";
import LoadingSpinner from "@components/LoadingSpinner";

const HomePage = () => {
  const { isLoading, data } = useCheeses();
  const [selectedCheese, setSelectedCheese] = useState<Cheese | null>(null);

  const handleAddCheese = () => {
    setSelectedCheese({
      id: 0,
      name: "",
      color: "",
      pricePerKilo: 0,
      imageUrl: "",
    });
  };

  const cheeses = data || [];
  return (
    <AppTemplate>
      <LoadingSpinner isLoading={isLoading} message="loading...">
        <CheeseDialog cheese={selectedCheese} onClose={() => setSelectedCheese(null)} />
        <Stack padding={2}>
          <Stack alignItems="flex-end" maxWidth="1060px" margin="auto" width="100%">
            <Box marginLeft={2} marginRight={2}>
              <Button variant="contained" onClick={handleAddCheese}>
                Add Cheese
              </Button>
            </Box>
          </Stack>
          <CheeseCards>
            {cheeses.map((cheese) => (
              <CheeseCards.Card key={cheese.id} {...cheese} selectCheese={() => setSelectedCheese(cheese)} />
            ))}
          </CheeseCards>
        </Stack>
      </LoadingSpinner>
    </AppTemplate>
  );
};

export default HomePage;

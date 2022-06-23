import React, { PropsWithChildren } from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography, styled } from "@mui/material";
import centsToDollars from "@utils/centsToDollars";
import { Cheese } from "@api/generated";

const defaultCheeseImageUrl = "/icons/icon-384x384.png";

interface CheeseCardProps extends Cheese {
  selectCheese: () => void;
}

const CheeseCard = ({ name, imageUrl, color, pricePerKilo, selectCheese }: CheeseCardProps) => {
  const dollarsPerKilo = centsToDollars(pricePerKilo);

  return (
    <Card>
      <StyledCardMedia image={imageUrl || defaultCheeseImageUrl} title={name} />
      <CardContent>
        <Title>{name}</Title>
        <Stack>
          <Text>Color: {color}</Text>
          <Text>Price Per Kilo: ${dollarsPerKilo}</Text>
        </Stack>
      </CardContent>
      <CardActions>
        <Button onClick={selectCheese}>Edit</Button>
      </CardActions>
    </Card>
  );
};

const CheeseCards = ({ children }: PropsWithChildren<unknown>) => {
  return <Root>{children}</Root>;
};

const Title = ({ children }: PropsWithChildren<unknown>) => (
  <Typography variant="h5" component="h2">
    {children}
  </Typography>
);
const Text = ({ children }: PropsWithChildren<unknown>) => (
  <Typography variant="body1" component="p">
    {children}
  </Typography>
);

const Root = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridGap: theme.spacing(2),
  maxWidth: theme.breakpoints.values.lg,
  margin: `${theme.spacing(2)} auto`,
  padding: `0 ${theme.spacing(2)}`,
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr 1fr",
    margin: `${theme.spacing(2)} 0`,
    padding: `0 ${theme.spacing(1)}`,
  },
  [theme.breakpoints.down("xs")]: {
    gridTemplateColumns: "1fr",
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 140,
});

CheeseCards.Card = CheeseCard;

export default CheeseCards;

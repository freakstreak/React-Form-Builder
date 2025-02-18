import { CardProps, Card as MuiCard } from "@mui/material";

export interface ICard {
  icon: any;
  label: string;
  value: number | string;
}

const Card = ({ ...props }: CardProps) => {
  return (
    <>
      <MuiCard {...props}>{props.children}</MuiCard>
    </>
  );
};

export default Card;

import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  AccordionProps,
  AccordionSummaryProps,
  AccordionDetailsProps,
} from "@mui/material";

export const Accordion = ({ ...props }: AccordionProps) => {
  return <MuiAccordion {...props}>{props.children}</MuiAccordion>;
};

export const AccordionSummary = ({ ...props }: AccordionSummaryProps) => {
  return <MuiAccordionSummary {...props}>{props.children}</MuiAccordionSummary>;
};

export const AccordionDetails = ({ ...props }: AccordionDetailsProps) => {
  return <MuiAccordionDetails {...props}>{props.children}</MuiAccordionDetails>;
};

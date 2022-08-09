import React from "react";
import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";

export default class CreateEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: props.activeStep || 1,
    };
    this.submitCreateForm = this.submitCreateForm.bind(this);
  }

  submitCreateForm() {}
  render() {
    const pageOne = () => {
      return <Typography variant="h4" component="h3"></Typography>;
    };
    const pageTwo = () => {
      return <Typography variant="h4" component="h3"></Typography>;
    };
    const pageThree = () => {
      return <Typography variant="h4" component="h3"></Typography>;
    };
    const pageFour = () => {
      return <Typography variant="h4" component="h3"></Typography>;
    };

    const pages = [
      { id: 1, label: "Schedule Event", element: pageOne },
      { id: 2, label: "Select Location & Guests", element: pageTwo },
      { id: 3, label: "Select Preferences", element: pageThree },
      { id: 4, label: "Submit Event", element: pageFour },
    ];
    return (
      <Box sx={{ display: "flex", height: "100vh" }}>
        <form onSubmit={this.submitCreateForm}>
          <Typography variant="h3" component="h2">
            Create Your Party
          </Typography>
          <Box>
            <Stepper activeStep={this.state.activePage}>
              {pages.map(({ page }) => {
                return (
                  <Step key={page.id}>
                    <StepLabel>{page.label}</StepLabel>
                    {page.element}
                  </Step>
                );
              })}
            </Stepper>
          </Box>
        </form>
      </Box>
    );
  }
}

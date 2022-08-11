import React from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Typography,
  TextField,
} from "@mui/material";
import { PageOne, PageTwo, PageThree } from "./FormSteps";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: props.activeStep || 1,
      eventDate: new Date(),
      eventData: {
        eventTitle: "",
        eventDescription: "",
        eventDate: new Date(),
      },
      pages: [
        { id: 1, label: "Schedule Event" },
        { id: 2, label: "Choose Location & Guests" },
        { id: 3, label: "Select Preferences" },
        { id: 4, label: "Submit Event" },
      ],
    };
    this.submitCreateForm = this.submitCreateForm.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this._renderStepContent = this._renderStepContent.bind(this);
    this._handleBack = this._handleBack.bind(this);
    this._handleNext = this._handleNext.bind(this);
  }

  submitCreateForm() {}
  handleChangeDate(newValue) {
    this.setState((prevState) => {
      var eventData = prevState.eventData;
      eventData.eventDate = newValue;
      return { eventData: eventData };
    });
  }
  _renderStepContent(step, formState) {
    switch (step) {
      case 1:
        return <PageOne eventDate={formState.eventData.eventDate} handleChangeDate={this.handleChangeDate} />;
      case 2:
        return <PageTwo />;
      case 3:
        return <PageThree />;
      default:
        return <div>Not Found</div>;
    }
  }

  _handleBack() {
    this.setState((prevState) => ({
      activeStep: prevState.activeStep - 1,
    }));
  }

  _handleNext() {
    console.log(this.state.activeStep);
    this.setState((prevState) => ({
      activeStep: prevState.activeStep + 1,
    }));
  }

  render() {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ minWidth: "70vw" , paddingBottom: 5}}>
          <form onSubmit={this.submitCreateForm}>
            <Typography variant="h3" component="h2">
              Create Your Party
            </Typography>
            <Box sx={{ paddingTop: 5 }}>
              <Stepper
                alternativeLabel
                connector={<StepConnector />}
                activeStep={this.state.activeStep - 1}
              >
                {this.state.pages.map((page) => {
                  return (
                    <Step key={page.id}>
                      <StepLabel>{page.label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <Box>
                <React.Fragment>
                  {this._renderStepContent(this.state.activeStep, this.state)}
                </React.Fragment>
              </Box>
            </Box>
            <Box>
              {this.state.activeStep !== 1 && (
                <Button onClick={this._handleBack}>Back</Button>
              )}
              <Button
                disabled={this.state.isSubmitting}
                onClick={this._handleNext}
                variant="contained"
                color="primary"
              >
                {this.state.activeStep === 4 ? "Create Event" : "Next"}
              </Button>
            </Box>
          </form>
        </Box>
      </LocalizationProvider>
    );
  }
}

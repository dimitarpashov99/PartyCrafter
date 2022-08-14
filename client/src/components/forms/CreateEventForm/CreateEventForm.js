import React from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Typography,
} from "@mui/material";
import { PageOne, PageTwo, PageThree } from "./FormSteps";
import EventPreview from "../../pcevent/EventPreview";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: props.activeStep || 1,
      eventData: {
        eventTitle: "",
        eventDescription: "",
        eventAddress: "",
        privateEvent: false,
        eventDate: new Date(),
        preferences: {
          musicPreference: false,
          foodPreference: false,
          allowRequests: false,
          allowPhotoUploads: false,
          allowChat: false,
          allowGuestInvites: false,
        },
      },
      locationMap: null,
      pages: [
        { id: 1, label: "Schedule Event" },
        { id: 2, label: "Choose Location & Guests" },
        { id: 3, label: "Select Preferences" },
        { id: 4, label: "Submit Event" },
      ],
    };
    this.submitCreateForm = this.submitCreateForm.bind(this);
    // this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this._renderStepContent = this._renderStepContent.bind(this);
    this._handleBack = this._handleBack.bind(this);
    this._handleNext = this._handleNext.bind(this);
  }

  submitCreateForm() {}
  handleFormChange(newValue) {
    console.log(newValue);
    this.setState({ eventData: newValue });
  }
  _renderStepContent(step) {
    switch (step) {
      case 1:
        return (
          <PageOne
            formState={this.state.eventData}
            handleFormChange={this.handleFormChange}
          />
        );
      case 2:
        return (
          <PageTwo
            formState={this.state.eventData}
            handleFormChange={this.handleFormChange}
          />
        );
      case 3:
        return (
          <PageThree
            formState={this.state.eventData}
            handleFormChange={this.handleFormChange}
          />
        );
      case 4:
        return (
          <EventPreview
            formState={this.state.eventData}
            handleFormChange={this.handleFormChange}
          />
        );
      default:
        return (
          <Box>
            Step Not Found
            <Button
              onClick={() => {
                this.setState({
                  activeStep: 1,
                });
              }}
            >
              Return to Step 1
            </Button>
          </Box>
        );
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
        <Box sx={{ minWidth: "70vw", paddingBottom: 5 }}>
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
                  {this._renderStepContent(this.state.activeStep)}
                </React.Fragment>
              </Box>
            </Box>
            <Box sx={{ paddingY: 5 }}>
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

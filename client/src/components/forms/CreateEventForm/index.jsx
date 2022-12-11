import React from "react";
import {
    Backdrop,
    Box,
    Button,
    Divider,
    Fade,
    Modal,
    Paper,
    Stack,
    Stepper,
    Step,
    StepLabel,
    StepConnector,
    Typography,
} from "@mui/material";
import { StepOne, StepTwo, StepThree } from "./FormSteps";
import EventPreview from "../../partyevent/EventPreview";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CreateFoodMenuForm from "../CreateFoodMenuForm/CreateFoodMenuForm";
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
                    assignGuestTables: false,
                },
                chosenPlaylist: null,
                chosenFoodMenu: null,
                tableCount: 1,
                guestList: null,
            },
            foodMenuModalOpen: false,
            eventSubmitted: false,
            locationMap: null,
            steps: [
                { id: 1, label: "Schedule Event" },
                { id: 2, label: "Choose Location & Guests" },
                { id: 3, label: "Select Preferences" },
                { id: 4, label: "Submit Event" },
            ],
        };
        this.foodModalRef = React.createRef();
        // this.submitCreateForm = this.submitCreateForm.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this._renderStepContent = this._renderStepContent.bind(this);
        this._handleBack = this._handleBack.bind(this);
        this._handleNext = this._handleNext.bind(this);
        this.handleFoodMenuModalOpen = this.handleFoodMenuModalOpen.bind(this);
    }
    handleFormChange(eventData) {
        this.setState({ eventData: eventData });
    }
    handleFoodMenuModalOpen() {
        this.setState({ foodMenuModalOpen: true });
    }
    _renderStepContent(step) {
        switch (step) {
            case 1:
                return (
                    <StepOne
                        formState={this.state.eventData}
                        handleFormChange={this.handleFormChange}
                    />
                );
            case 2:
                return (
                    <StepTwo
                        formState={this.state.eventData}
                        handleFormChange={this.handleFormChange}
                    />
                );
            case 3:
                return (
                    <StepThree
                        formState={this.state.eventData}
                        handleFormChange={this.handleFormChange}
                        handleFoodMenuModalOpen={this.handleFoodMenuModalOpen}
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
        if (this.state.activeStep < 4) {
            this.setState((prevState) => ({
                activeStep: prevState.activeStep + 1,
            }));
        } else {
            this.setState({ eventSubmitted: true });
        }
    }

    render() {
        return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Paper sx={{ width: { xs: "100vw", md: "80vw" }, paddingY: 5 }}>
                    {!this.state.eventSubmitted && (
                        <React.Fragment>
                            <form onSubmit={this.submitCreateForm}>
                                <Typography
                                    color="primary.main"
                                    variant="h3"
                                    component="h2"
                                >
                                    Plan Your Party
                                </Typography>
                                <Box sx={{ paddingTop: 5 }}>
                                    <Stepper
                                        alternativeLabel
                                        connector={<StepConnector />}
                                        activeStep={this.state.activeStep - 1}
                                    >
                                        {this.state.steps.map((page) => {
                                            return (
                                                <Step key={page.id}>
                                                    <StepLabel>
                                                        <Typography
                                                            variant="body1"
                                                            color="primary"
                                                        >
                                                            {page.label}
                                                        </Typography>
                                                    </StepLabel>
                                                </Step>
                                            );
                                        })}
                                    </Stepper>
                                    <Paper>
                                        <React.Fragment>
                                            {this._renderStepContent(
                                                this.state.activeStep
                                            )}
                                        </React.Fragment>
                                    </Paper>
                                </Box>
                                <Box sx={{ paddingY: 5 }}>
                                    <Stack
                                        spacing={1}
                                        divider={
                                            <Divider
                                                orientation="vertical"
                                                flexItem
                                            />
                                        }
                                        direction="row"
                                        sx={{ justifyContent: "center" }}
                                    >
                                        {this.state.activeStep !== 1 && (
                                            <Button
                                                variant="outlined"
                                                onClick={this._handleBack}
                                            >
                                                Back
                                            </Button>
                                        )}

                                        <Button
                                            disabled={this.state.isSubmitting}
                                            onClick={this._handleNext}
                                            variant="contained"
                                            color="primary"
                                        >
                                            {this.state.activeStep === 4
                                                ? "Create Event"
                                                : "Next"}
                                        </Button>
                                    </Stack>
                                </Box>
                            </form>
                            <Modal
                                aria-labelledby="chosen-foodmenu-modal"
                                open={this.state.foodMenuModalOpen}
                                onClose={() => {
                                    this.setState({ foodMenuModalOpen: false });
                                }}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                                ref={this.foodModalRef}
                            >
                                <Fade in={this.state.foodMenuModalOpen}>
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            textAlign: "center",
                                            bgcolor: "background.paper",
                                            border: "2px solid #000",
                                            boxShadow: 24,
                                            p: 4,
                                            maxHeight: "90vh",
                                            overflowY: "scroll",
                                        }}
                                    >
                                        <CreateFoodMenuForm />
                                    </Box>
                                </Fade>
                            </Modal>
                        </React.Fragment>
                    )}
                    {this.state.eventSubmitted && (
                        <React.Fragment>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    minHeight: "80vh",
                                }}
                            >
                                <Typography variant="h4">
                                    Your event has been scheduled successfuly!
                                </Typography>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </LocalizationProvider>
        );
    }
}

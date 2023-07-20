import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
        <ModalBody>
          <Form>

            {/* <FormGroup>
              <Label for="user_email">User Email</Label>
              <Input
                type="text"
                id="user_email"
                name="user_email"
                value={this.state.activeItem.user_email}
                onChange={this.handleChange}
                placeholder="Enter User Email"
              />
            </FormGroup> */}
            <FormGroup>
              <Label for="rest_name">Rest Name</Label>
              <Input
                type="text"
                id="rest_name"
                name="rest_name"
                value={this.state.activeItem.rest_name}
                onChange={this.handleChange}
                placeholder="Enter Rest Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="rest_id">REST ID</Label>
              <Input
                type="text"
                id="rest_id"
                name="rest_id"
                value={this.state.activeItem.rest_id}
                onChange={this.handleChange}
                placeholder="Rest ID"
              />
            </FormGroup>
            <FormGroup>
              <Label for="date">Date for Reservation</Label>
              <Input
                type="date"
                id="date"
                name="date"
                value={this.state.activeItem.date}
                onChange={this.handleChange}
                placeholder="Enter Booking Date"
              />
            </FormGroup>
            <FormGroup>
              <Label for="from_time">From Time</Label>
              <Input
                type="time"
                id="from_time"
                name="from_time"
                value={this.state.activeItem.from_time}
                onChange={this.handleChange}
                placeholder="From Time"
              />
            </FormGroup>
            <FormGroup>
              <Label for="to_time">To Time</Label>
              <Input
                type="time"
                id="to_time"
                name="to_time"
                value={this.state.activeItem.to_time}
                onChange={this.handleChange}
                placeholder="To Time"
              />
            </FormGroup>
            <FormGroup>
              <Label for="number_of_guests">Number of Guests</Label>
              <Input
                type="text"
                id="number_of_guests"
                name="number_of_guests"
                value={this.state.activeItem.number_of_guests}
                onChange={this.handleChange}
                placeholder="Number of Guests"
              />
            </FormGroup>
            <FormGroup>
              <Label for="booking_available_till">Booking Available Till</Label>
              <Input
                type="date"
                id="booking_available_till"
                name="booking_available_till"
                value={this.state.activeItem.booking_available_till}
                onChange={this.handleChange}
                placeholder="Booking Available Till"
              />
            </FormGroup>
            <FormGroup>
              <Label for="booking_confirm">Booking Status</Label>
              <Input
                type="text"
                id="booking_confirm"
                name="booking_confirm"
                value={this.state.activeItem.booking_confirm}
                onChange={this.handleChange}
                placeholder="Booking Status"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
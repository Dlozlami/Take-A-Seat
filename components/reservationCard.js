import React, { useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  deleteReservation,
  updateReservation,
} from "../features/reservationSlice";
import { styles } from "../assets/css/styles";
import NumberInput from "./numberInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DatePickerModal } from "react-native-paper-dates";
import { TimePickerModal } from "react-native-paper-dates";

const ReservationCard = ({ reservation }) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const { restaurantsList } = useSelector((store) => store.restaurant);
  const myRestaurant = restaurantsList.find(
    (restaurant) => restaurant.id === reservation.restaurantID
  );
  console.log("reservationCard.js line 29 reservation: ", reservation);

  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      date.setHours(hours, 0, 0);
      console.log({ hours, minutes });
    },
    [setVisible]
  );
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  const [newGuests, setNewGuests] = useState(reservation.guests);

  const [openModal, setOpenodal] = useState(false);

  console.log("RestaurantCard line 58 rendered: ", myRestaurant.name);
  const [date, setDate] = useState(new Date(reservation.reservationDate));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
    console.log("User email: ", userEmail);
  };

  const handleUpdate = () => {
    const today = new Date();
    date.setMinutes(0, 0, 0);

    const reservationData = {
      restaurantID: reservation.restaurantID,
      fullname: reservation.fullname,
      userEmail: reservation.userEmail,
      phone: reservation.phone,
      reservationDate: date.getTime(),
      reservationMade: reservation.reservationMade,
      guests: newGuests,
      arrived: false,
    };
    console.log("RestaurantCard line 97 reservationData: ", reservationData);
    dispatch(updateReservation([reservation.id, reservationData]));
    setOpenodal(false);
  };

  const handleArrived = () => {
    const today = new Date();
    date.setMinutes(0, 0, 0);

    const reservationData = {
      restaurantID: reservation.restaurantID,
      fullname: reservation.fullname,
      userEmail: reservation.userEmail,
      phone: reservation.phone,
      reservationDate: date.getTime(),
      reservationMade: reservation.reservationMade,
      guests: newGuests,
      arrived: reservation.arrived ? false : true,
    };
    console.log("RestaurantCard line 97 reservationData: ", reservationData);
    dispatch(updateReservation([reservation.id, reservationData]));
  };

  const handleDelete = () => {
    dispatch(deleteReservation(reservation.id));
  };

  return (
    <View style={localStyles.card}>
      <View style={{ padding: 10 }}>
        <View
          style={{
            borderBottomColor: "#335930",
            borderBottomWidth: 1,
          }}
        >
          <Text style={localStyles.title}>{reservation.fullname}</Text>
          <Text style={localStyles.value}>{reservation.userEmail}</Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={localStyles.label}>Date: </Text>
              <Text style={localStyles.value}>
                {new Date(reservation.reservationDate).toDateString()}
              </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={localStyles.label}>Time: </Text>
              <Text style={localStyles.value}>
                {new Date(reservation.reservationDate).toTimeString()}
              </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={localStyles.label}>Guests: </Text>
              <Text style={localStyles.value}>{newGuests}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => setOpenodal(true)}>
              <FontAwesome name="edit" size={24} color="#335930" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#335930",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ ...localStyles.label, color: "white" }}>
            {myRestaurant.name}
          </Text>
          <Text style={{ ...localStyles.value, color: "white" }}>
            {myRestaurant.location}
          </Text>
          <Text style={{ ...localStyles.value, color: "white" }}>
            {myRestaurant.phone}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleDelete}>
            <FontAwesome name="trash" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: reservation.arrived ? "#3dc67d" : "#f3572a",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{}}>
          <Text style={{ fontSize: 25, color: "white" }}>Arrived</Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleArrived}>
            {reservation.arrived ? (
              <AntDesign name="checksquareo" size={24} color="white" />
            ) : (
              <AntDesign name="closesquareo" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={openModal} transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: "100%",
                backgroundColor: "#335930",
              }}
            >
              {/* <Image
                source={myRestaurant.imageURL}
                style={styles.image}
                resizeMode="contain"
              /> */}
              <View style={styles.details}>
                <Text style={{ ...styles.name, color: "white" }}>
                  {myRestaurant.name}
                </Text>
                <Text style={{ ...styles.description, color: "white" }}>
                  {myRestaurant.description}
                </Text>
                <Text style={{ ...styles.location, color: "white" }}>
                  {myRestaurant.location}
                </Text>
                <Text style={{ ...styles.contact, color: "white" }}>
                  {myRestaurant.phone}
                </Text>
                <Text style={{ ...styles.contact, color: "white" }}>
                  {myRestaurant.email}
                </Text>
              </View>
            </View>
            <View style={{ padding: 20 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 5,
                }}
              >
                <Text>How many people?</Text>
                <NumberInput
                  min={1}
                  max={100}
                  value={newGuests}
                  setValue={setNewGuests}
                />
              </View>
              {Platform.OS === "web" ? (
                <>
                  <View
                    style={{
                      justifyContent: "center",
                      flex: 1,
                      alignItems: "flex-start",
                    }}
                  >
                    <Text>At what time?</Text>
                    <TouchableOpacity
                      onPress={() => setVisible(true)}
                      style={styles.pickerBTN}
                    >
                      <Text style={{ display: "flex", alignItems: "center" }}>
                        <MaterialCommunityIcons
                          name="clock-time-four-outline"
                          size={24}
                          color="black"
                          style={{ marginRight: 10 }}
                        />
                        {date.toTimeString().split(" ")[0]}
                      </Text>
                    </TouchableOpacity>
                    <TimePickerModal
                      visible={visible}
                      onDismiss={onDismiss}
                      onConfirm={onConfirm}
                      hours={12}
                      minutes={14}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      flex: 1,
                      alignItems: "flex-start",
                    }}
                  >
                    <Text>On which date?</Text>
                    <TouchableOpacity
                      onPress={() => setOpen(true)}
                      style={styles.pickerBTN}
                    >
                      <Text style={{ display: "flex", alignItems: "center" }}>
                        <MaterialCommunityIcons
                          name="calendar-month"
                          size={24}
                          color="black"
                          style={{ marginRight: 10 }}
                        />
                        {date.toDateString()}
                      </Text>
                    </TouchableOpacity>
                    <DatePickerModal
                      locale="en"
                      mode="single"
                      visible={open}
                      onDismiss={onDismissSingle}
                      date={date}
                      onConfirm={onConfirmSingle}
                    />
                  </View>
                </>
              ) : (
                <>
                  <Text>On which date?</Text>
                  <TouchableOpacity
                    onPress={showDatepicker}
                    style={styles.pickerBTN}
                  >
                    <MaterialCommunityIcons
                      name="calendar-month"
                      size={24}
                      color="black"
                      style={{ marginRight: 10 }}
                    />
                    <Text>{date.toDateString()}</Text>
                  </TouchableOpacity>

                  <Text>At what time?</Text>
                  <TouchableOpacity
                    onPress={showTimepicker}
                    style={styles.pickerBTN}
                  >
                    <MaterialCommunityIcons
                      name="clock-time-four-outline"
                      size={24}
                      color="black"
                      style={{ marginRight: 10 }}
                    />
                    <Text
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {date.toTimeString().split(" ")[0]}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              <Text style={{ color: "red" }}>
                Please note all booking times will be converted to o'clock e.g.
                if you book for 15:14 it will be saved on our system as 15:00.
              </Text>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </View>
            <View
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "row",
                borderTopWidth: 1,
                borderTopColor: "#335930",
              }}
            >
              <TouchableOpacity style={styles.okButton} onPress={handleUpdate}>
                <Text style={styles.okButtonText}>Update Reservation</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.okButton}
                onPress={() => setOpenodal(false)}
              >
                <Text style={styles.okButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const localStyles = StyleSheet.create({
  card: {
    backgroundColor: "white",

    margin: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    marginBottom: 8,
    color: "#555",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default ReservationCard;

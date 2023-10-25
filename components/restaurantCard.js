import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Button,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../assets/css/styles";
import { DatePickerModal } from "react-native-paper-dates";
import { TimePickerModal } from "react-native-paper-dates";
import NumberInput from "./numberInput";
import { addReservation, deleteRestaurant } from "../features/reservationSlice";

export default function RestaurantCard({ restaurant }) {
  const { userEmail, loggedUser } = useSelector((store) => store.login);
  const dispatch = useDispatch();
  const nav = useNavigation();
  const [visible, setVisible] = React.useState(false);

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

  const [guests, setGuests] = useState(1);
  const [openModal, setOpenodal] = useState(false);

  //console.log("RestaurantCard line 58 rendered: ", restaurant.name);
  const [date, setDate] = useState(new Date());
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

  const handleBookNow = () => {
    const today = new Date();
    date.setMinutes(0, 0, 0);

    console.log("RestaurantCard line 87 loggedUser.name: ", userEmail);
    const reservationData = {
      restaurantID: restaurant.id,
      fullname: loggedUser.name,
      userEmail: userEmail,
      phone: loggedUser.phone,
      reservationDate: date.getTime(),
      reservationMade: today.getTime(),
      guests: guests,
      arrived: false,
    };
    dispatch(addReservation(reservationData));
    setOpenodal(false);
  };

  const handleDelete = () => {
    dispatch(deleteRestaurant(restaurant.id));
  };

  return (
    <>
      <View
        style={{...styles.card,display: "flex", flexDirection: "row" }}
      >
        {/* <Image
          source={restaurant.imageURL}
          style={styles.image}
          resizeMode="cover"
        /> */}
        <TouchableOpacity onPress={() => {
          console.log("restaurant.restaurantID: ", restaurant.id);
          loggedUser.admin
            ? nav.push("editRestaurant", { restaurantID: restaurant.id })
            : setOpenodal(true);
          //console.log("restCard line 12 openModal: ", openModal);
        }} style={{width: "80%" }}>
          <View style={{ ...styles.details }}>
            <Text style={{ ...styles.name, color: "#335930" }}>
              {restaurant.name}
            </Text>

            <Text style={{ ...styles.location, color: "#335930" }}>
              {restaurant.location}
            </Text>
            <Text style={{ ...styles.contact, color: "#335930" }}>
              {restaurant.phone}
            </Text>
            <Text style={{ ...styles.ratings }}>
              Ratings: {restaurant.ratings}
            </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              display: "flex",
              justifyContent: "center",
              width: "20%",
              alignItems: "center",
              backgroundColor: "#335930",
            }}

            onPress={()=>{
              loggedUser.admin?handleDelete:null;
            }}
          >
            {
              loggedUser.admin?<MaterialCommunityIcons name="trash-can-outline" size={24} color="white" />:
            <MaterialCommunityIcons
              name="table-chair"
              size={24}
              color="white"
            />}
           </TouchableOpacity>    
      </View>


      <Modal visible={openModal} transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                backgroundColor: "#335930",
              }}
            >
              {/* <Image
                source={restaurant.imageURL}
                style={styles.image}
                resizeMode="contain"
              /> */}
              <View style={styles.details}>
                <Text style={{ ...styles.name, color: "white" }}>
                  {restaurant.name}
                </Text>
                <Text style={{ ...styles.description, color: "white" }}>
                  {restaurant.description}
                </Text>
                <Text style={{ ...styles.location, color: "white" }}>
                  {restaurant.location}
                </Text>
                <Text style={{ ...styles.contact, color: "white" }}>
                  {restaurant.phone}
                </Text>
                <Text style={{ ...styles.contact, color: "white" }}>
                  {restaurant.email}
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
                  value={guests}
                  setValue={setGuests}
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
              <TouchableOpacity style={styles.okButton} onPress={handleBookNow}>
                <Text style={styles.okButtonText}>Book Now</Text>
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
    </>
  );
}

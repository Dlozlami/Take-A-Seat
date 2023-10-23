import React, { useState 
} from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {deleteReservation} from "../features/reservationSlice";
import { styles } from "../assets/css/styles";
import NumberInput from "./numberInput";
import DateTimePicker from "@react-native-community/datetimepicker";

const ReservationCard = ({ reservation }) => {
  const dispatch = useDispatch();
  const {
    id,
    fullname,
    phone,
    userEmail,
    reservationMade,
    reservationDate,
    restaurantID,
    guests,
  } = reservation;
  const [visible, setVisible] = useState(false);
  const { restaurantsList } = useSelector((store) => store.restaurant);
  const myRestaurant = restaurantsList.find(
    (restaurant) => restaurant.id === restaurantID
  );
  console.log("reservationCard.js line 13 reservation: ", reservation);

  const handleDelete = () => {
    dispatch(deleteReservation(reservation.id));
  };
  const handleEdit = () => {};

  return (
    <View style={localStyles.card}>
      <View style={{ padding: 10 }}>
        <Text style={localStyles.title}>{fullname}</Text>
        <Text style={localStyles.value}>{userEmail}</Text>

        <View
          style={{
            borderTopColor: "gray",
            borderTopWidth: 1,
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
                {new Date(reservationDate).toDateString()}
              </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={localStyles.label}>Time: </Text>
              <Text style={localStyles.value}>
                {new Date(reservationDate).toTimeString()}
              </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={localStyles.label}>Guests: </Text>
              <Text style={localStyles.value}>{guests}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity>
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
      

      <Modal visible={visible} transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderBottomColor: "gray",
              }}
            >
              {/* <Image
                source={myRestaurant.imageURL}
                style={styles.image}
                resizeMode="contain"
              /> */}
              <View style={styles.details}>
                <Text style={styles.name}>{myRestaurant.name}</Text>
                <Text style={styles.description}>{myRestaurant.description}</Text>
                <Text style={styles.location}>{myRestaurant.location}</Text>
                <Text style={styles.contact}>{myRestaurant.phone}</Text>
                <Text style={styles.contact}>{myRestaurant.email}</Text>
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
                        />
                        {date
                          ? "Pick time"
                          : date && date.toTimeString().split(" ")[0]}
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
                        />
                        Pick date
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
              style={{ padding: 20, display: "flex", flexDirection: "row" }}
            >
              <TouchableOpacity
                style={styles.okButton}
                onPress={() => handleBookNow()}
              >
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

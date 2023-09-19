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
import { TimePickerModal } from "react-native-paper-dates";
import { useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../assets/css/styles";
import { DatePickerModal } from "react-native-paper-dates";

export default function RestaurantCard({ restaurant }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
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
  const [guests, setGuests] = useState(0);
  const [openModal, setOpenodal] = useState(false);
  const nav = useNavigation();
  const [startDate, setStartDate] = useState(new Date());
  console.log("Render rest card: ");
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
  };

  const handleBookNow = () => {};

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          setOpenodal(true);
          //console.log("restCard line 12 openModal: ", openModal);
        }}
      >
        {/* <Image
          source={restaurant.imageURL}
          style={styles.image}
          resizeMode="cover"
        /> */}
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ ...styles.details, width: "80%" }}>
            <Text style={styles.name}>{restaurant.name}</Text>

            <Text style={styles.location}>{restaurant.location}</Text>
            <Text style={styles.contact}>{restaurant.phone}</Text>
            <Text style={styles.ratings}>Ratings: {restaurant.ratings}</Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              width: "20%",
              alignItems: "center",
              backgroundColor: "#335930",
            }}
          >
            <MaterialCommunityIcons
              name="table-chair"
              size={24}
              color="white"
            />
          </View>
        </View>
      </TouchableOpacity>

      <Modal visible={openModal} transparent>
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
                source={restaurant.imageURL}
                style={styles.image}
                resizeMode="contain"
              /> */}
              <View style={styles.details}>
                <Text style={styles.name}>{restaurant.name}</Text>
                <Text style={styles.description}>{restaurant.description}</Text>
                <Text style={styles.location}>{restaurant.location}</Text>
                <Text style={styles.contact}>{restaurant.phone}</Text>
                <Text style={styles.contact}>{restaurant.email}</Text>
              </View>
            </View>
            <View style={{ width: "100%", padding: 20 }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text>How many people? </Text>
              </View>
              <View>
                <Text>On which date?</Text>
              </View>
              <View>
                <Text>At what time?</Text>
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
                        Pick time
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
                  <TouchableOpacity
                    onPress={showDatepicker}
                    style={styles.pickerBTN}
                  >
                    <Text>Pick date</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={showTimepicker}
                    style={styles.pickerBTN}
                  >
                    <Text
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="clock-time-four-outline"
                        size={20}
                        color="black"
                      />{" "}
                      Pick time
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              <Text>selected: {date.toLocaleString()}</Text>
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
                onPress={() => setOpenodal(false)}
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
    </>
  );
}

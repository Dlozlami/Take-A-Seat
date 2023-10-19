import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ReservationCard = ({ reservation }) => {
  const {
    id,
    userEmail,
    reservationMade,
    reservationDate,
    restaurantID,
    guests,
  } = reservation;
console.log("reservationCard.js line 13 reservation: ",reservation)
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Reservation ID:</Text>
      <Text style={styles.value}>{id}</Text>

      <Text style={styles.label}>User Email:</Text>
      <Text style={styles.value}>{userEmail}</Text>

      <Text style={styles.label}>Reservation Made:</Text>
      <Text style={styles.value}>{reservationMade}</Text>

      <Text style={styles.label}>Reservation Date:</Text>
      <Text style={styles.value}>{reservationDate}</Text>

      <Text style={styles.label}>Restaurant ID:</Text>
      <Text style={styles.value}>{restaurantID}</Text>

      <Text style={styles.label}>Guests:</Text>
      <Text style={styles.value}>{guests}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
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
  value: {
    marginBottom: 8,
    color: "#555",
  },
});

export default ReservationCard;

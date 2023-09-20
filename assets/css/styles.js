import Constants from "expo-constants";
import { Dimensions } from "react-native";

export const styles = {
  main: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
  },

  mainCenter: {
    display: "flex",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: "#5df4a0",
  },

  panelColumn: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 8,
    backgroundColor: "white",
  },

  panelRow: {
    display: "flex",
    borderRadius: 8,
    backgroundColor: "white",
  },

  title: {
    fontSize: 48,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  heading: {
    fontSize: 18,
    color: "#38434D",
    marginVertical: 10,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    padding: 24,
  },
  loginTextField: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  borderlessBTN: {
    backgroundColor: "white",
    padding: 10,
    fontSize: 18,
    marginVertical: 10,
  },
  activityIndicator: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Dimensions.get("window").height / 2,
    zIndex: 5,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "red",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    zIndex: 5,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    padding: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  location: {
    color: "#555",
    marginBottom: 5,
  },
  contact: {
    color: "#555",
    marginBottom: 5,
  },
  ratings: {
    color: "#639e79",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  okButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#335930",
    borderRadius: 10,
    marginRight: 30,
  },
  okButtonText: {
    color: "white",
  },
  pickerBTN: {
    padding: 10,
    backgroundColor: "#5df4a0",
    borderRadius: 10,
    color: "white",
    marginBottom: 10,
  },
};

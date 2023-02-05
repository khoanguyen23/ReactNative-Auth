



import axios from 'axios';
import { useContext, useEffect, useState, useRef } from 'react';

// import { StyleSheet, Text, View } from 'react-native';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  FlatList,
} from "react-native";
import { AuthContext } from '../store/auth-context';
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import SlidingUpPanel from "rn-sliding-up-panel";

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMesssage] = useState('');

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    axios
      .get(
        'https://react-native-course-3cceb-default-rtdb.firebaseio.com/message.json?auth=' +
        token
      )
      .then((response) => {
        setFetchedMesssage(response.data);
      });
  }, [token]);
  const Transactions = [
    {
      id: "1",
      transactionImage:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      transactionName: "Shopping",
      transactionDate: "25 April 20",
      transactionTime: "4:00 PM",

      amount: "$350",
      description: "Buy some grocery",
      type: "income",
    },
    {
      id: "2",
      transactionImage:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      transactionName: "Subcription",
      transactionDate: "25 April 20",
      transactionTime: "4:00 PM",

      amount: "$350",
      description: "Buy some grocery",
      type: "income",
    },
    {
      id: "3",
      transactionImage:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      transactionName: "Food",
      transactionDate: "25 April 20",
      transactionTime: "4:00 PM",

      amount: "$350",
      description: "Buy some grocery",
      type: "expenses",
    },
    {
      id: "4",
      transactionImage:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      transactionName: "Income",
      transactionDate: "25 April 20",
      transactionTime: "4:00 PM",

      amount: "$350",
      description: "Buy some grocery",
      type: "expenses",
    },
    {
      id: "5",
      transactionImage:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      transactionName: "Income",
      transactionDate: "25 April 20",
      transactionTime: "4:00 PM",

      amount: "$350",
      description: "Buy some grocery",
      type: "income",
    },
    {
      id: "6",
      transactionImage:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      transactionName: "Income",
      transactionDate: "25 April 20",
      transactionTime: "4:00 PM",

      amount: "$350",
      description: "Buy some grocery",
      type: "expenses",
    },
    // {
    //   id: "5",
    //   transactionImage:
    //     "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    //   transactionName: "Jessica",
    //   transactionDate: "25 April 20",
    //   amount: "$350",
    //   credit: true,
    // },
    // {
    //   id: "6",
    //   transactionImage:
    //     "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    //   transactionName: "Jessica",
    //   transactionDate: "25 April 20",
    //   amount: "$350",
    //   credit: true,
    // },
  ];
  const { width, height } = Dimensions.get("window");
  const carouselRef = useRef(null);
  const [viewMode, setViewMode] = useState("today");

  const [typeMoney, setTypeMoney] = useState("");
  // SLIDING PANEL

  const [dragRange, setDragRange] = useState({
    top: height - 80,
    bottom: 340,
  });

  const _draggedValue = new Animated.Value(180);

  const ModalRef = useRef(null);
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Welcome!</Text>
           <Text>You authenticated successfully!</Text> */}
      <LinearGradient
        // Button Linear Gradient
        colors={["#F9D48D", "#F8EDD8"]}
        style={styles.linearGradient}
      >
        <View
          style={{
            flexDirection: "row",
            margin: 14,
            paddingBottom: 10,
            paddingTop: 10,
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "#353535",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                color: "#353535",
                opacity: 0.6,
                textTransform: "uppercase",
              }}
            >
              monday
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#353535",
                opacity: 0.6,
                textTransform: "uppercase",
              }}
            >
              1/9/2023
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/936229/pexels-photo-936229.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              }}
              style={styles.ProfileImage}
            />
            <Text
              style={{
                fontSize: 18,
                textTransform: "uppercase",
                paddingLeft: 10,
              }}
            >
              Thiep Le
            </Text>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            Account balance
          </Text>
          <Text style={{ textAlign: "center", fontSize: 30 }}>90000 $</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginHorizontal: 30,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 25,
              color: "#fff",
              padding: 15,
            }}
          >
            <Text style={{ padding: 10 }}>
              <Icon name="download" size={30} color="#fff" />
            </Text>
            <View>
              <Text style={{ color: "#fff", fontSize: 20 }}>Income</Text>
              <Text style={{ color: "#fff", fontSize: 24 }}>25000</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#FD3C4A",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 25,
              color: "#fff",
              padding: 15,
            }}
          >
            <Text style={{ padding: 10 }}>
              <Icon name="upload" size={30} color="#fff" />
            </Text>
            <View>
              <Text style={{ color: "#fff", fontSize: 20 }}>Espence</Text>
              <Text style={{ color: "#fff", fontSize: 24 }}>112000</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={{ flex: 1 }}>
        <SlidingUpPanel
          ref={ModalRef}
          draggableRange={dragRange}
          animatedValue={_draggedValue}
          backdropOpacity={0}
          snappingPoints={[360]}
          height={height + 20}
          friction={0.9}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#ccc",
              borderRadius: 24,
              padding: 14,
            }}
          >
            <View style={styles.PanelHandel}></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 15,
              }}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    backgroundColor:
                      viewMode == "today" ? "#353535" : "transparent",
                    color: viewMode == "today" ? "#FFFFFF" : "#353535",
                    padding: 5,
                    paddingHorizontal: 15,
                    borderRadius: 15,
                    fontSize: 16,
                  }}
                  onPress={() => setViewMode("today")}
                >
                  Today
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    backgroundColor:
                      viewMode == "week" ? "#353535" : "transparent",
                    color: viewMode == "week" ? "#FFFFFF" : "#353535",
                    padding: 5,
                    paddingHorizontal: 15,
                    borderRadius: 15,
                    fontSize: 16,
                  }}
                  onPress={() => setViewMode("week")}
                >
                  {" "}
                  Week
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    backgroundColor:
                      viewMode == "month" ? "#353535" : "transparent",
                    color: viewMode == "month" ? "#FFFFFF" : "#353535",
                    padding: 5,
                    paddingHorizontal: 15,
                    borderRadius: 15,
                    fontSize: 16,
                  }}
                  onPress={() => setViewMode("month")}
                >
                  {" "}
                  Month
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    backgroundColor:
                      viewMode == "year" ? "#353535" : "transparent",
                    color: viewMode == "year" ? "#FFFFFF" : "#353535",
                    padding: 5,
                    paddingHorizontal: 15,
                    borderRadius: 15,
                    fontSize: 16,
                  }}
                  onPress={() => setViewMode("year")}
                >
                  {" "}
                  Year
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ marginVertical: 16, color: "#fcfcfc" }}>
                Recent Transactions
              </Text>
            </View>
            <View>
              <FlatList
                data={Transactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={{ uri: item.transactionImage }}
                            style={styles.TransactionImage}
                          />
                          <View>
                            <Text style={{ fontSize: 20 }}>
                              {item.transactionName}
                            </Text>
                            <Text style={{ fontSize: 14, opacity: 0.6 }}>
                              {item.description}
                            </Text>
                          </View>
                        </View>

                        <View>
                          <Text
                            style={{
                              fontSize: 18,
                              color:
                                item.type == "income" ? "#00A86B" : "#FD3C4A",
                            }}
                          >
                            {item.amount}
                          </Text>
                          <Text>{item.transactionTime}</Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </SlidingUpPanel>
      </View>

    </View>
  );
}



// const styles = StyleSheet.create({
//   rootContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 32,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
// });
export default WelcomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    width: "100%",
    height: "100%",
  },
  linearGradient: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    borderRadius: 5,
  },
  ProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
    padding: 10,
  },
  TransactionImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  PanelHandle: {
    height: 6,
    width: 50,
    backgroundColor: "#ccc",
    borderRadius: 6,
    alignSelf: "center",
    marginTop: 6,
  },
  title: {
         fontSize: 20,
         fontWeight: 'bold',
        marginBottom: 8,
      },
});



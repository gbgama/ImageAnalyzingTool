import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

class ResultsListItem extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onChangeItemText = text => {
    this.props.onChangeItemText(this.props.itemKey, text);
  };

  onChangeScreen = text => {
    this.props.onChangeScreen(text);
  };

  render() {
    return (
      <View style={styles.container} key={this.props.itemKey}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              margin: 22,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                minHeight: "40%",
                minWidth: "95%",
                borderColor: "#00c2ec",
                borderWidth: 3,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  color: "#00c2ec",
                  fontSize: 22,
                  fontWeight: "bold",
                  marginTop: 5
                }}
              >
                Edit Item
              </Text>
              <TextInput
                value={this.props.itemText}
                onChangeText={this.onChangeItemText}
                multiline={true}
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "#00c2ec",
                  borderRightColor: "#00c2ec",
                  fontSize: 24,
                  marginHorizontal: 10
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <View
                  style={{
                    backgroundColor: "#00c2ec",
                    marginTop: 30,
                    marginBottom: 10,
                    borderRadius: 10,
                    paddingHorizontal: 30,
                    paddingVertical: 4
                  }}
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                  >
                    close
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.itemContainer}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              justifyContent: "space-between",
              height: "100%"
            }}
            onPress={() => this.onChangeScreen(this.props.itemText)}
          >
            <View
              style={{
                overflow: "hidden",
                marginLeft: 5,
                width: "75%",
                justifyContent: "center"
              }}
            >
              <Text style={styles.itemText}>{this.props.itemText}</Text>
            </View>
            <View
              style={{
                overflow: "hidden",
                width: "25%",
                justifyContent: "center",
                alignSelf: "center",
                backgroundColor: "#00c2ec",
                height: "100%"
              }}
            >
              <Text style={styles.itemPoints}>{this.props.itemPoints}%</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <View>
            <Icon name="pencil" size={18} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "95%",
    margin: 5
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "85%",
    borderColor: "#00c2ec",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  itemText: {
    fontSize: 20,
    color: "#00c2ec",
    alignSelf: "flex-start",
    overflow: "hidden"
  },
  itemPoints: {
    alignSelf: "center",
    margin: 5,
    marginRight: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  editBtn: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#43d262",
    marginHorizontal: 5,
    borderRadius: 5
  }
});

export default ResultsListItem;

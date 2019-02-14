import React, { Component } from "react";
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

class ProductItem extends Component {
  _onOpenLinkHandler = () => {
    const url = this.props.link;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error("An error occurred", err));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ margin: 10 }}>          
          <Text style={styles.title}>{this.props.title}</Text>
          <Image style={{width: 200, height: 100, marginTop: 10, borderColor: "#00c2ec", borderWidth: 2 }} source={{ uri: this.props.imageUrl }} />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginRight: 15,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {this.props.currency}
            </Text>
            <Text style={{ fontSize: 20, marginLeft: 2 }}>
              {this.props.price}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginTop: 5
            }}
          >
            <TouchableOpacity onPress={this._onOpenLinkHandler}>
              <View style={styles.btn}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 16
                  }}
                >
                  Go to product
                </Text>
              </View>
            </TouchableOpacity>
            <Icon
              style={{ marginRight: 12 }}
              name="ebay"
              size={26}
              color="black"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "#00c2ec",
    borderWidth: 3,
    borderRadius: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00c2ec"
  },
  desc: {
    fontSize: 16
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00c2ec",
    width: "100%",
    padding: 5,
    borderRadius: 5,
    margin: 5
  }
});

export default ProductItem;

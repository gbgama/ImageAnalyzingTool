import React, { Component } from "react";
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

class ArticleItem extends Component {
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
          <Text style={styles.name}>{this.props.name}</Text>
          <Text style={styles.desc}>{this.props.desc}</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginTop: 5,
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
                  Go to article
                </Text>
              </View>
            </TouchableOpacity>
            <Icon style={{marginRight: 10}} name="wikipedia-w" size={14} color="black" />
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
  name: {
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

export default ArticleItem;

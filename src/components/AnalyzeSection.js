import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  StyleSheet,
  Text
} from "react-native";

import ResultsListItem from "./ResultsListItem";

class AnalyzeSection extends Component {
  constructor(props) {
    super(props)

    this.onChangeItemText = this.onChangeItemText.bind(this);
  }
   

  onChangeItemText = (key, text) => {
    this.props.onChangeItemText(key, text);
  }

  onChangeScreen = (text) => {
    this.props.onChangeScreen(text);
  }

  render() {
    if (this.props.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20,justifyContent: "center" }}>
          <ActivityIndicator color="#00c2ec" size="large"/>
        </View>
      );
    }
    
    return (
      <View style={styles.container}>
        {this.props.bestGuess !== "" ? (
          <Text style={styles.bestGuess}>
            <Text style={{ fontWeight: "bold", color: "#989145" }}>Best Guess:</Text>{" "}
            {this.props.bestGuess}
          </Text>
        ) : (
          <Text />
        )}

        <FlatList
          style={{ width: "100%" }}
          data={this.props.entities}
          renderItem={entitie => (
            <ResultsListItem
              itemKey={entitie.item.key}
              itemText={entitie.item.text}
              itemPoints={entitie.item.points}
              onChangeItemText={this.onChangeItemText}
              onChangeScreen={this.onChangeScreen}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2
  },
  bestGuess: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#009bbd",
    marginHorizontal: 10
  }
});

export default AnalyzeSection;

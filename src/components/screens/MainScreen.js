import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import ImagePreviewer from "../ImagePreviewer";
import AnalyzeSection from "../AnalyzeSection";

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: "",
      entities: [],
      bestGuess: "",
      isLoading: false
    };

    this._ImageAddedHandler = this._ImageAddedHandler.bind(this);
    this._resultsHandler = this._resultsHandler.bind(this);
    this._isLoadingHandler = this._isLoadingHandler.bind(this);
    this._onChangeItemTextHandler = this._onChangeItemTextHandler.bind(this);
    this._onChangeScreenHandler = this._onChangeScreenHandler.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  _ImageAddedHandler = uri => {
    this.setState({ imageSource: uri });
  };

  _resultsHandler = (entities, bestGuess) => {
    this.setState({ entities: entities, bestGuess: bestGuess });
  };

  _isLoadingHandler = isLoading => {
    this.setState({ isLoading: isLoading });
  };

  _onChangeItemTextHandler = (key, text) => {
    let entitiesArr = this.state.entities;
    entitiesArr[key].text = text;

    this.setState({ entities: entitiesArr });
  };

  _onChangeScreenHandler = itemText => {
    if (
      itemText !== null &&
      typeof itemText !== "undefined" &&
      itemText !== ""
    ) {
      this.props.navigation.navigate("Details", { itemText });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImagePreviewer
          onImageAdded={this._ImageAddedHandler}
          _isLoadingHandler={this._isLoadingHandler}
          _resultsHandler={this._resultsHandler}
        />
        <AnalyzeSection
          isLoading={this.state.isLoading}
          bestGuess={this.state.bestGuess}
          entities={this.state.entities}
          onChangeItemText={this._onChangeItemTextHandler}
          onChangeScreen={this._onChangeScreenHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  }
});

export default MainScreen;

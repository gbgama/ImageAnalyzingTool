import React, { Component } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import ArticleItem from './ArticleItem';

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemText: props.itemText,
      wikiArticles: []
    };
  }

  componentDidMount() {
    const receivedItem = this.state.itemText;
    if(typeof receivedItem !== "undefined" && receivedItem !== ""){
    // make request to WIKI api, save to {wikiArticles}
    fetch(
      `https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&namespace=0&format=json&search=${receivedItem}`
    )
      .then(response => response.json())
      .then(responseJson => {
        // add each item to wikiArticles:
        let articles = [];
        responseJson[1].map((name, index) =>
          articles.push({ key: index.toString(), name: name })
        );
        responseJson[2].map((desc, index) => (articles[index].desc = desc));
        responseJson[3].map((link, index) => (articles[index].link = link));
        this.setState({ wikiArticles: articles });
      }) //save results to the state
      .catch(error => console.log(error));
    }
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{ width: "100%" }}
          data={this.state.wikiArticles}
          renderItem={article => (
            <ArticleItem
              name={article.item.name}
              desc={article.item.desc}
              link={article.item.link}
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
        backgroundColor: "#00c2ec"
    }
});

export default Articles;

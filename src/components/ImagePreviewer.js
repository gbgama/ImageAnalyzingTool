import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Entypo";
import keys from '../config/keys';

const options = {
  title: "Select an Image",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

class ImagePreviewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: ""
    };

    this._imagePickerHandler = this._imagePickerHandler.bind(this);
    this._onAnalyzehandler = this._onAnalyzehandler.bind(this);
  }

  _imagePickerHandler = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        
        const source = { uri: response.data };

        this.setState({
          imageSource: source.uri
        });
        // send image uri to main state
        this.props.onImageAdded(this.state.imageSource);
      }
    });
  };

  _onAnalyzehandler = async () => {
    console.log("Start Analyzing...");
    this.props._isLoadingHandler(true);
    // colect imageSource from Main Screen
    const uri = this.state.imageSource;    

    let bestGuess = "";
    let entities = [];

    // make call to google vision api and get the response
    try {
      let response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${keys.googleVision}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: uri
                },
                features: [
                  {
                    type: "WEB_DETECTION",
                    maxResults: 5
                  }
                ]
              }
            ]
          })
        }
      );

      let responseJson = await response.json();

      bestGuess =
        responseJson.responses[0].webDetection.bestGuessLabels[0].label;
      entities = responseJson.responses[0].webDetection.webEntities;
      console.log(bestGuess);
      console.log(entities);
    } catch (error) {
      console.log(error);
      this.props._isLoadingHandler(false);
    }
    

    const resultEntities = []
    
    entities.map((entitie, index) => {
      resultEntities.push({ key: index, text: entities[index].description, points: Math.round(entities[index].score *100) });
    });

    this.props._resultsHandler( resultEntities, bestGuess );
    this.props._isLoadingHandler(false);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: "data:image/jpeg;base64," + this.state.imageSource }}
          style={styles.img}
        />

        <View style={styles.btnsContainer}>
          <TouchableOpacity onPress={this._imagePickerHandler.bind(this)}>
            <View style={styles.btnADD}>
              <Icon name="plus" size={20} color="white" />
              <Text style={styles.btnText}>Add Image</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onAnalyzehandler}>
            <View style={styles.btnAna}>
              <Icon2 name="lab-flask" size={20} color="white" />
              <Text style={styles.btnText}>Analyze</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    alignItems: "center"
  },
  img: {
    width: 280,
    height: 150,
    marginBottom: 10,
    resizeMode: "cover",
    borderColor: "#00c2ec",
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: 'grey'
  },
  btnsContainer: {
    flexDirection: "row",
    width: "100%"
  },
  btnADD: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#00c2ec",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 2
  },
  btnAna: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#00c2ec",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginHorizontal: 2
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: 10
  }
});

export default ImagePreviewer;

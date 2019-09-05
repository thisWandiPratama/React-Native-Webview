// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });


import React, { Component } from 'react';
import {
  BackHandler,
  WebView,
  YellowBox,
  ActivityIndicator,
  Image,
  Text,
  View,
  StyleSheet
} from 'react-native';

export default class App extends Component {

constructor(props) {
    super(props);
    this.WEBVIEW_REF = React.createRef();
    this.state={
       role:true
    }
}

componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}

handleBackButton = ()=>{
   this.WEBVIEW_REF.current.goBack();
   return true;
}

onNavigationStateChange(navState) {
  this.setState({
    canGoBack: navState.canGoBack
  });
}

render(){
    YellowBox.ignoreWarnings(['WebView']);
    setTimeout(()=>{
      this.setState({
          role:false
      })
  } ,5000)
    if (this.state.role) {
      return (
        <View style={styles.MainSplash}>
          <Image
                source={require('./src/image/pabrikcoding.png')}
                style={styles.logoSplash}
          />
          <ActivityIndicator size='large' />
          <View style={styles.copyright} >
                <Text style = {styles.textcopyright}>Developer by Pabrik Coding</Text>
          </View>
        </View>
      );
      
    }
   return (
    <WebView
        source={{ uri: "https://www.cbt.ng" }}
        ref={this.WEBVIEW_REF}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
     />
    )

 }
}

const styles = StyleSheet.create({
 MainSplash:{
    flex:1,
    justifyContent:'center', 
    alignItems:'center',
    backgroundColor: '#fff'
  },
  
  ContainerView:{
    flex:1
  },
  
  LogoSplash:{
    height:80, 
    width: 80
  }
})
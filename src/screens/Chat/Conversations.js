import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar, 
  Text,
  Dimensions
} from "react-native";
import ConversationItem from "../../components/ConversationItem";
import { Ionicons } from "@expo/vector-icons";
import Loading from "../../components/Loading";

import { CONVERSATIONS_QUERY } from "../../graphql";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import * as THEME from "../../libs/theme";

export default class Conversations extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.refresh = null;
    this.unsubscribe = null;
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => {
        return (
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            activeOpacity={0.9}
            onPress={this.props.navigation.goBack}
          >
            <Ionicons
              name="ios-arrow-back"
              size={32}
              color={THEME.Colors.primary}
            />
          </TouchableOpacity>
        );
      },
    });

    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      if (this.refresh) {
        this.refresh();
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <Query
        fetchPolicy="no-cache"
        query={CONVERSATIONS_QUERY}
        pollInterval={500}
      >
        {({ loading, error, data, refresh }) => {
          if (refresh) {
            this.refresh = refresh;
          }

          if (loading) {
            return <Loading />;
          }

          if (error) {
            console.log(error.message);
          }

          if (data) {
            return (
              <ScrollView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                {data.matches.length>0?  data.matches.map((match) => {
                  console.log(match.lastMessage);
                  return (
                    <ConversationItem
                      read={match.lastMessage ? match.lastMessage.read : true}
                      datetime={
                        match.lastMessage ? match.lastMessage.createdAt : null
                      }
                      key={match.id}
                      name={match.match.name}
                      avatar={match.match.avatar}
                      onPress={() =>
                        this.props.navigation.navigate("Conversation", {
                          match: match,
                          name: match.match.name,
                        })
                      }
                    />
                  );
                })
              :
              <View style={{height:Dimensions.get('screen').height*0.7,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#2BBFC9',fontSize:16,fontFamily:THEME.FontFamily.medium}}>Uh oh! Looks like you don’t</Text>
                <Text style={{color:'#2BBFC9',fontSize:16,fontFamily:THEME.FontFamily.medium}}>have any matches yet.</Text>
                <Text
                style={{marginTop:10,color:'#2BBFC9',fontSize:16,fontFamily:THEME.FontFamily.medium}}
                >Start swiping to match and connect!</Text>
                <Image
                style={{height:'25%',width:'80%',marginTop:'20%'}}
                source={require('../../images/v2/message_image.png')}
                />
              </View>
              }
              </ScrollView>
            );
          }

          return null;
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36,
  },
});

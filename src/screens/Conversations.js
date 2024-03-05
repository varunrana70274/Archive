import React, { Component } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import ConversationItem from "../components/ConversationItem";
import { Ionicons } from "@expo/vector-icons";
import Loading from "../components/Loading";

import { CONVERSATIONS_QUERY } from "../graphql";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import * as THEME from "../libs/theme";

export default class Conversations extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
  }

  render() {
    return (
      <Query
        fetchPolicy="no-cache"
        query={CONVERSATIONS_QUERY}
        pollInterval={500}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }

          if (error) {
            console.log(error.message);
          }

          console.log(data);
          
          return (
            <ScrollView style={styles.container}>
              {data.matches &&
                data.matches.map((match) => {
                  return (
                    <ConversationItem
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
                })}
            </ScrollView>
          );
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

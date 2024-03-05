import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import Input from "../../../components/MaskedInput2";
import Button from "../../../components/Button";
import Text from "../../../components/Typography";
import * as THEME from "../../../libs/theme";
import { TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as signupBirthdateValidation from "../../../validations/signupBirthdate";
import { connect } from "react-redux";
import { updateBirthdate } from "../../../actions";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";

// import { TouchableOpacity } from "react-native-gesture-handler";
class GetBirthday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newData: new Date(2004, 0, 1),
      date: "",
      isDatePickerVisible: false,
    };
  }

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  componentWillUnmount() {
    signupBirthdateValidation.initialValues.birthdate = "";
  }

  onChange = (date, formikProps) => {
    this.setState({ newData: date });

    // console.error('selectedDate',selectedDate);
    formikProps.resetForm("birthdate");
    if (date) {
      signupBirthdateValidation.initialValues.birthdate = date;
    }

    this.setState({
      date: date ? new Date(date).toString() : new Date(this.state.date),
      isDatePickerVisible: false,
    });
  };

  onSubmit = (value) => {
    this.props.updateBirthdate(moment(this.state.date).format("MM/DD/YYYY"));
    this.props.navigation.push("ReferalCode");
  };
  render() {
    return (
      <>
        <View style={{ padding: 20, backgroundColor: "#fff" }}>
          <TouchableOpacity
            style={{ height: 30, width: 30 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Ionicons
              name="ios-arrow-back"
              size={30}
              color={THEME.Colors.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text xl style={{ color: "#2BBFC9", marginBottom: 102 }}>
            When is your birthday?
          </Text>
          <Formik
            initialValues={signupBirthdateValidation.initialValues}
            validationSchema={signupBirthdateValidation.schema}
            onSubmit={this.onSubmit}
          >
            {(formikProps) => (
              <>
                <Input
                  value={
                    this.state.date.length > 0
                      ? moment(this.state.date).format("MM/DD/YYYY")
                      : null
                  }
                  editable={false}
                  press={() => this.showDatePicker()}
                  style={{ borderBottomWidth: 3, borderBottomColor: "#2BBFC9" }}
                  formikKey="birthdate"
                  formikProps={formikProps}
                />
                {/* <TouchableOpacity  style={{borderWidth:0.5,borderColor:'#fff',padding:10,borderRadius:10}}
            onPress={()=> this.showDatePicker()} >
              <Text style={styles.textColor}>
              {this.state.date.length>0?moment(this.state.date).format('MM/DD/YYYY').toString(): 'Select date of birth'}
              </Text>
              </TouchableOpacity> */}
                {/* {this.state.isDatePickerVisible&&
              <DateTimePicker
              
         date={this.state.newData}
          testID="dateTimePicker"
          value={this.state.newData}
          mode={'date'}
          is24Hour={true}
          maximumDate={new Date()}
          display="spinner"
          onChange={(e,date)=>this.onChange(e,date,formikProps)}
          
        />} */}

                <DateTimePickerModal
                  // minimumDate={new Date(2004, 0, 1)}
                  maximumDate={new Date(2004, 0, 1)}
                  // display="default"
                  date={this.state.newData}
                  isVisible={this.state.isDatePickerVisible}
                  mode="date"
                  onConfirm={(date) => this.onChange(date, formikProps)}
                  onCancel={() => this.setState({ isDatePickerVisible: false })}
                />

                <View
                  style={{ flexGrow: 0, marginTop: 166, alignItems: "center" }}
                >
                  <Button
                    // bgColor="secondary"
                    textColor="white"
                    rounded
                    onPress={() => {
                      // this.setState({isDatePickerVisible:false})
                      //   setTimeout(() => {
                      formikProps.handleSubmit();
                      // }, 500);
                    }}
                    // style={{ width: "100%" }}
                  >
                    Continue
                  </Button>
                </View>
              </>
            )}
          </Formik>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 36,
    backgroundColor: THEME.Colors.white,
  },
  textColor: {
    color: "#fff",
  },
});

export default connect(null, { updateBirthdate })(GetBirthday);

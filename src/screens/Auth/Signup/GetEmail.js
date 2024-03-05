// import React, { Component } from "react";
// import { View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
// import Input from "../../../components/Input";
// import Button from "../../../components/Button";
// import Text from "../../../components/Typography";
// import * as THEME from "../../../libs/theme";

// import { Formik } from "formik";
// import * as signupEmailValidation from "../../../validations/signupEmail";
// import { connect } from "react-redux";
// import { updateEmail } from "../../../actions";
// import { Ionicons } from "@expo/vector-icons";
// import { USER_EXIST } from "../../../graphql";
// import { Mutation } from "react-apollo";
// import API from "../../../libs/api";

// class GetEmail extends Component {
//   onSubmit = (values) => {

//     API.emailExist(values.email)
//     .then(async (res) => {
//       console.log('ressssssssssssss20',res);
    
  
//   })
//     .catch((err) => {
//       console.log('errrr',err);
//       if (err.response) {
//         console.log(err.response.data.error);
//       } else {
//         console.log(err.message);
//       }
//       this.setState({ loading: false });
//     });

//     // this.props.updateEmail(values.email);
//     // this.props.navigation.push("SignupPassword");
//   }; 
//   render() {
// //     return(
// //     <Mutation
// //         mutation={USER_EXIST}
// //         update={(store, { data }) => {
// //     this.props.navigation.push("SignupPassword");
// //         }}
// //       >
// //         {(useExist, { loading, error, data }) => {
// // if (error) {
// //   // console.error('errr',error); 
// //   if(error.toString().includes('already exists')){
// //   Alert.alert(
// //     "Alert",
// //     'An account already exists with this email.',[
// //       {text:'OK',onPress:()=>{}}
// //   ])
// //   }
 
// // }



//           // const handleSubmit = (email) => {
           
//           //   let variables = {
//           //     variables: {
//           //      email:email
//           //     },
            
//           //   };
         
         
//           //   console.log(variables);
//           //   useExist(variables);
          
//           //   this.props.updateEmail(email);


//           // };

//           // if (error) {
//           //   console.log(error);
//           // }

//     return (
//       <>
//       <View style={{padding:20,backgroundColor:'#fff'}}>
//         <TouchableOpacity style={{height:30,width:30}} onPress={()=>this.props.navigation.goBack()}>
//         <Ionicons
//               name="ios-arrow-back"
//               size={30}
//               color={THEME.Colors.primary}
//             />

//         </TouchableOpacity>
//    </View>
//       <View style={styles.container}>
//         <Text xl color='#2BBFC9' style={{color:'#2BBFC9', marginBottom: 102 }}>
//           What's your email?
//         </Text>
//         <Formik
//           initialValues={signupEmailValidation.initialValues}
//           validationSchema={signupEmailValidation.schema}
//           onSubmit={this.onSubmit}
//         >
//           {(formikProps) => (
//             <>
//               <Input
//                 style={{ borderBottomWidth: 3 ,borderBottomColor:'#2BBFC9'}}
//                 formikKey="email"
//                 formikProps={formikProps}
//               />
//               <View
//                 style={{ flexGrow: 0, marginTop: 166, alignItems: "center" }}
//               >
//                 <Button
//                   // bgColor="secondary"
//                   textColor="white"
//                   rounded
//                   onPress={formikProps.handleSubmit}

//                   // onPress={()=>handleSubmit(formikProps.values.email)}
//                   // style={{ width: "100%" }}
//                 >
//                   Continue
//                 </Button>
//               </View>
//             </>
//           )}
//         </Formik>
//       </View>
//       </>
//     );
//   }
// }
// //   </Mutation>
// //     )}
// // }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 36,
//     backgroundColor: THEME.Colors.white,
//   },
// });

// export default connect(null, { updateEmail })(GetEmail);

import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Text from "../../../components/Typography";
import * as THEME from "../../../libs/theme";

import { Formik } from "formik";
import * as signupEmailValidation from "../../../validations/signupEmail";
import { connect } from "react-redux";
import { updateEmail } from "../../../actions";
import { Ionicons } from "@expo/vector-icons";
import { USER_EXIST } from "../../../graphql";
import { Mutation } from "react-apollo";

class GetEmail extends Component {
  onSubmit = (values) => {
    this.props.updateEmail(values.email);
    this.props.navigation.push("SignupPassword");
  }; 
  render() {
    return(
    <Mutation
        mutation={USER_EXIST}
        update={(store, { data }) => {
    this.props.navigation.push("SignupPassword");
        }}
      >
        {(useExist, { loading, error, data }) => {
          console.log('datadata');
if (error) {
  console.log('errr',error); 
  if(error.toString().includes('already exists')){
  Alert.alert(
    "Alert",
    'An account already exists with this email.',[
      {text:'OK',onPress:()=>{}}
  ])
  }
 
}



          const handleSubmit = (email) => {
           
            let variables = {
              variables: {
               email:email
              },
            
            };
         
         
            console.log(variables);
            useExist(variables);
          
            this.props.updateEmail(email);


          };

          if (error) {
            console.log(error);
          }

    return (
      <>
      <View style={{padding:20,backgroundColor:'#fff'}}>
        <TouchableOpacity style={{height:30,width:30}} onPress={()=>this.props.navigation.goBack()}>
        <Ionicons
              name="ios-arrow-back"
              size={30}
              color={THEME.Colors.primary}
            />

        </TouchableOpacity>
   </View>
      <View style={styles.container}>
        <Text xl color='#2BBFC9' style={{color:'#2BBFC9', marginBottom: 102 }}>
          What's your email?
        </Text>
        <Formik
          initialValues={signupEmailValidation.initialValues}
          validationSchema={signupEmailValidation.schema}
          onSubmit={this.onSubmit}
        >
          {(formikProps) => (
            <>
              <Input
                style={{ borderBottomWidth: 3 ,borderBottomColor:'#2BBFC9'}}
                formikKey="email"
                formikProps={formikProps}
              />
              <View
                style={{ flexGrow: 0, marginTop: 166, alignItems: "center" }}
              >
                <Button
                  // bgColor="secondary"
                  textColor="white"
                  rounded
                  // onPress={formikProps.handleSubmit}

                  onPress={()=>handleSubmit(formikProps.values.email)}
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
  </Mutation>
    )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 36,
    backgroundColor: THEME.Colors.white,
  },
});

export default connect(null, { updateEmail })(GetEmail);

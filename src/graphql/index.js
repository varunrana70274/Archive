import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        uuid
        name
        bio
        gender
        email
        avatar
        intro_video
        school
        birthdate
        age
        phone_number
        search_distance
        looking_for
        orientation
        new_message_notification
        new_match_notification
        onboarded
        media {
          id
          original_path
          type
        }
      }
      token
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup(
    $email: String!
    $name: String!
    $password: String!
    $birthdate: String!
    $gender: String!
  ) {
    signup(
      email: $email
      name: $name
      password: $password
      birthdate: $birthdate
      gender: $gender
    ) {
      user {
        id
        uuid
        name
        bio
        gender
        email
        avatar
        intro_video
        school
        birthdate
        age
        phone_number
        search_distance
        looking_for
        orientation
        new_message_notification
        new_match_notification
        onboarded
        media {
          id
          original_path
          type
        }
      }
      token
    }
  }
`;


export const USER_EXIST = gql`
  mutation userexist(
    $email: String!
    
  ) {
    userexist(
      email: $email
     
    ) {
      email
    }
    
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetpassword(
    $email: String!
    $password: String!
    
  ) {
    resetpassword(
      email: $email
      password:$password
     
    ) {
      email
      
    }
    
  }
`;

export const PROFILE_QUERY = gql`
  query {
    user {
      id
      uuid
      name
      bio
      gender
      email
      avatar
      intro_video
      school
      birthdate
      age
      phone_number
      search_distance
      looking_for
      orientation
      new_message_notification
      new_match_notification
      onboarded
      media {
        id
        original_path
        type
      }
    }
  }
`;

export const UPDATE_NAME_MUTATION = gql`
  mutation updateUserName($name: String!) {
    updateUserName(name: $name) {
      id
      uuid
      name
      bio
      gender
      email
      avatar
      intro_video
      school
      birthdate
      age
      phone_number
      search_distance
      looking_for
      orientation
      new_message_notification
      new_match_notification
      onboarded
      media {
        id
        original_path
        type
      }
    }
  }
`;

export const UPDATE_BIO_MUTATION = gql`
  mutation updateUserBio($bio: String!) {
    updateUserBio(bio: $bio) {
      id
      uuid
      name
      bio
      gender
      email
      avatar
      intro_video
      school
      birthdate
      age
      phone_number
      search_distance
      looking_for
      orientation
      new_message_notification
      new_match_notification
      onboarded
      media {
        id
        original_path
        type
      }
    }
  }
`;
export const UPDATE_INTRO_VIDEO_MUTATION = gql`
  mutation updateIntroVideo($intro_video: String!) {
    updateIntroVideo(intro_video: $intro_video) {
      id
      uuid
      name
      bio
      gender
      email
      avatar
      intro_video
      school
      birthdate
      age
      phone_number
      search_distance
      looking_for
      orientation
      new_message_notification
      new_match_notification
      onboarded
      Intro_prompt
      media {
        id
        original_path
        type
      }
    }
  }
`;

export const UPDATE_SCHOOL_MUTATION = gql`
  mutation updateUserSchool($school: String!) {
    updateUserSchool(school: $school) {
      id
      uuid
      name
      bio
      gender
      email
      avatar
      intro_video
      school
      birthdate
      age
      phone_number
      search_distance
      looking_for
      orientation
      new_message_notification
      new_match_notification
      onboarded
      media {
        id
        original_path
        type
      }
    }
  }
`;

export const UPDATE_GENDER_MUTATION = gql`
  mutation updateUserGender($gender: String!) {
    updateUserGender(gender: $gender) {
      id
      uuid
      name
      bio
      gender
      email
      avatar
      intro_video
      school
      birthdate
      age
      phone_number
      search_distance
      looking_for
      orientation
      new_message_notification
      new_match_notification
      onboarded
      media {
        id
        original_path
        type
      }
    }
  }
`;

export const UPDATE_SEARCH_DISTANCE_MUTATION = gql`
  mutation updateSearchDistance($distance: Int!) {
    updateSearchDistance(distance: $distance) {
      id
      uuid
      name
      bio
      gender
      email
      avatar
      intro_video
      school
      birthdate
      age
      phone_number
      search_distance
      looking_for
      orientation
      new_message_notification
      new_match_notification
      onboarded
      media {
        id
        original_path
        type
      }
    }
  }
`;

export const UPDATE_LOOKING_FOR_MUTATION = gql`
  mutation updateUserLookingFor($lookingFor: String!) {
    updateUserLookingFor(lookingFor: $lookingFor) {
      id
      uuid
      name
      bio
      gender
      email
      avatar
      intro_video
      school
      birthdate
      age
      phone_number
      search_distance
      looking_for
      orientation
      new_message_notification
      new_match_notification
      onboarded
      media {
        id
        original_path
        type
      }
    }
  }
`;

export const UPDATE_ORIENTATION_MUTATION = gql`
  mutation updateUserOrientation($orientation: String!) {
    updateUserOrientation(orientation: $orientation) {
      id
      uuid
      name
      bio
      gender
      email
      avatar
      intro_video
      school
      birthdate
      age
      phone_number
      search_distance
      looking_for
      orientation
      new_message_notification
      new_match_notification
      onboarded
      media {
        id
        original_path
        type
      }
    }
  }
`;

export const UPDATE_EMAIL_MUTATION = gql`
  mutation updateUserEmail($email: String!) {
    updateUserEmail(email: $email) {
      id
      uuid
      name
      bio
      gender
      email
      avatar
      intro_video
      school
      birthdate
      age
      phone_number
      search_distance
      looking_for
      orientation
      new_message_notification
      new_match_notification
      onboarded
      media {
        id
        original_path
        type
      }
    }
  }
`;

export const UPDATE_PHONE_NUMBER_MUTATION = gql`
  mutation updateUserPhoneNumber($phoneNumber: String!) {
    updateUserPhoneNumber(phoneNumber: $phoneNumber) {
      id
      uuid
      name
      bio
      gender
      email
      avatar
      intro_video
      school
      birthdate
      age
      phone_number
      search_distance
      looking_for
      orientation
      new_message_notification
      new_match_notification
      onboarded
      media {
        id
        original_path
        type
      }
    }
  }
`;

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation updateUserPassword($password: String!) {
    updateUserPassword(password: $password) {
      id
      uuid
      name
      bio
      gender
      email
      avatar
      intro_video
      school
      birthdate
      age
      phone_number
      search_distance
      looking_for
      orientation
      new_message_notification
      new_match_notification
      onboarded
      media {
        id
        original_path
        type
      }
    }
  }
`;

export const UPDATE_NEW_MATCH_NOTIFICATION_MUTATION = gql`
  mutation updateNewMatchNotification($value: Boolean!) {
    updateNewMatchNotification(value: $value) {
      id
      uuid
      name
      bio
      gender
      email
      avatar
      intro_video
      school
      birthdate
      age
      phone_number
      search_distance
      looking_for
      orientation
      new_message_notification
      new_match_notification
      onboarded
      media {
        id
        original_path
        type
      }
    }
  }
`;

export const UPDATE_NEW_MESSAGE_NOTIFICATION_MUTATION = gql`
  mutation updateNewMessageNotification($value: Boolean!) {
    updateNewMessageNotification(value: $value) {
      id
      uuid
      name
      bio
      gender
      email
      avatar
      intro_video
      school
      birthdate
      age
      phone_number
      search_distance
      looking_for
      orientation
      new_message_notification
      new_match_notification
      onboarded
      media {
        id
        original_path
        type
      }
    }
  }
`;

export const CONVERSATIONS_QUERY = gql`
  query {
    matches {
      id
      lastMessage {
        id
        read
        createdAt
      }
      match {
        id
        uuid
        name
        bio
        gender
        birthdate
        email
        avatar
        school
        birthdate
        age
        phone_number
        search_distance
        looking_for
        orientation
        media {
          id
          original_path
          type
        }
      }
    }
  }
`;

export const FEED_QUERY = gql`
  query feed($latitude: Float!, $longitude: Float!) {
    feed(latitude: $latitude, longitude: $longitude) {
      id
      uuid
      name
      bio
      gender
      birthdate
      email
      avatar
      school
      birthdate
      age
      phone_number
      search_distance
      looking_for
      orientation
      media {
        id
        original_path
        type
      }
      unote {
        id
        type
        original_path
        content
        user {
          name
          avatar
        }
      }
    }
  }
`;

export const CONVERSATION_QUERY = gql`
  query conversation($matchId: ID!) {
    conversation(matchId: $matchId) {
      message
      original_path
      type
      user {
        id
        name
        avatar
      }
    }
  }
`;

export const REACT_MUTATION = gql`
  mutation reactToUser($userId: ID!, $reaction: String!) {
    reactToUser(userId: $userId, reaction: $reaction) {
      hasMatched
      match {
        users {
          id
          avatar
          name
        }
      }
    }
  }
`;

export const REPORT_USER_MUTATION = gql`
  mutation reportUser($userId: ID!, $reason: String!) {
    reportUser(userId: $userId, reason: $reason) {
      reported_by_id
      report_user_id
      reason
    }
  }
`;


export const USER_REGISTRATION = gql` 
mutation registration($email: String!)
{ registration(email: $email) 
  { user { id uuid name bio gender email avatar intro_video school birthdate age phone_number search_distance looking_for orientation new_message_notification new_match_notification onboarded } token } }`

  export const verifyOtp = gql` mutation verifyOtp($otp: String!){ verifyOtp(otp: $otp) }`


  // export const createPassword = gql` mutation createPassword($newPassword: String!, $repeatPassword: String!){ createPassword(newPassword: $newPassword, repeatPassword: $repeatPassword) {
  //   user { id uuid name bio gender email avatar intro_video school birthdate age phone_number search_distance looking_for orientation new_message_notification new_match_notification onboarded }
  // }}`

  // export const forgotPassword = gql`
  // mutation forgotPassword($email: String!)
  // { verifyOtp(email: $email) {
  //   token
  // }}`

  export const createPassword = gql`
  mutation createPassword($newPassword: String!, $repeatPassword: String!) {
    createPassword(newPassword: $newPassword, repeatPassword: $repeatPassword) {
      id
      uuid
      name
      bio
      gender
      email
      avatar
      intro_video
      school
      birthdate
      age
      phone_number
      search_distance
      looking_for
      orientation
      new_message_notification
      new_match_notification
      onboarded
      original_video
      original_audio
      x
      y
    }
  }
`;

  export const forgotPassword = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email){
      user { id uuid name bio gender email avatar intro_video school birthdate age phone_number search_distance looking_for orientation new_message_notification new_match_notification onboarded } token 
    }
  }
`;

export const resetPassword = gql` mutation resetPassword($newPassword: String!, $repeatPassword: String!){ resetPassword(newPassword: $newPassword, repeatPassword: $repeatPassword) {
  id uuid name bio gender email avatar intro_video school birthdate age phone_number search_distance looking_for orientation new_message_notification new_match_notification onboarded }
 }`;
 
 export const resendOtp = gql`
 query resendOtp {
  resendOtp {
    message
  }
}
`;
 
export const registrationStepSecond = gql` mutation RegistrationStepSecond($name: String!, $birthdate: String!) {
  registrationStepSecond(name: $name, birthdate: $birthdate) {
    id
    uuid
    name
    email
    otp
    otpu
    password
    birthdate
    age
    gender
    referralCode
    bio
    school
    avatar
    intro_video
    intro_video_prompt
    phone_number
    search_distance
    looking_for
    orientation
    new_message_notification
    new_match_notification
    push_notification_token
    onboarded
    original_video
    original_audio
    x
    y
    relation_type
    zodiac
  }
}
`
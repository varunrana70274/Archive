import axios from "axios";
import { fetchToken } from "../libs/helpers";
// const BASEURL = "http://wave-prod.us-east-1.elasticbeanstalk.com/api";
// const BASEURL = "http://wavebk.cqr3aktwwjgt.us-east-1.rds.amazonaws.com/api";
// const BASEURL = "http://192.168.0.106:4000/api";
const BASEURL = "http://54.166.122.249:4000/api";
// const BASEURL = "http://localhost:4000/api";

const API = {
  baseUrl: BASEURL,
  async getHeaders() {
    let heads = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    let { token } = await fetchToken();

    if (token) {
      heads["x-access-token"] = `${token}`;
      heads['authorization']=`$Bearer ${token}`
    }

    return heads;
  },
  async uploadUserAvatar(params) {
    let headers = await API.getHeaders();
    headers["Content-Type"] = "application/x-www-form-urlencoded";

    return axios.post(`${BASEURL}/profile/avatar`, params, { headers });
  },
  async uploadUserIntro(params) {
    console.log("paramsssss", params);
    let headers = await API.getHeaders();
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    console.log("eader", headers);
    return axios.post(`${BASEURL}/profile/video`, params, { headers });
  },
  async uploadUserIntroUpdate(params) {
    console.log("paramsssss", params);
    let headers = await API.getHeaders();
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    console.log("eader", headers);
    return axios.put(`${BASEURL}/profile/video`, params, { headers });
  },
  async deleteIntro() {
    let headers = await API.getHeaders();
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    console.log("eader", headers);
    return axios.delete(`${BASEURL}/profile/delete`, { headers });
  },
  async uploadProfileMedia(params) {
    let headers = await API.getHeaders();
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    console.log('paramssss',params);
    return axios.post(`${BASEURL}/profile/media`, params, { headers });
  },
  async removeProfileMedia(mediaId) {
    let headers = await API.getHeaders();
    headers["Content-Type"] = "application/x-www-form-urlencoded";

    return axios.delete(`${BASEURL}/profile/media/${mediaId}`, { headers });
  },
  async sendMessage(matchId, params) {
    let headers = await API.getHeaders();
    headers["Content-Type"] = "application/x-www-form-urlencoded";

    return axios.post(`${BASEURL}/messages/${matchId}`, params, { headers });
  },
  async sendUnote(userId, params) {
    let headers = await API.getHeaders();
    headers["Content-Type"] = "application/x-www-form-urlencoded";

    return axios.post(`${BASEURL}/unotes/${userId}`, params, { headers });
  },
  async fetchFeed(latitude, longitude) {
    console.log('latitude, longitude',latitude, longitude);
    let headers = await API.getHeaders();
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    return axios.get(
      latitude==null?`${BASEURL}/feed`:
      `${BASEURL}/feed?latitude=${latitude}&longitude=${longitude}`,
      { headers }
    );
  },
  async forgotPassword(data) {
    console.log(data);
    let headers = await API.getHeaders();
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    return axios.post(`${BASEURL}/sendotp`, data, { headers });
  },
  async otpVerify(data) {
    let headers = await API.getHeaders();
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    return axios.post(`${BASEURL}/otpverify`, data, { headers });
  },
  async resendOtp() {
    let headers = await API.getHeaders();
    console.log('headers',JSON.stringify(headers,null,2));
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    return axios.get(`${BASEURL}/resendOtp`, { headers });
  },
  async fetchFeedAdmin(latitude, longitude) {
    let headers = await API.getHeaders();
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    return axios.get(
      `${BASEURL}/feed-admin?latitude=${latitude}&longitude=${longitude}`,
      { headers }
    );
  },
  async pingUnote() {
    let headers = await API.getHeaders();
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    return axios.get(`${BASEURL}/unote/ping`, { headers });
  },
  async sendUserReaction(userId, reaction) {
    let headers = await API.getHeaders();

    return axios.post(
      `${BASEURL}/match/${userId}/react`,
      { reaction: reaction },
      { headers }
    );
  },
  async updatePushNotificationToken(token) {
    let headers = await API.getHeaders();

    return axios.post(
      `${BASEURL}/user/pushtoken`,
      { token: token },
      { headers }
    );
  },
  async markRead(matchId) {
    let headers = await API.getHeaders();

    return axios.post(`${BASEURL}/messages/${matchId}/read`, {}, { headers });
  },
  async removeMatch(matchId) {
    let headers = await API.getHeaders();
    headers["Content-Type"] = "application/x-www-form-urlencoded";

    return axios.delete(`${BASEURL}/matches/${matchId}`, { headers });
  },
  async blockUser(matchId) {
    let headers = await API.getHeaders();
    console.log(headers);
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    return axios.post(`${BASEURL}/matches/${matchId}/block`, {}, { headers });
  },
  async getNotificationCount() {
    let headers = await API.getHeaders();
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    return axios.get(`${BASEURL}/messages/unread`, { headers });
  },
  async reportUser(userId, reason) {
    let headers = await API.getHeaders();

    return axios.post(
      `${BASEURL}/user/report`,
      {
        userId: userId,
        reason: reason,
      },
      { headers }
    );
  },
  async emailExist(email) {
    let headers = await API.getHeaders();

    return axios.post(
      `${BASEURL}/user/userexist`,
      {
        email: email,
      },
      { headers }
    );
  },
  async referalCodeVerify(code) {
    let headers = await API.getHeaders();

    return axios.post(
      `${BASEURL}/validateCode`,
      {
        referralCode: code,
      },
      { headers }
    );
  },
  async filter(body) {
    let headers = await API.getHeaders();

    return axios.post(
      `${BASEURL}/addFilter`,
      body,
      { headers }
    );
  },
};

export default API;

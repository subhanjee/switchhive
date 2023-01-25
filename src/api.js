import axios from 'axios';
import Config from 'react-native-config';
const topupReloadly = Config.REACT_APP_TOPUP_RELOADLY;
const productsReloadly = Config.REACT_APP_GIFTCARD_RELOADLY;
const utilityReloadly = Config.REACT_APP_UTILITY_RELOADLY;
const authReloadly = Config.REACT_APP_RELOADLY_AUTHENTICATION;
const baseUrl =
  Config.REACT_APP_ENV === 'dev'
    ? Config.REACT_APP_API_URL
    : Config.REACT_APP_PRODUCTION_API_URL;
const coinRemitter = Config.REACT_APP_COIN_REMITTER_API;
const currencyApi = Config.REACT_APP_CURRENCY_API_URL;

const topup = axios.create({
  baseURL: `${topupReloadly}`,
});
topup.interceptors.request.use(
  req => {
    return req;
  },
  err => {
    return Promise.reject(err);
  },
);

const authenticationReloadly = axios.create({
  baseURL: `${authReloadly}`,
});
authenticationReloadly.interceptors.request.use(
  req => {
    return req;
  },
  err => {
    return Promise.reject(err);
  },
);

const giftcards = axios.create({
  baseURL: `${productsReloadly}`,
});
giftcards.interceptors.request.use(
  req => {
    return req;
  },
  err => {
    return Promise.reject(err);
  },
);
const utilities = axios.create({
  baseURL: `${utilityReloadly}`,
});
utilities.interceptors.request.use(
  req => {
    return req;
  },
  err => {
    return Promise.reject(err);
  },
);

const auth = axios.create({
  baseURL: `${baseUrl}auth`,
});
auth.interceptors.request.use(
  req => {
    return req;
  },
  err => {
    return Promise.reject(err);
  },
);

const crypto = axios.create({
  baseURL: `${baseUrl}/coinremitter`,
});
crypto.interceptors.request.use(
  req => {
    return req;
  },
  err => {
    return Promise.reject(err);
  },
);

const users = axios.create({
  baseURL: `${baseUrl}/users`,
});
users.interceptors.request.use(
  req => req,
  err => Promise.reject(err),
);

const orders = axios.create({
  baseURL: `${baseUrl}/order`,
});
orders.interceptors.request.use(
  req => req,
  err => Promise.reject(err),
);
const cards = axios.create({
  baseURL: `${baseUrl}/cards`,
});

cards.interceptors.request.use(
  req => req,
  err => Promise.reject(err),
);

const wishlist = axios.create({
  baseURL: `${baseUrl}/wishlist`,
});

wishlist.interceptors.request.use(
  req => req,
  err => Promise.reject(err),
);
const blogs = axios.create({
  baseURL: `${baseUrl}/blog`,
});

blogs.interceptors.request.use(
  req => req,
  err => Promise.reject(err),
);
const currencyRate = axios.create({
  baseURL: `${currencyApi}latest`,
});

currencyRate.interceptors.request.use(
  req => req,
  err => Promise.reject(err),
);

const redeem = axios.create({
  baseURL: `${baseUrl}/redeem`,
});

redeem.interceptors.request.use(
  req => req,
  err => Promise.reject(err),
);

const wallet = axios.create({
  baseURL: `${baseUrl}/wallet`,
});

wallet.interceptors.request.use(
  req => req,
  err => Promise.reject(err),
);

const refund = axios.create({
  baseURL: `${baseUrl}/failed`,
});
refund.interceptors.request.use(
  req => req,
  err => Promise.reject(err),
);

export {
  topup,
  authenticationReloadly,
  giftcards,
  utilities,
  crypto,
  users,
  auth,
  orders,
  cards,
  wishlist,
  blogs,
  currencyRate,
  redeem,
  wallet,
  refund,
};

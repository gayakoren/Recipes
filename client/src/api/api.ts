import axios from 'axios';

import { getServerUrl } from '../utils/env.util';

const Api = axios.create({
  baseURL: getServerUrl(),
  responseType: 'json',
  withCredentials: true,
});

export default Api;

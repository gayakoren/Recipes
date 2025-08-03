export const getServerUrl = () => {
  let serverEndpoint = window.location.origin;
  if (serverEndpoint.includes('localhost')) serverEndpoint = 'http://localhost:5000';
  return `${serverEndpoint}/api`;
};
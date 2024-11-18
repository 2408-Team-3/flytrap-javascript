import axios from 'axios';

export const getIpAddress = async () => {
  try {
    const { data }= await axios.get('https://api.ipify.org?format=json');
    console.log('ip data: ', data)
    return data.ip;
  } catch {
    return 'Unknown';
  }
}
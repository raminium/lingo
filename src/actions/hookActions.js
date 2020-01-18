import axios from 'axios';

import { getLetterMatchCount } from '../helpers';

export const getSecretWord = async (setSecretWord, languageCode) => {
  languageCode = languageCode || 'en';
  const response = await axios.get(`http://localhost:3030/${languageCode}`);
  return setSecretWord(response.data);
};

export const updatedGetSecretWord = async (languageCode) => {
  languageCode = languageCode || 'en';
  const response = await axios.get(`http://localhost:3030/${languageCode}`);
  return response.data;
}

//
export default {
  getSecretWord,
  updatedGetSecretWord,
}
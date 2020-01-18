import React from 'react';

import guessedWordsContext from './contexts/guessedWordsContext';
import languageContext from './contexts/languageContext';
import stringModule from './helpers/strings';

const GuessedWords = () => {
  const [guessedWords] = guessedWordsContext.useGuessedWords();
  const [language] = languageContext.useLanguage();
  let contents;

  if (guessedWords.length === 0) {
    contents = (
      <p
        className="lead text-info text-center" 
        data-test="guess-instructions">
        {stringModule.getStringByLanguage(language, 'guessPrompt')}
      </p>
    )
  } else {
    const guessedWordsRows = guessedWords.map((word, index) => (
      <tr
        data-test="guessed-word"
        key={index}
      >
        <td>{word.guessedWord}</td>
        <td>{word.letterMatchCount}</td>
      </tr>
    ));
    contents = (
      <div data-test="guessed-words">
        <h3>{stringModule.getStringByLanguage(language, 'guessColumnHeader')}</h3>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>{stringModule.getStringByLanguage(language, 'guessedWords')}</th>
              <th>{stringModule.getStringByLanguage(language, 'matchingLettersColumnHeader')}</th>
            </tr>
          </thead>
          <tbody>
            {guessedWordsRows}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div data-test="component-guessed-words">
      {contents}
    </div>
  );
};

export default GuessedWords;
// Based on the blog post 'Application State Management with React' by Kent C. Dodds
// https://kentcdodds.com/blog/application-state-management-with-react

import React from 'react';

const performanceContext = React.createContext();

/**
 * Initializes useContext hook and throws error if function is used outside of 
 * the provider's scope.
 * @function usePerformance
 * @returns {Array} performanceContext value, which is a state of [value, setter].
 */
const usePerformance = () => {

  const context = React.useContext(performanceContext);

  if (!context) {
    throw new Error('Error: usePerformance must be used within a PerformanceProvider');
  }

  return context;
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'success':
      return { ...state, success: true };
    case 'give_up':
      return { ...state, giveUp: true };
    case 'reset':
      
      return { success: false, giveUp: false };
    default:
      throw new Error(`Error: The action.type '${action.type}' is not available for the performanceContext!`);
  }
}

/**
 * Provider function for the performanceContext. Uses the useMemo hook to not
 * update unnecessarily.
 * @function PerformanceProvider
 * @param {object} props - props to pass through from declared component.
 * @returns {JSX.Element} - Provider component.
 */
const PerformanceProvider = (props) => {
  const [performance, setPerformance] = React.useReducer(reducer, {
    success: false,
    giveUp: false
  });

  const value = React.useMemo(() => [performance, setPerformance], [performance]);

  return <performanceContext.Provider value={value} {...props} />;
}

export default { PerformanceProvider, usePerformance };
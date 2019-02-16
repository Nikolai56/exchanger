export const ActionTypes = {
  FETCHED_RATES: 'FETCHED_RATES',
  REQUESTED_RATES: 'REQUESTED_RATES',
  REQUESTED_RATES_SUCCEEDED: 'REQUESTED_RATES_SUCCEEDED',
  REQUESTED_RATES_FAILED: 'REQUESTED_RATES_FAILED',
};

export const fetchRates = () => {
  return { type: ActionTypes.FETCHED_RATES };
};

export const requestRates = () => {
  return { type: ActionTypes.REQUESTED_RATES };
};

export const requestRatesSuccess = data => {
  return { type: ActionTypes.REQUESTED_RATES_SUCCEEDED, data };
};

export const requestRatesError = error => {
  return { type: ActionTypes.REQUESTED_RATES_FAILED, error };
};

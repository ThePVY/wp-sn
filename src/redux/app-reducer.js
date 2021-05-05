import { reset } from "redux-form";
import { thunkCreator as authTC } from "./auth-reducer";
import { thunkCreator as profileTC } from "./profile-reducer";

const SET_INITIALIZED = "app/SET_INITIALIZED";
const SET_SPIN_LOGO = "app/SET_SPIN_LOGO";

//for construct action in components
export const actionCreator = {
  setInitialized: () => ({ type: SET_INITIALIZED }),
  setSpinLogo: (spin) => ({ type: SET_SPIN_LOGO, spin }),
};

export const initializeApp = () => async (dispatch) => {
  try {
    const userId = await dispatch(authTC.getAuthData());

    await dispatch(profileTC.getProfileData(userId));
    await dispatch(profileTC.getProfileStatus(userId));
    console.log("App Reducer loaded Status and Data");
    dispatch(actionCreator.setInitialized());
  }
  catch (err) {
    setTimeout(() => {
      console.log(err);
      console.log("Reinitialization...");
      dispatch(initializeApp);
    }, 3000);
  }
};

export const spinLogoOn = (dispatchCreatorCallback) => (dispatch, getState) => {
  dispatchCreatorCallback()
  dispatch(actionCreator.setSpinLogo(true));
  setTimeout(() => {
    console.log(getState().app.spinLogo)
    dispatch(actionCreator.setSpinLogo(false));
  }, 1500);
};

export const resetForm = (form) => (dispatch) => dispatch(reset(form));

//initial value of state
const initialState = {
  initialized: false,
  spinLogo: false,
};

//for changing state in store
export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return { ...state, initialized: true };
    case SET_SPIN_LOGO:
      return { ...state, spinLogo: action.spin };
    default:
      return state;
  }
};

/*---------------------------------------------------------------------------------*/

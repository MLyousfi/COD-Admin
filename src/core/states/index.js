import {configureStore} from '@reduxjs/toolkit'
import signUpStepsReducer from './signup'
import settingsReducer from './settings'

export default configureStore({
    reducer: {
        signUpSteps: signUpStepsReducer,
        settings: settingsReducer,
    }
})
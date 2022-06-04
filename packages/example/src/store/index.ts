import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const defaultReducer = {
    init: (state = {}, action) => {
        switch (action.type) {
            default:
                return state;
        }
    }
};
const createReducer = (asyncReducers = defaultReducer) => {
    return combineReducers({
        ...defaultReducer,
        ...asyncReducers
    });
};
const store = createStore(createReducer(), composeEnhancers(applyMiddleware(thunk))) as any;
store.asyncReducers = {};
export default function getStore() {
    store.injectReducer = (key, asyncReducer) => {
        store.asyncReducers[key] = asyncReducer;
        store.replaceReducer(createReducer(store.asyncReducers));
    };
    store.initReducer = () => {
        store.asyncReducers = {};
        store.replaceReducer(createReducer(store.asyncReducers));
    };
    return store;
}

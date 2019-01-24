import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import modules from './modules';
import sagas from './sagas';

const configure = () => {
    // using redux-devtools : chrome extension
    //const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

    const sagaMiddleware = createSagaMiddleware();

    const middlware = [sagaMiddleware];
    const store = createStore(
        modules,
        compose(
            applyMiddleware(...middlware),
            //devTools
        )
    );

    sagaMiddleware.run(sagas);
    
    return store;
}

export default configure;
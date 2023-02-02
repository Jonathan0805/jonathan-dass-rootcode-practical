import {configureStore} from "@reduxjs/toolkit";
import dummyreducer from "./itemreducer";

const store = configureStore({reducer: dummyreducer})

export default store;

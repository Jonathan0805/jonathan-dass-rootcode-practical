import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/home';
import VehicleDetailsView from './components/vehicleDetailsView';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/">
                        <Route index
                            element={<Home/>}/>
                        <Route path="vehicledetailview/:id"
                            element={<VehicleDetailsView/>}/>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

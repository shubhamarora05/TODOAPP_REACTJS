import React from "react";
import { render } from "react-dom";

import {Task} from "./components/Task";

require('./css/app.css');
require('./css/task-list.css');

class App extends React.Component{

    render(){ 
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        <Task/>
                    </div>
                </div>  
            </div>
        );
    }
}

render(<App/>, window.document.getElementById("app"));
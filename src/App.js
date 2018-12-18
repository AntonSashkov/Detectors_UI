import React, {Component} from 'react';
import './App.css';
import DetectorsList from "./containers/DetectorsList";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

const vertical = 'top';
const horizontal = 'center';

class App extends Component {
    state = {
        actionTaken: false,
        message: ''
    };

    componentDidUpdate() {
        if (this.state.actionTaken) {
            setTimeout(() => {
                this.setState({actionTaken: false});
            }, 3000);
        }
    }

    render() {
        const {actionTaken, message} = this.state;

        return (
            <div className="App">
                <Snackbar
                    anchorOrigin={{vertical, horizontal}}
                    open={actionTaken}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span>{message}</span>}
                />
                <DetectorsList doAction={message => this.setState({actionTaken: true, message})}/>
            </div>
        );
    }
}

export default App;

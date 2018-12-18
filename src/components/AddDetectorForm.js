import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

const axios = require('axios');

const styles = theme => ({
    paper: {
        borderRadius: '10px',
        overflow: 'hidden'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    loader: {
        margin: '0 auto'
    }
});

const currencies = [
    {
        value: 'feeders',
        label: 'Кормление',
    },
    {
        value: 'sprinklers',
        label: 'Полив',
    },
    {
        value: 'heaters',
        label: 'Отопление',
    },
    {
        value: 'illuminators',
        label: 'Освещение',
    },
];

class AddDetectorForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: '',
            address: '',
            name: '',

            creatingLoader: false
        };

        this.baseState = this.state
    }


    addDetector = () => {
        const {type, address, name} = this.state;
        const {doAction, handleClose, triggerUpdate} = this.props;

        this.setState({creatingLoader: true});

        let payload = {name, address};
        if (type === 'feeders') {
            payload.timeOfLastFeeding = new Date(Date.parse(new Date().toLocaleString()));
            payload.period = 8;
        }
        if (type === 'sprinklers') {
            payload.timeofLastWatering = new Date(Date.parse(new Date().toLocaleString()));
        }
        if (type === 'heaters') {
            payload.temperature = 100;
        }
        if (type === 'illuminators') {
            payload.brightness = 50;
        }

        axios.post(`http://localhost:8080/${type}`, payload)
            .then(response => {
                    setTimeout(() => {
                        handleClose();
                        doAction("Датчик успешно добавлен!");
                        triggerUpdate(type);
                        this.setState(this.baseState);
                    }, 2000);
                }
            ).catch(error => console.log(error));
    };

    render() {
        const {open, handleClose, classes} = this.props;
        const {creatingLoader, type, address, name} = this.state;

        return (
            <Dialog
                classes={{paper: classes.paper}}
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="xs"
            >
                <DialogTitle id="form-dialog-title">Добавить датчик</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Заполните необходимые поля
                    </DialogContentText>
                    <TextField
                        onChange={(e) => this.setState({type: e.target.value})}
                        select
                        value={this.state.type}
                        label="Тип"
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="dense"
                        fullWidth
                    >
                        {currencies.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        onChange={(e) => this.setState({address: e.target.value})}
                        margin="dense"
                        label="Адрес"
                        fullWidth
                    />
                    <TextField
                        onChange={(e) => this.setState({name: e.target.value})}
                        margin="dense"
                        label="Имя"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    {
                        creatingLoader ? <CircularProgress className={classes.loader}/> :
                            <>
                                <Button onClick={handleClose} color="primary">
                                    Отмена
                                </Button>
                                <Button
                                    disabled={type === '' || address === '' || name === ""}
                                    color="primary"
                                    onClick={() => this.addDetector()}
                                >
                                    Добавить
                                </Button>
                            </>
                    }
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(AddDetectorForm);

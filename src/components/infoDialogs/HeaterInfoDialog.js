import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import axios from "axios";

const styles = theme => ({
    paper: {
        borderRadius: '10px',
        minWidth: '400px'
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
    dialogContentRoot: {
        padding: '0 24px'
    }
});

class HeaterInfoDialog extends React.Component {
    state = {
        temperature: '',
        address: '',
        name: '',

        brightnessClicked: false,
        addressClicked: false,
        nameClicked: false,
    };

    render() {
        const {open, handleClose, classes, doAction, detectorInfo, triggerUpdate} = this.props;
        const {address, name, addressClicked, nameClicked} = this.state;

        return (
            <Dialog
                classes={{paper: classes.paper}}
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="xs"
            >
                <DialogTitle id="form-dialog-title">
                    <strong>Информация о датчике</strong>
                </DialogTitle>
                <DialogContent classes={{root: classes.dialogContentRoot}}>
                    <Typography
                        gutterBottom
                        variant='subheading'
                        onClick={() => {
                            this.setState({brightnessClicked: true});
                        }}
                    >
                        <strong>Температура: {detectorInfo.temperature}</strong>
                    </Typography>
                    {!addressClicked ?
                        <Typography
                            gutterBottom
                            variant='subheading'
                            onClick={() => {
                                this.setState({
                                    addressClicked: true
                                });
                            }}
                        >
                            <strong>
                                Адрес: {detectorInfo.address}
                            </strong>
                        </Typography> :
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Адрес"
                            fullWidth
                            value={address}
                            onBlur={() => {
                                this.setState({addressClicked: false});
                            }}
                            onChange={(e) => this.setState({address: e.target.value})}
                        />
                    }

                    {!nameClicked ?
                        <Typography
                            gutterBottom
                            variant='subheading'
                            onClick={() => {
                                this.setState({
                                    nameClicked: true
                                });
                            }}
                        >
                            <strong>
                                Имя: {detectorInfo.name}
                            </strong>
                        </Typography> :
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Имя"
                            fullWidth
                            value={name}
                            onBlur={() => {
                                this.setState({
                                    nameClicked: false
                                });
                            }}
                            onChange={(e) => this.setState({name: e.target.value})}
                        />
                    }
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined'
                            onClick={() => {
                                doAction('Датчик выключен');
                                handleClose();
                                /*axios.post(`http://localhost:8080/feeders/${detectorInfo.address}/food`)
                                    .then(reponse => {
                                        triggerUpdate("feeders");
                                        doAction('Ням-ням');
                                        handleClose();
                                    })
                                    .catch();*/
                            }} color="primary">
                        Выкл
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(HeaterInfoDialog);

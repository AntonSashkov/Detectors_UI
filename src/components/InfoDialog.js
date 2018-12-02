import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";

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

class InfoDialog extends React.Component {
    state = {
        timeOfLastFeeding: '01.01.2018 18:00',
        period: '6',
        address: '127.0.0.1',
        name: 'Кормушка для рыб',

        timeOfLastFeedingClicked: false,
        periodClicked: false,
        addressClicked: false,
        nameClicked: false,
    };

    render() {
        const {open, handleClose, classes, doAction} = this.props;
        const {timeOfLastFeeding, period, address, name, timeOfLastFeedingClicked, periodClicked, addressClicked, nameClicked} = this.state;

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
                    {!timeOfLastFeedingClicked ?
                        <Typography
                            gutterBottom
                            variant='subheading'
                            onClick={() => {
                                this.setState({timeOfLastFeedingClicked: true})
                            }}
                        >
                            <strong>Последнее кормление: {timeOfLastFeeding}</strong>
                        </Typography> :
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Последнее кормление"
                            fullWidth
                            value={timeOfLastFeeding}
                            onBlur={() => this.setState({timeOfLastFeedingClicked: false})}
                            onChange={(e) => this.setState({timeOfLastFeeding: e.target.value})}
                        />
                    }

                    {!periodClicked ?
                        <Typography
                            gutterBottom
                            variant='subheading'
                            onClick={() => {
                                this.setState({periodClicked: true});
                            }}
                        >
                            <strong>Период(ч): {period}</strong>
                        </Typography> :
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Период(ч)"
                            fullWidth
                            value={period}
                            onBlur={() => {
                                this.setState({periodClicked: false});
                            }}
                            onChange={(e) => this.setState({period: e.target.value})}
                        />
                    }

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
                                Адрес: {address}
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
                                Имя: {name}
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
                                doAction();
                                handleClose();
                            }} color="primary">
                        Покормить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(InfoDialog);

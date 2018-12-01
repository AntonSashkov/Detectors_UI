import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
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
});

const currencies = [
    {
        value: 'USD',
        label: 'Кормление',
    },
    {
        value: 'EUR',
        label: 'Полив',
    },
    {
        value: 'BTC',
        label: 'Отопление',
    },
    {
        value: 'JPY',
        label: 'Освещение',
    },
];

class AddDetectorForm extends React.Component {
    state={
        type: ''
    };

    render() {
        const {open, handleClose, classes} = this.props;

        return (
            <Dialog
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
                        margin="dense"
                        label="Адрес"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Имя"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Добавить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(AddDetectorForm);

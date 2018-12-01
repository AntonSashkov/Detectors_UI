import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Icon from "@material-ui/core/Icon/Icon";

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

class CollapsableList extends React.Component {
    render() {
        const {classes, open} = this.props;

        return (
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <Icon>adb</Icon>
                        </ListItemIcon>
                        <ListItemText inset primary="Датчик 1"/>
                    </ListItem>
                </List>
            </Collapse>
        );
    }
}

CollapsableList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CollapsableList);

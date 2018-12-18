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
        const {classes, open, openInfo, data} = this.props;

        return (
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        open && data.slice(0, 3).map((element, index) => {
                            return (
                                <ListItem
                                    key={`k${index}`}
                                    button
                                    className={classes.nested}
                                    onClick={() => openInfo(element)}
                                >
                                    <ListItemIcon>
                                        <Icon>adb</Icon>
                                    </ListItemIcon>
                                    <ListItemText inset primary={element.name}/>
                                </ListItem>
                            )
                        })
                    }
                    {open && data.length > 3 &&
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <Icon>adb</Icon>
                        </ListItemIcon>
                        <ListItemText inset primary="..."/>
                    </ListItem>
                    }

                </List>
            </Collapse>
        );
    }
}

CollapsableList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CollapsableList);

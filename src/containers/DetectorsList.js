import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Icon from "@material-ui/core/Icon/Icon";
import CollapsableList from "../components/CollapsableList";
import IconButton from "@material-ui/core/IconButton/IconButton";
import AddDetectorForm from "../components/AddDetectorForm";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px'
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    addButton: {
        position: 'absolute',
        right: '12px'
    }
});

class NestedList extends React.Component {
    state = {
        isFoodSectionOpen: false,
        isWateringSectionOpen: false,
        isHeatingSectionOpen: false,
        isIlluminationSectionOpen: false,

        addDetectorFormDialog: false
    };

    render() {
        const {classes} = this.props;
        const {isFoodSectionOpen, isWateringSectionOpen, isHeatingSectionOpen, isIlluminationSectionOpen, addDetectorFormDialog} = this.state;

        return (
            <div className={classes.root}>
                <List
                    component="nav"
                    subheader=
                        {
                            <ListSubheader component="div">Устройства
                                <Tooltip title="Добавить устройство" disableFocusListener>
                                    <IconButton
                                        className={classes.addButton}
                                        onClick={() => this.setState({addDetectorFormDialog: true})}>
                                        <Icon>add</Icon>
                                    </IconButton>
                                </Tooltip>
                            </ListSubheader>
                        }
                >
                    <AddDetectorForm
                        open={addDetectorFormDialog}
                        handleClose={() => {
                            this.setState({addDetectorFormDialog: false});
                        }}/>

                    {/*Food Section*/}
                    <ListItem
                        button
                        onClick={() => {
                            this.setState(prevState => ({
                                isFoodSectionOpen: !prevState.isFoodSectionOpen
                            }));
                        }}>
                        <ListItemIcon>
                            <Icon>pets</Icon>
                        </ListItemIcon>
                        <ListItemText inset primary="Кормление"/>
                        {isFoodSectionOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <CollapsableList open={isFoodSectionOpen}/>

                    {/*Watering Section*/}
                    <ListItem
                        button
                        onClick={() => {
                            this.setState(prevState => ({
                                isWateringSectionOpen: !prevState.isWateringSectionOpen
                            }));
                        }}
                    >
                        <ListItemIcon>
                            <Icon>spa</Icon>
                        </ListItemIcon>
                        <ListItemText inset primary="Полив"/>
                        {isWateringSectionOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <CollapsableList open={isWateringSectionOpen}/>

                    {/*Heating Section*/}
                    <ListItem
                        button
                        onClick={() => {
                            this.setState(prevState => ({
                                isHeatingSectionOpen: !prevState.isHeatingSectionOpen
                            }));
                        }}
                    >
                        <ListItemIcon>
                            <Icon>location_city</Icon>
                        </ListItemIcon>
                        <ListItemText inset primary="Отопление"/>
                        {isHeatingSectionOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <CollapsableList open={isHeatingSectionOpen}/>

                    {/*Illumination Section*/}
                    <ListItem
                        button
                        onClick={() => {
                            this.setState(prevState => ({
                                isIlluminationSectionOpen: !prevState.isIlluminationSectionOpen
                            }));
                        }}
                    >
                        <ListItemIcon>
                            <Icon>highlight</Icon>
                        </ListItemIcon>
                        <ListItemText inset primary="Освещение"/>
                        {isIlluminationSectionOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <CollapsableList open={isIlluminationSectionOpen}/>
                </List>
            </div>
        );
    }
}

NestedList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);

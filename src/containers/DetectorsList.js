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
import FeederInfoDialog from "../components/infoDialogs/FeederInfoDialog";
import axios from 'axios';
import WateringInfoDialog from "../components/infoDialogs/WateringInfoDialog";
import HeaterInfoDialog from "../components/infoDialogs/HeaterInfoDialog";
import IlluminatorInfoDialog from "../components/infoDialogs/IlluminatorInfoDialog";

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
        feeders: null,
        heaters: null,
        illuminators: null,
        sprinklers: null,

        isFoodSectionOpen: false,
        isWateringSectionOpen: false,
        isHeatingSectionOpen: false,
        isIlluminationSectionOpen: false,

        addDetectorFormDialogOpen: false,
        infoDialogOpen: false,

        actionTaken: false,

        updateTrigger: null,

        feederDetectorChosen: null,
        wateringDetectorChosen: null,
        heatingDetectorChosen: null,
        iluminationDetectorChosen: null
    };

    async componentDidMount() {
        try {
            const feeders = await axios("http://localhost:8080/feeders");
            const heaters = await axios("http://localhost:8080/heaters");
            const illuminators = await axios("http://localhost:8080/illuminators");
            const sprinklers = await axios("http://localhost:8080/sprinklers");

            this.setState({
                feeders: feeders.data,
                heaters: heaters.data,
                illuminators: illuminators.data,
                sprinklers: sprinklers.data
            });
        } catch (error) {
            console.log(error);
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        const {updateTrigger} = this.state;

        if (updateTrigger) {
            this.setState({updateTrigger: null});
            try {
                const updatedDetectors = await axios(`http://localhost:8080/${updateTrigger}`);
                this.setState({[updateTrigger]: updatedDetectors.data});
            } catch (error) {
                console.log(error);
            }
        }
    }

    render() {
        const {classes, doAction} = this.props;
        const {
            isFoodSectionOpen,
            isWateringSectionOpen,
            isHeatingSectionOpen,
            isIlluminationSectionOpen,
            addDetectorFormDialogOpen,
            infoDialogOpen,
            feeders,
            feederDetectorChosen,
            sprinklers,
            wateringDetectorChosen,
            heaters,
            heatingDetectorChosen,
            illuminators,
            iluminationDetectorChosen
        } = this.state;

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
                                        onClick={() => this.setState({addDetectorFormDialogOpen: true})}>
                                        <Icon>add</Icon>
                                    </IconButton>
                                </Tooltip>
                            </ListSubheader>
                        }
                >
                    <AddDetectorForm
                        triggerUpdate={triggerType => this.setState({updateTrigger: triggerType})}
                        doAction={doAction}
                        open={addDetectorFormDialogOpen}
                        handleClose={() => {
                            this.setState({addDetectorFormDialogOpen: false});
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
                    <CollapsableList
                        data={feeders}
                        open={isFoodSectionOpen}
                        openInfo={(detector) => this.setState({infoDialogOpen: true, feederDetectorChosen: detector})}
                    />

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
                    <CollapsableList open={isWateringSectionOpen}
                                     data={sprinklers}
                                     openInfo={(detector) => this.setState({
                                         infoDialogOpen: true,
                                         wateringDetectorChosen: detector
                                     })}
                    />

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
                    <CollapsableList open={isHeatingSectionOpen}
                                     data={heaters}
                                     openInfo={(detector) => this.setState({
                                         infoDialogOpen: true,
                                         heatingDetectorChosen: detector
                                     })}
                    />

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
                    <CollapsableList
                        open={isIlluminationSectionOpen}
                        data={illuminators}
                        openInfo={(detector) => this.setState({
                            infoDialogOpen: true,
                            iluminationDetectorChosen: detector
                        })}
                    />

                    {feederDetectorChosen &&
                    <FeederInfoDialog
                        triggerUpdate={triggerType => this.setState({updateTrigger: triggerType})}
                        open={infoDialogOpen}
                        detectorInfo={feederDetectorChosen}
                        handleClose={() => {
                            this.setState({infoDialogOpen: false, feederDetectorChosen: null});
                        }}
                        doAction={doAction}
                    />
                    }
                    {wateringDetectorChosen &&
                    <WateringInfoDialog
                        triggerUpdate={triggerType => this.setState({updateTrigger: triggerType})}
                        open={infoDialogOpen}
                        detectorInfo={wateringDetectorChosen}
                        handleClose={() => {
                            this.setState({infoDialogOpen: false, wateringDetectorChosen: null});
                        }}
                        doAction={doAction}
                    />
                    }
                    {heatingDetectorChosen &&
                    <HeaterInfoDialog
                        triggerUpdate={triggerType => this.setState({updateTrigger: triggerType})}
                        open={infoDialogOpen}
                        detectorInfo={heatingDetectorChosen}
                        handleClose={() => {
                            this.setState({infoDialogOpen: false, heatingDetectorChosen: null});
                        }}
                        doAction={doAction}
                    />
                    }
                    {iluminationDetectorChosen &&
                    <IlluminatorInfoDialog
                        triggerUpdate={triggerType => this.setState({updateTrigger: triggerType})}
                        open={infoDialogOpen}
                        detectorInfo={iluminationDetectorChosen}
                        handleClose={() => {
                            this.setState({infoDialogOpen: false, iluminationDetectorChosen: null});
                        }}
                        doAction={doAction}
                    />
                    }
                </List>
            </div>
        );
    }
}

NestedList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);

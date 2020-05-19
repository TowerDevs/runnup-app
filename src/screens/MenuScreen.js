import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
    Container, Content,
    List, ListItem,
    Left, Body, Right,
    Icon, Text
} from "native-base";

const Menu = ({ navigation }) => {
    return (
        <Container>
            <Content>
                <List>
                    <ListItem icon>
                        <Left>
                            <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
                                <Icon type="MaterialCommunityIcons" name="human-male-male" />
                            </TouchableOpacity>
                        </Left>
                        <Body>
                            <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
                                <Text>Friends</Text>
                            </TouchableOpacity>
                        </Body>
                        <Right>
                            <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
                                <Icon type="MaterialCommunityIcons" name="arrow-right"/>
                            </TouchableOpacity>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                                <Icon type="MaterialCommunityIcons" name="settings" />
                            </TouchableOpacity>
                        </Left>
                        <Body>
                            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                                <Text>Settings</Text>
                            </TouchableOpacity>
                        </Body>
                        <Right>
                            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                                <Icon type="MaterialCommunityIcons" name="arrow-right"/>
                            </TouchableOpacity>
                        </Right>
                    </ListItem>
                </List>
            </Content>
        </Container>
    );
};

Menu.propTypes = {
    navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({

});

export default Menu;
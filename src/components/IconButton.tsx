import React, { FC } from "react";
import { Button, Icon } from "native-base";

type Props = {
    name: string;
    onPress: () => void;
    buttonStyles: object;
    iconStyles: object;
};

const IconButton: FC<Props> = ({ name,  onPress, buttonStyles, iconStyles }) => {
    return (
        <Button style={buttonStyles} onPress={onPress}>
            <Icon
                style={iconStyles}
                name={name}
                type="MaterialCommunityIcons"
            />
        </Button>
    );
};

export default IconButton;
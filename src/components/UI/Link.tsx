import React, { FC } from "react";
import { Text, Theme } from "theme";
import { TextProps } from "@shopify/restyle";
import { Linking } from "react-native";

type LinkProps = TextProps<Theme> & {
  href: string;
  children: React.ReactNode;
};

const Link: FC<LinkProps> = ({ href, children, ...textProps }) => (
  <Text
    color="primaryCardText"
    onPress={() => Linking.openURL(href)}
    {...textProps}
  >
    {children}
  </Text>
);

export default Link;

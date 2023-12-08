import DisconnectButton from "components/UI/DisconnectButton";
import Link from "components/UI/Link";
import { APP_DESC, APP_NAME, AUTHOR_URL } from "constants/index";
import React, { FC } from "react";
import { Switch, TouchableOpacity } from "react-native";
import useThemeStore from "store/ThemeStore";
import { Box, Text } from "theme";
import { SettingsProp } from "types/navigation";

const Settings: FC<SettingsProp> = ({ navigation }) => {
  const { activeTheme, toggleTheme } = useThemeStore();

  return (
    <Box flex={1} backgroundColor="mainBackground" p="m" gap="m">
      <Box backgroundColor="primaryCardBackground" padding="s" borderRadius={8}>
        <Text variant="heading" py="s" color="primaryCardText">
          {APP_NAME}
        </Text>
        <Text py="s" color="primaryCardText" variant="body">
          {APP_DESC}
        </Text>
      </Box>
      <Box
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        backgroundColor="primaryCardBackground"
        padding="s"
        borderRadius={8}
      >
        <Text variant="heading" color="primaryCardText">
          Theme: {activeTheme}
        </Text>
        <Switch
          value={activeTheme === "dark"}
          onValueChange={() => {
            toggleTheme();
          }}
        />
      </Box>
      <Box backgroundColor="primaryCardBackground" padding="s" borderRadius={8}>
        <TouchableOpacity onPress={() => navigation.navigate("Debug")}>
          <Text color="primaryCardText" variant="heading">
            App Details
          </Text>
        </TouchableOpacity>
      </Box>
      <DisconnectButton />
      <Box
        position="absolute"
        bottom={25}
        left={0}
        right={0}
        alignItems="center"
      >
        <Box bg="mainBackground">
          <Text color="primaryCardText" fontSize={18}>
            Made By{" "}
            <Link href={AUTHOR_URL} color="accent">
              Vivek S
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;

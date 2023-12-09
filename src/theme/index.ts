import {createBox, createText, createTheme} from "@shopify/restyle";

export const palette = {
    white: "#FFFFFF",
    black: "#202124",
    darkGray: "gray",
    lightGray: "white",
    hotpink: "hotpink",
    blackBgPrimary: "rgba(0, 0, 0, 0.1)",
};

export const theme = createTheme({
    spacing: {
        s: 8,
        m: 16,
        l: 24,
        xl: 40,
        xxl: 80,
    },
    colors: {
        mainBackground: palette.white,
        primaryCardText: "black",
        secondaryCardText: palette.darkGray,
        accent: "hotpink",
        primaryCardBackground: palette.blackBgPrimary,
    },
    textVariants: {
        defaults: {},
        body: {
            fontSize: 16,
            lineHeight: 24,
            color: "primaryCardText",
        },
        heading: {
            fontSize: 28,
            lineHeight: 30,
            color: "primaryCardText",
        },
        subheading: {
            fontSize: 20,
            lineHeight: 28,
            color: "secondaryCardText",
        },
        buttonLabel: {
            fontSize: 16,
            lineHeight: 24,
            color: "primaryCardText",
        },
    },
    cardVariants: {
        defaults: {},
        primary: {
            backgroundColor: "primaryCardBackground",
            shadowOpacity: 0.3,
        },
        secondary: {
            backgroundColor: "secondaryCardBackground",
            shadowOpacity: 0.1,
        },
        inputVariants: {
            default: {
                borderWidth: 1,
                borderColor: "darkGray",
                borderRadius: "s",
                padding: "s",
                color: "primaryCardText",
            },
        },
    },
});

export type Theme = typeof theme;

export const darkTheme: Theme = {
    ...theme,
    colors: {
        ...theme.colors,
        mainBackground: palette.black,
        primaryCardText: "white",
        secondaryCardText: "#3C4043",

    },
};

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

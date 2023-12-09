import {NativeStackScreenProps} from "@react-navigation/native-stack";

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {
        }
    }
}

export type RootStackParamList = {
    ConnectWallet: undefined;
    SignInWithEth: undefined;
    Home: undefined;
    Settings: undefined;
    Debug: undefined;
    Feed: undefined;
    Wallet: undefined;
    CreateGroup: { participants: { name: string; walletAddress: string }[] };
    FeedHome: undefined;
    ViewGroup: undefined;
    AddParticipant: { participants: { name: string; walletAddress: string }[] };
    AddExpense: { participants: { name: string; walletAddress: string }[] };
    AddressBook: undefined;
    AddContact: { contactList: { name: string; walletAddress: string }[] };
};

export type FeedStackParamList = {
    FeedHome: undefined;
    CreateGroup: { participants: { name: string; walletAddress: string }[] };
    ViewGroup: undefined;
    AddParticipant: { participants: { name: string; walletAddress: string }[] };
    AddExpense: { participants: { name: string; walletAddress: string }[] };
};

export type ContactsStackParamList = {
    AddressBook: undefined;
    AddContact: { contactList: { name: string; walletAddress: string }[] };
};

// RootStackParamList
export type ConnectWalletProps = NativeStackScreenProps<
    RootStackParamList,
    "ConnectWallet"
>;
export type SignInWithEthProps = NativeStackScreenProps<
    RootStackParamList,
    "SignInWithEth"
>;
export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type DebugProps = NativeStackScreenProps<RootStackParamList, "Debug">;
export type SettingsProp = NativeStackScreenProps<
    RootStackParamList,
    "Settings"
>;

export type FeedProps = NativeStackScreenProps<RootStackParamList, "Feed">;
export type WalletProps = NativeStackScreenProps<RootStackParamList, "Wallet">;

// FeedStackParamList
export type CreateGroupProps = NativeStackScreenProps<
    FeedStackParamList,
    "CreateGroup"
>;
export type FeedHomeProps = NativeStackScreenProps<
    FeedStackParamList,
    "FeedHome"
>;
export type ViewGroupProps = NativeStackScreenProps<
    FeedStackParamList,
    "ViewGroup"
>;
export type AddParticipantProps = NativeStackScreenProps<
    FeedStackParamList,
    "AddParticipant"
>;
export type AddExpenseProps = NativeStackScreenProps<
    FeedStackParamList,
    "AddExpense"
>;

// ContactsStackParamList
export type AddressBookProps = NativeStackScreenProps<
    ContactsStackParamList,
    "AddressBook"
>;
export type AddContactProps = NativeStackScreenProps<
    ContactsStackParamList,
    "AddContact"
>;
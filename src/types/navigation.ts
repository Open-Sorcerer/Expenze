import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AddressBookEntry} from "lib/splitwiseHelper";
import {Group} from "types/common";

export type RootStackParamList = {
    ConnectWallet: undefined;
    SignInWithEth: undefined;
    Home: undefined;
    Settings: undefined;
    Debug: undefined;
    Feed: undefined;
    Wallet: undefined;
    CreateGroup: { participants: AddressBookEntry[] };
    FeedHome: undefined;
    ViewGroup: { group: Group };
    AddParticipant: { participants: AddressBookEntry[] };
    AddExpense: { participants: AddressBookEntry[], group: Group };
    AddressBook: undefined;
    AddContact: { contactList: AddressBookEntry[] };
};

export type FeedStackParamList = {
    FeedHome: undefined;
    CreateGroup: { participants: AddressBookEntry[] };
    ViewGroup: { group: Group };
    AddParticipant: { participants: AddressBookEntry[] };
    AddExpense: { participants: AddressBookEntry[], group: Group };
};

export type ContactsStackParamList = {
    AddressBook: undefined;
    AddContact: { contactList: AddressBookEntry[] };
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

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {
        }
    }
}
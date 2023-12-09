import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, RefreshControl} from "react-native";
import {Group} from "types/common";
import {Text} from "theme";
import GroupCard from "components/GroupCard";
import ErrorMessage from "./UI/ErrorMessage";

const GROUP_CARD_HEIGHT = 43;

async function fetchGroups() {
    return [
        {
            name: "Test Group",
            settledUp: false,
            asset: "USDT",
            transactions: []
        },
        {
            name: "Test Group 2",
            settledUp: true,
            asset: "USDT",
            transactions: []
        },
        {
            name: "Test Group 3",
            settledUp: false,
            asset: "USDT",
            transactions: []
        },
    ]
}

function RecentGroups() {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [groupState, setGroupState] = useState<
        {
            groups: Group[];
            error: string | null;
            loading: boolean
        }
    >({
        groups: [],
        error: null,
        loading: false,
    });

    const {groups, error, loading} = groupState;

    useEffect(() => {
        // Fetch groups when the component mounts
        fetchGroupsData();
    }, []);

    const fetchGroupsData = async () => {
        try {
            const fetchedGroups = await fetchGroups();
            setGroupState({
                groups: fetchedGroups,
                error: null,
                loading: false,
            });
        } catch (error) {
            setGroupState({
                groups: [],
                error: "Failed to load groups",
                loading: false,
            });
        }
    };

    if (error) {
        return <ErrorMessage message="Failed to load groups"/>;
    }
    if (loading) {
        return <ActivityIndicator size="small"/>;
    }

    const handleRefresh = async () => {
        try {
            setIsRefreshing(true);
            // const controller = new AbortController();

            await fetchGroups();
        } catch (error) {
        } finally {
            setIsRefreshing(false);
        }
    };

    const getItemLayout = (_: unknown, index: number) => ({
        length: GROUP_CARD_HEIGHT,
        offset: GROUP_CARD_HEIGHT * index,
        index,
    });
    const renderItem = ({item}: {
        item: Group
    }) => <GroupCard group={item}/>;

    const keyExtractor = (_: unknown, index: number) => index.toString();

    if (!groups.length) {
        return (
            <ErrorMessage
                message={`${
                    // error?.message || 
                    "Looks like you don't have any friend groups yet :("
                } `}
            />
        );
    }
    return (
        <FlatList
            data={groups}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>
            }
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<ListHeaderComponent/>}
        />
    );
}

function ListHeaderComponent() {
  return <Text variant="heading" color="primaryCardText">Your recent groups</Text>
}

export default RecentGroups;

import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, RefreshControl} from "react-native";
import {Group} from "types/common";
import {Text} from "theme";
import GroupCard from "components/GroupCard";
import ErrorMessage from "./UI/ErrorMessage";
import {getGroupDetails, getGroupsOfUser} from "lib/splitwiseHelper";
import useAppState from "store/AppStore";

const GROUP_CARD_HEIGHT = 43;

function ListHeaderComponent() {
    return <Text variant="heading" color="primaryCardText">Your recent groups</Text>
}

function RecentGroups() {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const {currentAddress} = useAppState();
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

    async function fetchGroups() {
        const groupIds = await getGroupsOfUser(currentAddress!);
        groups.splice(0);
        for (const groupId of groupIds) {
            const groupDetails = await getGroupDetails(groupId);
            console.log(groupDetails);
            groups.push(groupDetails);
        }
        return groups;
    }

    useEffect(() => {
        // Fetch groups when the component mounts
        fetchGroupsData();
        console.log("Groups", groups);
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


export default RecentGroups;

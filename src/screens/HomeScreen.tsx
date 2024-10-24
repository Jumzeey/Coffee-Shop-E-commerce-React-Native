import React, { useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, Text, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useStore } from '../store/store';
import { Coffee } from '../types';
import { getCategoriesFromData, getItemsByCategory, scrollToTop, filterCoffeeList } from '../utils';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { HeaderBar } from '../components';
import CustomIcons from '../components/CustomIcons';
import CoffeeCard from '../components/shared/Card';

const HomeScreen = ({navigation}: any) => {
    const CoffeeList = useStore((state) => state.coffeeList);
    const BeanList = useStore((state) => state.beanList);

    const [categories, setCategories] = useState<string[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Create a ref for the FlatList
    const coffeeFlatListRef = useRef<FlatList<Coffee>>(null);

    // Effect to update categories whenever CoffeeList changes
    useEffect(() => {
        setCategories(getCategoriesFromData(CoffeeList));
    }, [CoffeeList]);

    // Memoized filtered and sorted coffee list
    const filteredCoffee = useMemo(() => {
        const categoryFilteredCoffee = getItemsByCategory(CoffeeList, selectedCategory, 'name');
        return filterCoffeeList(categoryFilteredCoffee, searchText);
    }, [CoffeeList, selectedCategory, searchText]);

    // Effect to scroll FlatList to top when selectedCategory or searchText changes
    useEffect(() => {
        scrollToTop(coffeeFlatListRef);
    }, [filteredCoffee]);

    // Handle category select
    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
    };

    // Function to clear the search
    const clearSearch = () => {
        setSearchText('');
    };

    const tabBarHeight = useBottomTabBarHeight();

    return (
        <View style={styles.screenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewFlex}>
                {/* App header */}
                <HeaderBar />
                <Text style={styles.headingTitle}>
                    Find the best{'\n'}coffee for you
                </Text>

                {/* Search Bar */}
                <View style={styles.inputContainerComponent}>
                    <TouchableOpacity onPress={() => { }}>
                        <CustomIcons
                            style={styles.inputIcon}
                            name="search"
                            size={FONTSIZE.size_18}
                            color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}
                        />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Find your coffee..."
                        value={searchText}
                        onChangeText={text => setSearchText(text)}
                        placeholderTextColor={COLORS.primaryLightGreyHex}
                        style={styles.textInputContainer}
                    />
                    {searchText.length > 0 ? (
                        <TouchableOpacity onPress={clearSearch}>
                            <CustomIcons
                                style={styles.inputIcon}
                                name="close"
                                size={FONTSIZE.size_12}
                                color={COLORS.primaryLightGreyHex}
                            />
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                </View>

                {/* Category */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryScrollViewStyle}
                >
                    {categories.map((data, index) => (
                        <View key={index.toString()} style={styles.categoryScrollViewItem}>
                            <TouchableOpacity onPress={() => handleCategorySelect(data)} style={styles.categoryScrollViewItemText}>
                                <Text style={selectedCategory === data ? styles.selectedCategoryText : styles.categoryText}>
                                    {data}
                                </Text>
                                {selectedCategory === data && <View style={styles.selectedCategoryIndicator} />}
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                {/* Coffee FlatList */}
                <FlatList
                    ref={coffeeFlatListRef}
                    horizontal
                    ListEmptyComponent={
                        <View style={styles.emptyListContainer}>
                            <Text style={styles.categoryText}>Nothing found</Text>
                        </View>
                    }
                    showsHorizontalScrollIndicator={false}
                    data={filteredCoffee}
                    contentContainerStyle={styles.flatListContainer}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={ () => {
                                navigation.push('Details');
                            }}>
                                <CoffeeCard data={item} buttonPressHandler={() => { }} />
                            </TouchableOpacity>
                        );
                    }}
                    // FlatList optimizations
                    initialNumToRender={5}
                    windowSize={5}
                />

                {/* Bean FlatList */}
                <Text style={styles.coffeeBeansTitle}>Coffee Beans</Text>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={BeanList}
                    contentContainerStyle={[
                        styles.flatListContainer,
                        { marginBottom: tabBarHeight },
                    ]}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                navigation.push('Details');
                            }}>
                                <CoffeeCard data={item} buttonPressHandler={() => { }} />
                            </TouchableOpacity>
                        );
                    }}
                    // FlatList optimizations
                    initialNumToRender={5}
                    windowSize={5}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    scrollViewFlex: {
        flexGrow: 1,
    },
    headingTitle: {
        fontSize: FONTSIZE.size_28,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        paddingLeft: SPACING.space_30,
    },
    inputContainerComponent: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: SPACING.space_30,
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: COLORS.primaryDarkGreyHex,
    },
    inputIcon: {
        marginHorizontal: SPACING.space_20,
    },
    textInputContainer: {
        height: SPACING.space_20 * 3,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        flex: 1,
    },
    categoryScrollViewStyle: {
        paddingHorizontal: SPACING.space_20,
        marginBottom: SPACING.space_20,
    },
    categoryScrollViewItem: {
        paddingHorizontal: SPACING.space_15,
    },
    categoryScrollViewItemText: {
        alignItems: 'center',
    },
    selectedCategoryText: {
        color: COLORS.primaryOrangeHex,
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        marginBottom: SPACING.space_4,
    },
    categoryText: {
        color: COLORS.primaryLightGreyHex,
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        marginBottom: SPACING.space_4,
    },
    selectedCategoryIndicator: {
        height: SPACING.space_10,
        width: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_10,
        backgroundColor: COLORS.primaryOrangeHex,
    },
    flatListContainer: {
        gap: SPACING.space_20,
        paddingVertical: SPACING.space_20,
        paddingHorizontal: SPACING.space_30,
    },
    emptyListContainer: {
        width: Dimensions.get('window').width - SPACING.space_30 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.space_36 * 1.6,
    },
    coffeeBeansTitle: {
        fontSize: FONTSIZE.size_18,
        marginLeft: SPACING.space_30,
        marginTop: SPACING.space_20,
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
    },
});

export default HomeScreen;

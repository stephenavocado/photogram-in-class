import React from "react";
import { View, Text } from "react-native";
import SignIn from "../SignIn/SignIn";
import Feed from "../Feed/Feed";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Navigation() {
    const [user, setUser] = React.useState(null);

    async function saveUser(value) {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem("@user", jsonValue);
        } catch (e) {
          console.log("error storing user", e);
        }
    };

    async function loadUser() {
        try {
            const value = await AsyncStorage.getItem("@user");
            if (value !== null) {
                setUser(JSON.parse(value));
            }
        } catch (e) {
            console.log("error loading user", e);
        }
    };

    React.useEffect(() => {
        loadUser();
    }, []);

    React.useEffect(() => {
        saveUser(user);
    }, [user])

    return (
        <View>
            {user ? <Feed user={user} /> : <SignIn setUser={setUser} />}
        </View>
    )
}

export default Navigation;
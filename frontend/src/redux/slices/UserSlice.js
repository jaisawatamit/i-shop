const { createSlice } = require("@reduxjs/toolkit");

const UserSlice = createSlice({
    name: "user",
    initialState: {
        data: null,
        token: null,
        timestamp: null
    },
    reducers: {
        lsToUser(state) {
            if (typeof window !== "undefined") { // Ensure localStorage is accessible
                const userString = localStorage.getItem("user");
                if (userString && userString !== "undefined") { // Prevent JSON.parse(undefined)
                    const lsTimeStamp = localStorage.getItem("user_timestamp") || 0;
                    const now = new Date().getTime();
                    const diff = now - lsTimeStamp;

                    if (diff > Number(process.env.NEXT_PUBLIC_LOGIN_ALLOWED_TIME)) {
                        state.data = null;
                        localStorage.removeItem("user");
                        localStorage.removeItem("user_timestamp");
                    } else {
                        state.timestamp = lsTimeStamp;
                        state.data = JSON.parse(userString);
                    }
                }
            }
        },
        updateUserData(state, action) {
            state.data = action.payload.user;
            if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            }
        },
        login(state, action) {
            state.data = action.payload.user;
            state.timestamp = new Date().getTime();
        },
        logout(state) {
            state.data = null;
            state.timestamp = null;
            if (typeof window !== "undefined") {
                localStorage.removeItem("user");
                localStorage.removeItem("cart");
                localStorage.removeItem("user_timestamp");
            }
        }
    }
});

export const { login, logout, lsToUser, updateUserData } = UserSlice.actions;
export default UserSlice.reducer;

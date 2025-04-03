const { createSlice } = require("@reduxjs/toolkit");
const AdminSlice = createSlice(
    {
        name: "admin",
        initialState: {
            data: null,
            token: null,
            timestamp: null
        },
        reducers: {
            lsToAdmin(state){
                if(localStorage.getItem("admin")){
                     const lsTimeStamp = localStorage.getItem("admin_timestamp")
                     const now = new Date().getTime();
                        const diff = now - lsTimeStamp;
                        if(diff > Number(process.env.NEXT_PUBLIC_LOGIN_ALLOWED_TIME)){
                            state.data = null;
                            localStorage.removeItem("admin")
                            localStorage.removeItem("admin_timestamp");
                            return;
                        }
                           
                    state.timestamp= lsTimeStamp;
                    state.data = JSON.parse(localStorage.getItem("admin"))
                
                }
                     
            },
            updateAdminData(state, action){
                state.data = action.payload.admin;
                localStorage.setItem("admin", JSON.stringify(action.payload.admin));
            },
            adminlogin(state, action) {
                state.data = action.payload.admin;
                state.timestamp = new Date().getTime();
                // state.token = action.payload.token
            },
            adminlogout(state) {
                state.data = null;
                state.timestamp = null;
                localStorage.removeItem("admin");
                localStorage.removeItem("admin_timestamp");
                // state.token = null
            }
        }
    }
)

export const { adminlogin, adminlogout, lsToAdmin, updateAdminData } = AdminSlice.actions;

export default AdminSlice.reducer;
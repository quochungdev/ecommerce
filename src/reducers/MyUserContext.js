import cookie from "react-cookies";

const MyUserReducer = (currentState, action) => {
    // const userId = cookie.load("user") ? cookie.load("user").id : "nobody"
    switch (action.type) {
        case "login":
            return action.payload;
        case "logout":
            cookie.remove("token");
            cookie.remove("user");
            // localStorage.clear(`cart_${userId}`)
            return null;
    }
    return currentState;
}

export default MyUserReducer;
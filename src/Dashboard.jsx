import React, { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

function Dashboard() {
    //executes only once - on initial render =  componentDidMount
    useEffect(() => {
        document.title = "Dashboard - eCommerce";
    }, []);

    //get context
    let userContext = useContext(UserContext);
    console.log(userContext);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;

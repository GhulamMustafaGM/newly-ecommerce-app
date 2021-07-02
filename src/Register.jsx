import React, { useState, useEffect } from "react";

let Register = () => {
    let [state, setState] = useState({
        email: "",
        password: "",
        fullName: "",
        dateOfBirth: "",
        gender: "",
        country: "",
        receiveNewsLetters: "",
    });

    let [countries] = useState([
        { id: 1, countryName: "India" },
        { id: 2, countryName: "USA" },
        { id: 3, countryName: "UK" },
        { id: 4, countryName: "Japan" },
        { id: 5, countryName: "France" },
        { id: 6, countryName: "Brazil" },
        { id: 7, countryName: "Mexico" },
        { id: 8, countryName: "Canada" },
    ]);

    //executes only once - on initial render =  componentDidMount
    useEffect(() => {
        document.title = "Register - eCommerce";
    }, []);

    return (
        <div className="row">
            <div className="col-lg-6 col-md-7 mx-auto">
                <div className="card border-primary shadow my-2">
                    <div className="card-header border-bottom border-primary">
                        <h4
                            style={{ fontSize: "40px" }}
                            className="text-primary text-center"
                        >
                            Register
                        </h4>
                    </div>

                    <div className="card-body border-bottom">
                        {/* email starts */}
                        <div className="form-group form-row">
                            <label className="col-lg-4" htmlFor="email">
                                Email
                            </label>
                            <div className="col-lg-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    value={state.email}
                                    onChange={(event) => {
                                        setState({
                                            ...state,
                                            [event.target.name]: event.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        {/* email ends */}

                        {/* password starts */}
                        <div className="form-group form-row">
                            <label className="col-lg-4" htmlFor="password">
                                Password
                            </label>
                            <div className="col-lg-8">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    value={state.password}
                                    onChange={(event) => {
                                        setState({
                                            ...state,
                                            [event.target.name]: event.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        {/* password ends */}

                        {/* fullName starts */}
                        <div className="form-group form-row">
                            <label className="col-lg-4" htmlFor="fullName">
                                Full Name
                            </label>
                            <div className="col-lg-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    id="fullName"
                                    value={state.fullName}
                                    onChange={(event) => {
                                        setState({
                                            ...state,
                                            [event.target.name]: event.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        {/* fullName ends */}

                        {/* dateOfBirth starts */}
                        <div className="form-group form-row">
                            <label className="col-lg-4" htmlFor="dateOfBirth">
                                Date of Birth
                            </label>
                            <div className="col-lg-8">
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dateOfBirth"
                                    id="dateOfBirth"
                                    value={state.dateOfBirth}
                                    onChange={(event) => {
                                        setState({
                                            ...state,
                                            [event.target.name]: event.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        {/* dateOfBirth ends */}

                        {/* gender starts */}
                        <div className="form-group form-row">
                            <label className="col-lg-4">Gender</label>
                            <div className="col-lg-8">
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        id="male"
                                        className="form-check-input"
                                        checked={state.gender === "male" ? true : false}
                                        onChange={(event) => {
                                            setState({
                                                ...state,
                                                [event.target.name]: event.target.value,
                                            });
                                        }}
                                    />

                                    <label className="form-check-inline" htmlFor="male">
                                        Male
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        id="female"
                                        className="form-check-input"
                                        checked={state.gender === "female" ? true : false}
                                        onChange={(event) => {
                                            setState({
                                                ...state,
                                                [event.target.name]: event.target.value,
                                            });
                                        }}
                                    />

                                    <label className="form-check-inline" htmlFor="female">
                                        Female
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* gender ends */}

                        {/* country starts */}
                        <div className="form-group form-row">
                            <label className="col-lg-4" htmlFor="country">
                                Country
                            </label>
                            <div className="col-lg-8">
                                <select
                                    className="form-control"
                                    name="country"
                                    id="country"
                                    value={state.country}
                                    onChange={(event) => {
                                        setState({
                                            ...state,
                                            [event.target.name]: event.target.value,
                                        });
                                    }}
                                >
                                    {countries.map((country) => (
                                        <option key={country.id} value={country.id}>
                                            {country.countryName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* country ends */}

                        {/* receiveNewsLetters starts */}
                        <div className="form-group form-row">
                            <label className="col-lg-4"></label>
                            <div className="col-lg-8">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        name="receiveNewsLetters"
                                        value="true"
                                        id="receiveNewsLetters"
                                        className="form-check-input"
                                        checked={state.receiveNewsLetters === true ? true : false}
                                        onChange={(event) => {
                                            setState({
                                                ...state,
                                                [event.target.name]: event.target.checked,
                                            });
                                        }}
                                    />

                                    <label
                                        className="form-check-inline"
                                        htmlFor="receiveNewsLetters"
                                    >
                                        Receive News Letters
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* receiveNewsLetters ends */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

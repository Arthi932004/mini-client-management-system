import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import "./Dashboard.css";

const Dashboard = () => {


const { user, logout } = useAuth();

const navigate = useNavigate();

const [clients, setClients] = useState([]);

const [loading, setLoading] = useState(true);

const [error, setError] = useState("");


// FETCH CLIENTS FROM DATABASE
const fetchDashboardData = async () => {

    try {

        setLoading(true);

        const response = await API.get("/clients");

        setClients(response.data.clients || []);

    } catch (err) {

        setError(
            err.response?.data?.message ||
            "Unable to load dashboard data"
        );

    } finally {

        setLoading(false);

    }

};


useEffect(() => {

    fetchDashboardData();

}, []);


// CLIENT STATISTICS
const totalClients = clients.length;

const activeClients = clients.filter(
    client => client.status === "Active"
).length;

const inactiveClients = clients.filter(
    client => client.status === "Inactive"
).length;


// LOGOUT
const handleLogout = () => {

    logout();

    navigate("/login");

};


return (

    <div className="dashboard-layout">


        {/* SIDEBAR */}

        <aside className="dashboard-sidebar">

            <div className="dashboard-logo">
                ClientFlow
            </div>


            <nav className="dashboard-nav">

                <Link
                    to="/dashboard"
                    className="dashboard-nav-link active"
                >
                    <span>▦</span>
                    Dashboard
                </Link>


                <Link
                    to="/clients"
                    className="dashboard-nav-link"
                >
                    <span>👥</span>
                    Clients
                </Link>

            </nav>


            <div className="sidebar-bottom">

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    ↪ Logout
                </button>

            </div>

        </aside>


        {/* MAIN CONTENT */}

        <main className="dashboard-main">


            {/* TOP HEADER */}

            <header className="dashboard-header">

                <div>
                    <h1>Dashboard</h1>

                    <p>
                        Welcome back! Here's your business overview.
                    </p>
                </div>


                <div className="dashboard-user">

                    <div className="user-avatar">
                        {(user?.name || "A").charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h4>{user?.name || "Admin"}</h4>

                        <span>Administrator</span>
                    </div>

                </div>

            </header>


            {/* ERROR MESSAGE */}

            {error && (

                <div className="dashboard-error">
                    {error}
                </div>

            )}


            {/* STATISTICS CARDS */}

            <section className="dashboard-stats">


                <div className="dashboard-card">

                    <div className="card-top">
                        <span>Total Clients</span>
                        <div className="card-icon purple">👥</div>
                    </div>

                    <h2>
                        {loading ? "..." : totalClients}
                    </h2>

                    <p>All registered clients</p>

                </div>


                <div className="dashboard-card">

                    <div className="card-top">
                        <span>Active Clients</span>
                        <div className="card-icon green">✓</div>
                    </div>

                    <h2>
                        {loading ? "..." : activeClients}
                    </h2>

                    <p>Currently active clients</p>

                </div>


                <div className="dashboard-card">

                    <div className="card-top">
                        <span>Inactive Clients</span>
                        <div className="card-icon orange">◷</div>
                    </div>

                    <h2>
                        {loading ? "..." : inactiveClients}
                    </h2>

                    <p>Currently inactive clients</p>

                </div>


            </section>


            {/* RECENT CLIENTS */}

            <section className="recent-clients-section">


                <div className="recent-clients-header">

                    <div>
                        <h2>Recent Clients</h2>

                        <p>
                            Recently registered clients
                        </p>
                    </div>


                    <Link
                        to="/clients"
                        className="view-all-btn"
                    >
                        View All →
                    </Link>

                </div>


                {loading ? (

                    <p className="dashboard-loading">
                        Loading clients...
                    </p>

                ) : (

                    <div className="dashboard-table-wrapper">

                        <table className="dashboard-table">

                            <thead>

                                <tr>
                                    <th>Client Name</th>
                                    <th>Email</th>
                                    <th>Company</th>
                                    <th>Status</th>
                                    <th>Registered Date</th>
                                </tr>

                            </thead>


                            <tbody>

                                {clients.length > 0 ? (

                                    clients.slice(0, 5).map(client => (

                                        <tr key={client._id}>

                                            <td>
                                                <strong>
                                                    {client.name}
                                                </strong>
                                            </td>

                                            <td>
                                                {client.email}
                                            </td>

                                            <td>
                                                {client.company}
                                            </td>

                                            <td>

                                                <span className={
                                                    client.status === "Active"
                                                        ? "dashboard-status-active"
                                                        : "dashboard-status-inactive"
                                                }>
                                                    {client.status}
                                                </span>

                                            </td>

                                            <td>
                                                {new Date(
                                                    client.createdAt
                                                ).toLocaleDateString("en-IN")}
                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="dashboard-no-data"
                                        >
                                            No clients registered yet.
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </section>


            {/* QUICK ACTION */}

            <section className="quick-action-section">

                <div>

                    <h2>Manage Your Clients</h2>

                    <p>
                        Add new clients, update information and
                        manage your client records.
                    </p>

                </div>


                <Link
                    to="/clients"
                    className="quick-action-btn"
                >
                    Manage Clients →
                </Link>

            </section>


        </main>

    </div>

);


};

export default Dashboard;

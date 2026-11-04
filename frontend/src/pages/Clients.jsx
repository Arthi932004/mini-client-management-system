import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import "./Clients.css";

const Clients = () => {


const [clients, setClients] = useState([]);
const [search, setSearch] = useState("");

const [showForm, setShowForm] = useState(false);
const [editId, setEditId] = useState(null);

const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [error, setError] = useState("");

const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Active",
    address: "",
    notes: ""
});

// GET ALL CLIENTS
const fetchClients = async () => {
    try {
        setLoading(true);
        setError("");

        const response = await API.get("/clients");

        setClients(response.data.clients || []);

    } catch (err) {
        setError(
            err.response?.data?.message ||
            "Unable to fetch clients"
        );
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchClients();
}, []);

// SEARCH CLIENTS
const handleSearch = (value) => {
    setSearch(value);
};

// FILTER CLIENTS BY NAME, EMAIL OR COMPANY
// ✅ Compute ONCE, use many times
const keyword = search.toLowerCase().trim();

const filteredClients = clients.filter((client) => (
    client.name?.toLowerCase().includes(keyword) ||
    client.email?.toLowerCase().includes(keyword) ||
    client.company?.toLowerCase().includes(keyword)
));

// HANDLE INPUT
const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
        ...formData,
        [name]: value
    });
};

// OPEN ADD FORM
const openAddForm = () => {

    setEditId(null);

    setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "Active",
        address: "",
        notes: ""
    });

    setError("");
    setShowForm(true);
};

// OPEN EDIT FORM
const handleEdit = (client) => {

    setEditId(client._id);

    setFormData({
        name: client.name || "",
        email: client.email || "",
        phone: client.phone || "",
        company: client.company || "",
        status: client.status || "Active",
        address: client.address || "",
        notes: client.notes || ""
    });

    setError("");
    setShowForm(true);
};

// ADD OR UPDATE CLIENT
const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setMessage("");

    if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.phone.trim() ||
        !formData.company.trim()
    ) {
        setError("Please fill all required fields");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email)) {
        setError("Please enter a valid email address");
        return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
        setError("Phone number must contain 10 digits");
        return;
    }

    try {

        if (editId) {

            await API.put(
                `/clients/${editId}`,
                formData
            );

            setMessage("Client updated successfully!");

        } else {

            await API.post(
                "/clients",
                formData
            );

            setMessage("Client added successfully!");
        }

        setShowForm(false);
        setSearch("");

        setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            status: "Active",
            address: "",
            notes: ""
        });

        await fetchClients();

    } catch (err) {

        setError(
            err.response?.data?.message ||
            "Something went wrong"
        );

    }
};

// DELETE CLIENT
const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this client?"
    );

    if (!confirmDelete) return;

    try {

        await API.delete(`/clients/${id}`);

        setMessage("Client deleted successfully!");

        await fetchClients();

    } catch (err) {

        setError(
            err.response?.data?.message ||
            "Unable to delete client"
        );

    }
};

return (

    <div className="clients-layout">

        {/* SIDEBAR */}

        <aside className="clients-sidebar">

            <h2>ClientFlow</h2>

            <nav>

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/clients" className="active-link">
                    Clients
                </Link>

            </nav>

        </aside>


        {/* MAIN CONTENT */}

        <main className="clients-main">

            <div className="clients-header">

                <div>

                    <h1>Client Management</h1>

                    <p>
                        Manage and organize your clients
                    </p>

                </div>

                <button
                    className="add-client-btn"
                    onClick={openAddForm}
                >
                    + Add New Client
                </button>

            </div>


            {/* ALERTS */}

            {message && (

                <div className="success-message">

                    {message}

                    <button onClick={() => setMessage("")}>
                        ×
                    </button>

                </div>

            )}

            {error && (

                <div className="error-message">

                    {error}

                    <button onClick={() => setError("")}>
                        ×
                    </button>

                </div>

            )}


            {/* STATISTICS */}

            <div className="client-stats">

                <div className="stat-box">

                    <h3>Total Clients</h3>

                    <h1>{clients.length}</h1>

                </div>


                <div className="stat-box">

                    <h3>Active Clients</h3>

                    <h1>
                        {
                            clients.filter(
                                c => c.status === "Active"
                            ).length
                        }
                    </h1>

                </div>


                <div className="stat-box">

                    <h3>Inactive Clients</h3>

                    <h1>
                        {
                            clients.filter(
                                c => c.status === "Inactive"
                            ).length
                        }
                    </h1>

                </div>

            </div>


            {/* CLIENT TABLE */}

            <div className="client-table-section">

                <div className="table-header">

                    <h2>All Clients</h2>

                    <input
                        type="text"
                        placeholder="Search name, email or company..."
                        value={search}
                        onChange={(e) =>
                            handleSearch(e.target.value)
                        }
                    />

                </div>


                {loading ? (

                    <p className="loading-text">
                        Loading clients...
                    </p>

                ) : (

                    <div className="table-responsive">

                        <table>

                            <thead>

                                <tr>

                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Company</th>
                                    <th>Status</th>
                                    <th>Actions</th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredClients.length > 0 ? (

                                    filteredClients.map((client) => (

                                        <tr key={client._id}>

                                            <td>{client.name}</td>

                                            <td>{client.email}</td>

                                            <td>{client.phone}</td>

                                            <td>{client.company}</td>

                                            <td>

                                                <span
                                                    className={
                                                        client.status === "Active"
                                                            ? "status-active"
                                                            : "status-inactive"
                                                    }
                                                >
                                                    {client.status}
                                                </span>

                                            </td>

                                            <td>

                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        handleEdit(client)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDelete(client._id)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td colSpan="6" className="no-data">

                                            No clients found

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* ADD / EDIT FORM */}

            {showForm && (

                <div className="modal-overlay">

                    <div className="client-form-modal">

                        <div className="modal-header">

                            <h2>
                                {editId
                                    ? "Edit Client"
                                    : "Add New Client"}
                            </h2>

                            <button
                                onClick={() => setShowForm(false)}
                            >
                                ×
                            </button>

                        </div>


                        <form onSubmit={handleSubmit}>

                            <label>Client Name *</label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter client name"
                                required
                            />


                            <label>Email *</label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                            />


                            <label>Phone *</label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="10 digit phone number"
                                maxLength="10"
                                required
                            />


                            <label>Company *</label>

                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Enter company name"
                                required
                            />


                            <label>Status</label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >

                                <option value="Active">
                                    Active
                                </option>

                                <option value="Inactive">
                                    Inactive
                                </option>

                            </select>


                            <label>Address</label>

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                            />


                            <label>Notes</label>

                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Additional notes"
                            />


                            <div className="form-buttons">

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="save-btn"
                                >
                                    {editId
                                        ? "Update Client"
                                        : "Save Client"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </main>

    </div>

);


};

export default Clients;

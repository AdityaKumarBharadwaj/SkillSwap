import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Trash2, Clock, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [mySkills, setMySkills] = useState([]);
    const [requests, setRequests] = useState({ incoming: [], outgoing: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('user'))?.token;
                const config = { headers: { Authorization: `Bearer ${token}` } };

                const [profileRes, skillsRes, requestsRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/auth/profile', config),
                    axios.get('http://localhost:5000/api/skills', config),
                    axios.get('http://localhost:5000/api/skills/requests/me', config)
                ]);

                setProfile(profileRes.data);
                // Filter only my skills from all skills
                setMySkills(skillsRes.data.filter(s => s.user && s.user._id === profileRes.data._id));
                setRequests(requestsRes.data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load profile data");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfileData();
        }
    }, [user]);

    const handleDeleteSkill = async (id) => {
        if (!window.confirm("Are you sure you want to delete this skill?")) return;
        
        try {
            const token = JSON.parse(localStorage.getItem('user'))?.token;
            await axios.delete(`http://localhost:5000/api/skills/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMySkills(mySkills.filter(skill => skill._id !== id));
            toast.success("Skill deleted successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "Error deleting skill");
        }
    };

    const handleUpdateStatus = async (requestId, newStatus) => {
        try {
            const token = JSON.parse(localStorage.getItem('user'))?.token;
            await axios.put(`http://localhost:5000/api/skills/requests/${requestId}`, 
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            // Refresh requests
            const res = await axios.get('http://localhost:5000/api/skills/requests/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRequests(res.data);
            
            // If completed, refresh profile to get new time credits
            if (newStatus === 'completed') {
                const profileRes = await axios.get('http://localhost:5000/api/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(profileRes.data);
            }

            toast.success(`Request marked as ${newStatus}`);
        } catch (err) {
            toast.error(err.response?.data?.message || "Error updating request");
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
    if (!profile) return <div className="p-8 text-center text-gray-500">Please login to view profile.</div>;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
                <p className="text-gray-500 mb-6">{profile.email} • {profile.location}</p>
                <div className="flex gap-4">
                    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex items-center gap-3">
                        <Clock className="text-indigo-600" />
                        <div>
                            <div className="text-sm text-gray-500 font-medium">Time Credits</div>
                            <div className="text-xl font-bold text-gray-900">{profile.timeCredits} hrs</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Incoming Requests */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Incoming Requests</h2>
                    {requests.incoming.length === 0 ? (
                        <p className="text-gray-500 bg-gray-50 p-4 rounded-lg">No one has requested your skills yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {requests.incoming.map(req => (
                                <div key={req._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{req.skill?.title}</h3>
                                        <p className="text-sm text-gray-500">Requested by: <span className="font-semibold text-gray-700">{req.requester?.name}</span></p>
                                        <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full font-medium ${
                                            req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            req.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                                            req.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {req.status === 'pending' && (
                                            <>
                                                <button onClick={() => handleUpdateStatus(req._id, 'accepted')} className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition">Accept</button>
                                                <button onClick={() => handleUpdateStatus(req._id, 'rejected')} className="text-sm bg-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-200 transition">Reject</button>
                                            </>
                                        )}
                                        {req.status === 'accepted' && (
                                            <button onClick={() => handleUpdateStatus(req._id, 'completed')} className="text-sm bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition flex items-center gap-1">
                                                <CheckCircle size={14} /> Mark Completed
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Outgoing Requests */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">My Requests</h2>
                    {requests.outgoing.length === 0 ? (
                        <p className="text-gray-500 bg-gray-50 p-4 rounded-lg">You haven't requested any skills yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {requests.outgoing.map(req => (
                                <div key={req._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="font-bold text-gray-900">{req.skill?.title}</h3>
                                    <p className="text-sm text-gray-500">Provider: <span className="font-semibold text-gray-700">{req.provider?.name}</span></p>
                                    <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full font-medium ${
                                        req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        req.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                                        req.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        Status: {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* My Skills */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">My Offered Skills</h2>
                {mySkills.length === 0 ? (
                    <p className="text-gray-500 bg-gray-50 p-4 rounded-lg">You haven't listed any skills yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mySkills.map(skill => (
                            <div key={skill._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
                                <button 
                                    onClick={() => handleDeleteSkill(skill._id)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    title="Delete Skill"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <div className="text-xs font-semibold text-indigo-600 bg-indigo-50 inline-block px-2 py-1 rounded mb-3">{skill.category}</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{skill.title}</h3>
                                <p className="text-gray-600 text-sm">{skill.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Profile;

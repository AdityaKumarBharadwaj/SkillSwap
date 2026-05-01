import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const AddSkill = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: "", description: "", category: "Other", location: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;

            if (!token) {
                toast.error("You must be logged in.");
                setLoading(false);
                return;
            }

            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            await axios.post("http://localhost:5000/api/skills", formData, config);
            
            toast.success("Skill listed successfully!");
            navigate("/");

        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to list skill");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-transparent py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-indigo-300 opacity-20 blur-3xl"></div>
            
            <div className="max-w-2xl mx-auto relative z-10">
                <button onClick={() => navigate('/')} className="flex items-center text-gray-600 hover:text-indigo-600 mb-6 transition-colors font-medium">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Dashboard
                </button>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                >
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 opacity-10">
                            <Sparkles className="h-32 w-32 -mt-10 -mr-10" />
                        </div>
                        <h2 className="text-3xl font-extrabold relative z-10">Offer a Skill</h2>
                        <p className="text-indigo-100 font-medium text-lg mt-2 relative z-10">Share your talent and earn time credits.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Skill Title</label>
                            <input 
                                type="text" 
                                name="title" 
                                required 
                                placeholder="e.g. Basic Plumbing Fixes" 
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 outline-none transition-all placeholder-gray-400 text-gray-900 bg-gray-50 focus:bg-white" 
                                onChange={handleChange} 
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                            <div className="relative">
                                <select 
                                    name="category" 
                                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 outline-none transition-all text-gray-900 bg-gray-50 focus:bg-white appearance-none cursor-pointer" 
                                    onChange={handleChange}
                                >
                                    <option value="Other">Select a Category</option>
                                    <option value="Education">Education and Tutoring</option>
                                    <option value="Household">Household and Repairs</option>
                                    <option value="Tech">Tech Support</option>
                                    <option value="Art">Art and Creative</option>
                                    <option value="Sports">Sports</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                            <textarea 
                                name="description" 
                                required 
                                rows="4" 
                                placeholder="Describe what you can help with..." 
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 outline-none transition-all resize-none placeholder-gray-400 text-gray-900 bg-gray-50 focus:bg-white" 
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Location (Optional)</label>
                            <input 
                                type="text" 
                                name="location" 
                                placeholder="Leave blank to use your profile location" 
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 outline-none transition-all placeholder-gray-400 text-gray-900 bg-gray-50 focus:bg-white" 
                                onChange={handleChange} 
                            />
                        </div>
                        
                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={loading} 
                                className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 group"
                            >
                                {loading ? "Posting..." : "Post Skill to Community"}
                                {!loading && <CheckCircle className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default AddSkill;
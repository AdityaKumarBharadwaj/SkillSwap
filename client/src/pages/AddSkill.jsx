import { useState} from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { ArrowLeft, CheckCircle} from "lucide-react";

const AddSkill = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({title: "", description: "", category: "Other", location: ""});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // 1. Get the token from storage
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;

            if(!token) {
                setError("You must be logged in.");
                setLoading(false);
                return;
            }

            // 2. Send the request with the token in the header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // the secret handshake
                },
            };

            await axios.post("http://localhost:5000/api/skills", formData, config);
            
            // 3. Success then go back home
            navigate("/");

        }   catch(err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
            {/* Back Button */}
            <button onClick={ () => navigate('/')} className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to DashBoard
            </button>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-primary px-8 py-6">
                    <h2 className="text-2xl font-bold text-white">
                        Offer a Skill
                    </h2>
                    <p className="text-indigo-400 font-extrabold text-2xl mt-1">Share your talent with the neighbourhood.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6" action="">
                    {error && (
                        <div className="bg-red-50 p-4 rounded-lg text-sm border-l-4 border-red-500"> {error} </div>
                    )}

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input type="text" name="title" required placeholder="e.g. Basic Plumbing Fixes" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" onChange={handleChange}/>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select name="category" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:right-3 focus-primary outline-none bg-white" onChange={(handleChange)}>
                            <option value="Other">Select a Category</option>
                            <option value="Education">Education and Tutoring</option>
                            <option value="Household">Household and Repairs</option>
                            <option value="Tech">Tech Support</option>
                            <option value="Art">Art and Creative</option>
                            <option value="Sports">Sports</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="black text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea name="description" required rows="4" placeholder="Describe what you can help with...." className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none transition-all resize-none" id=""  onChange={handleChange}></textarea>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location (Optional)</label>
                            <input type="text" name="location" placeholder="Leave blank to use your profile location" className="w-full px-4 py-3 rounded-lg border bprder-gray-300 focus:ring-2 focus:ring-primary outline-none transition-all" onChange={handleChange}/>
                        </div>

                    <button type="submit" disabled={loading} className="w-full flex justify-center bg-blue-300 items-center bg-primary hover:bg-indigo-700 text-gray  hover:text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 disabled:opacity-50">
                        {loading ? "Posting...": "Post skill"}
                        {!loading && <CheckCircle className="ml-2 h-5 w-10" />}
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default AddSkill;
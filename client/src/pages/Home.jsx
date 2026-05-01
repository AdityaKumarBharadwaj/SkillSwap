import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Clock, MapPin, Search, PlusCircle, Star, User, Zap, Shield, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import heroVideo from "../assets/hero_bg-video.mp4";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestingId, setRequestingId] = useState(null);
  const navigate = useNavigate();

  // Fetch Skills
  const fetchSkills = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/skills");
      setSkills(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleRequestSkill = async (skillId) => {
    if (!user) {
      toast.error("Please login to request a skill");
      navigate("/login");
      return;
    }

    try {
      setRequestingId(skillId);
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      await axios.post(`http://localhost:5000/api/skills/${skillId}/request`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Skill requested successfully! Check your Profile.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to request skill");
    } finally {
      setRequestingId(null);
    }
  };

  // If not logged in, show the Premium Landing Page
  if (!user) {
    return (
      <div className="relative bg-gray-900 min-h-screen">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900"></div>
        </div>

        {/* Hero Section */}
        <div className="relative z-10 pt-14">
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl"
                >
                  Exchange Skills, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Build Community.</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="mt-6 text-lg leading-8 text-gray-300"
                >
                  The marketplace where time is the only currency. Teach what you love, learn what you need. Join thousands of neighbors exchanging value without spending a dime.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="mt-10 flex items-center justify-center gap-x-6"
                >
                  <Link to="/register" className="rounded-xl bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all shadow-indigo-500/30">
                    Join the Neighborhood
                  </Link>
                  <a href="#how-it-works" className="text-sm font-semibold leading-6 text-gray-300 flex items-center gap-1 group hover:text-white transition-colors">
                    Learn more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div id="how-it-works" className="py-24 sm:py-32 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Time is money</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to exchange skills</p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <Clock className="h-6 w-6" />
                    </div>
                    Earn Time Credits
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">For every hour you spend helping a neighbor, you earn one Time Credit. Everyone's time is valued equally.</p>
                  </dd>
                </div>
                <div className="flex flex-col bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <Search className="h-6 w-6" />
                    </div>
                    Find What You Need
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">Use your earned credits to get help with anything from plumbing and guitar lessons to tech support.</p>
                  </dd>
                </div>
                <div className="flex flex-col bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <Shield className="h-6 w-6" />
                    </div>
                    Safe & Secure
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">Our platform verifies users and facilitates a secure exchange system so you can swap skills with peace of mind.</p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LOGGED IN VIEW (DASHBOARD)
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      
      {/* --- SECTION 1: USER STATS --- */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Hello, {user.name}! 👋</h1>
        <p className="text-gray-500 mt-2">Here is what's happening in your neighborhood.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Credit Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200/50 transform hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Clock className="h-6 w-6" /></span>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Time Bank</span>
          </div>
          <div className="text-5xl font-black mb-1">{user.timeCredits} <span className="text-2xl font-medium text-indigo-100">hrs</span></div>
          <div className="text-indigo-100 text-sm font-medium">Available balance</div>
        </div>

        {/* Location Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-teal-50 text-teal-600 p-2 rounded-xl"><MapPin className="h-6 w-6" /></span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{user.location}</div>
          <div className="text-gray-500 text-sm">Current Neighborhood</div>
        </div>

        {/* Reputation Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-amber-50 text-amber-500 p-2 rounded-xl"><Star className="h-6 w-6" /></span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">Newcomer</div>
          <div className="text-gray-500 text-sm">Complete 1st swap to level up</div>
        </div>
      </div>

      {/* --- SECTION 2: ACTIONS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link to="/add-skill" className="flex items-center p-6 bg-white border border-gray-100 shadow-sm rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all group">
          <div className="bg-indigo-50 text-indigo-600 p-4 rounded-full group-hover:scale-110 transition-transform mr-6">
            <PlusCircle className="h-8 w-8" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-900">Offer a Skill</h3>
            <p className="text-sm text-gray-500">List what you can teach and earn credits</p>
          </div>
        </Link>

        <div className="flex items-center p-6 bg-white border border-gray-100 shadow-sm rounded-2xl hover:border-purple-300 hover:shadow-md transition-all group cursor-pointer">
          <div className="bg-purple-50 text-purple-600 p-4 rounded-full group-hover:scale-110 transition-transform mr-6">
            <Search className="h-8 w-8" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-900">Find Help</h3>
            <p className="text-sm text-gray-500">Browse below to request a neighbor's skill</p>
          </div>
        </div>
      </div>

      {/* --- SECTION 3: SKILLS FEED --- */}
      <div>
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Community Skills Feed</h2>
            <span className="text-sm text-gray-500 font-medium">{skills.length} available</span>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">No skills listed yet. Be the first!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <motion.div 
                whileHover={{ y: -4 }}
                key={skill._id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all flex flex-col"
              >
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase
                      ${skill.category === 'Education' ? 'bg-blue-50 text-blue-700' : 
                        skill.category === 'Household' ? 'bg-orange-50 text-orange-700' :
                        skill.category === 'Tech' ? 'bg-teal-50 text-teal-700' :
                        'bg-gray-100 text-gray-700'}`}>
                      {skill.category}
                    </span>
                    <span className="text-xs font-medium text-gray-400">
                      {new Date(skill.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{skill.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                    {skill.description}
                  </p>
                </div>
                
                <div className="p-6 pt-0 mt-auto border-t border-gray-50 bg-gray-50/50">
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-full shadow-sm border border-gray-100">
                        <User className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">
                           {skill.user ? skill.user.name : "Unknown"}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                           {skill.location}
                        </span>
                      </div>
                    </div>
                    <button 
                        onClick={() => handleRequestSkill(skill._id)}
                        disabled={requestingId === skill._id || (skill.user && skill.user._id === user._id)}
                        className={`text-sm font-bold px-4 py-2 rounded-lg transition-all shadow-sm ${
                            skill.user && skill.user._id === user._id 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md'
                        }`}
                    >
                      {requestingId === skill._id ? "..." : (skill.user && skill.user._id === user._id) ? "Yours" : "Request"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </motion.div>
  );
};
export default Home;
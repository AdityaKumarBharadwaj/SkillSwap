import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Clock, MapPin, Search, PlusCircle, Star, User } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "../assets/heroBg.png"
import axios from "axios";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Skills when the page loads
  useEffect(() => {
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

    fetchSkills();
  }, []);

  // If not logged in, show the Landing Page
  if (!user) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight [text-shadow:0_0_14px_rgba(255,255,255,.9)] [-webkit-text-stroke:1px_rgba(0,0,0,.4)] ">Exchange Skills, <span className="text-indigo-600">Build Community.</span></h1>

            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-medium">
              The marketplace where time is the only currency. Teach what you love, learn what you need.
            </p>
            <Link to="/register" className="bg-white text-black px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl hover:text-amber-50 shadow-indigo-200 inline-block">
              Join the Neighbourhood
            </Link>
        </div>
      </div>
    );
  }

  // LOGGED IN VIEW (DASHBOARD)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* --- SECTION 1: USER STATS --- */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hello, {user.name}! 👋</h1>
        <p className="text-gray-500">Here is what's happening in your neighborhood.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Credit Card */}
        <div className="bg-gradient from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-white/20 p-2 rounded-lg"><Clock className="h-6 w-6" /></span>
            <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded">Time Bank</span>
          </div>
          <div className="text-4xl font-bold mb-1">{user.timeCredits} hrs</div>
          <div className="text-indigo-100 text-sm">Available balance</div>
        </div>

        {/* Location Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-green-100 text-green-600 p-2 rounded-lg"><MapPin className="h-6 w-6" /></span>
          </div>
          <div className="text-xl font-bold text-gray-900 mb-1">{user.location}</div>
          <div className="text-gray-500 text-sm">Current Neighborhood</div>
        </div>

        {/* Reputation Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-yellow-100 text-yellow-600 p-2 rounded-lg"><Star className="h-6 w-6" /></span>
          </div>
          <div className="text-xl font-bold text-gray-900 mb-1">Newcomer</div>
          <div className="text-gray-500 text-sm">Complete 1st swap to level up</div>
        </div>
      </div>

      {/* --- SECTION 2: ACTIONS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link to="/add-skill" className="flex items-center justify-center gap-3 p-8 bg-white border-2 border-dashed border-gray-300 rounded-2xl hover:border-primary hover:bg-indigo-50 transition-all group">
          <div className="bg-indigo-100 text-primary p-3 rounded-full group-hover:scale-110 transition-transform">
            <PlusCircle className="h-8 w-8" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-900">Offer a Skill</h3>
            <p className="text-sm text-gray-500">List what you can teach</p>
          </div>
        </Link>

        <button className="flex items-center justify-center gap-3 p-8 bg-white border-2 border-dashed border-gray-300 rounded-2xl hover:border-secondary hover:bg-green-50 transition-all group">
          <div className="bg-green-100 text-secondary p-3 rounded-full group-hover:scale-110 transition-transform">
            <Search className="h-8 w-8" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-900">Find Help</h3>
            <p className="text-sm text-gray-500">Browse local listings</p>
          </div>
        </button>
      </div>

      {/* --- SECTION 3: SKILLS FEED --- */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Added Skills</h2>
        
        {loading ? (
          <p className="text-gray-500">Loading skills...</p>
        ) : skills.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No skills listed yet. Be the first!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div key={skill._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                      ${skill.category === 'Education' ? 'bg-blue-100 text-blue-800' : 
                        skill.category === 'Household' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {skill.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(skill.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{skill.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {skill.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-100 p-1.5 rounded-full">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-900">
                           {/* Handle case where user might be null (deleted) */}
                           {skill.user ? skill.user.name : "Unknown User"}
                        </span>
                        <span className="text-[10px] text-gray-500">
                           {skill.location}
                        </span>
                      </div>
                    </div>
                    <button className="text-primary text-sm font-semibold hover:underline">
                      Request
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
export default Home;
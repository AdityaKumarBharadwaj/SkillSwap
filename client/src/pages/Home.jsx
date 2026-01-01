import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Clock, MapPin, Search, PlusCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import HeroBg from "../assets/HeroBg.png"
// import userBg from "../assets/userBg.png"


const Home = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 bg-cover bg-center bg-no-repeat relative" style={{backgroundImage: `url(${HeroBg})`}}>
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-black mb-6">
          Exchange Skills, Build Community.
        </h1>
        <p className="text-xl text-black font-bold mb-25 text-shadow-2xs text-shadow-neutral-700 mb-8 max-w-2xl">
          The marketplace where time is the only currency. Teach what you love, learn what you need.
        </p>
        <Link to="/register" className="bg-white text-black px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl hover:text-amber-50 shadow-indigo-200">
          Join the Neighbourhood
        </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hello, {user.name}! 👋</h1>
        <p className="text-gray-500">Here is what's happening in your neighbourhood.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Credit Card */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-white/20 p-2 rounded-lg"><Clock className="h-6 w-6" /></span>
            <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded">Time Bank</span>
          </div>
          <div className="text-4xl font-bold mb-1">{user.timeCredits} hrs</div>
          <div className="text-indigo-100 text-sm">Available balance</div>
        </div>

        {/* Location Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm" >
          <div className="flex items-center justify-between mb-4">
            <span className="bg-green-100 text-green-600 p-2 rounded-lg"><MapPin className="h-6 w-6" /></span>
          </div>
          <div className="text-xl font-bold text-gray-900 mb-1">{user.location}</div>
          <div className="text-gray-500 text-sm">Current Neighbourhood</div>
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

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/add-skill" className="flex items-center justify-center gap-3 p-8 bg-white border-2 border-dashed border-gray-300 rounded-2xl hover:border-primary hover:bg-indigo-50 transition-all group">
          <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full group-hover:scale-110 transition-transform">
            <PlusCircle className="h-8 w-8" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-900">Offer a Skill</h3>
            <p className="text-sm text-gray-500">List what you can teach</p>
          </div>
        </Link>

        <button className="flex items-center justify-center gap-3 p-8 bg-white border-2 border-dashed border-gray-300 rounded-2xl hover:border-secondary hover:bg-green-50 transition-all group">
          <div className="bg-green-100 text-green-600 p-3 rounded-full group-hover:scale-110 transition-transform">
            <Search className="h-8 w-8" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-900">Find Help</h3>
            <p className="text-sm text-gray-500">Browse local listings</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Home;
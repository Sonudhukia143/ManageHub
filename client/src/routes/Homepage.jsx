export default function HomePage () {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Event Manager App</h1>
        <p className="text-lg text-gray-600 text-center mb-10">
          Organize, manage, and join events with ease.
        </p>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {features.map((feature, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl text-blue-500 mb-4">{feature.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h2>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const features = [
    {
      title: "Event Creation",
      description: "Easily create and manage events with a user-friendly interface.",
      icon: "📅",
    },
    {
      title: "Real-Time Updates",
      description: "Stay updated with instant notifications and live event changes.",
      icon: "⚡",
    },
    {
      title: "User Authentication",
      description: "Secure login for event participants.",
      icon: "🔒",
    },
    {
      title: "Event Analytics",
      description: "Track event attendance and engagement with insightful analytics.",
      icon: "📊",
    },
    {
      title: "Admin Data",
      description: "Upload and manage events securely.",
      icon: "👨",
    },
    {
      title: "Free Service",
      description: "Be event attendees and creator for free.",
      icon: "🆓",
    },
  ];
  

  
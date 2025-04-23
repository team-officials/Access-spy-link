import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landingpage = () => {
  const [accessCode, setAccessCode] = useState('');
  const [subscriptionCode, setSubscriptionCode] = useState('');
  const [error, setError] = useState('');
  const [phase, setPhase] = useState('access'); // 'access' | 'accessLoading' | 'subscription' | 'subscriptionLoading'
  const [loadingStep, setLoadingStep] = useState(0);
  const [dots, setDots] = useState('');
  const navigate = useNavigate();

  // Handle loading phases
  useEffect(() => {
    let timers = [];

    if (phase === 'accessLoading' && loadingStep < 4) {
      timers.push(setTimeout(() => setLoadingStep(loadingStep + 1), 4000));
    }

    if (phase === 'accessLoading' && loadingStep === 4) {
      setTimeout(() => {
        setPhase('subscription');
        setLoadingStep(0);
      }, 1000);
    }

    if (phase === 'subscriptionLoading' && loadingStep < 4) {
      timers.push(setTimeout(() => setLoadingStep(loadingStep + 1), 4000));
    }

    if (phase === 'subscriptionLoading' && loadingStep === 4) {
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    }

    // Animate dots
    if (phase.includes('Loading') && loadingStep === 3) {
      let dotCount = 0;
      const interval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        setDots('.'.repeat(dotCount));
      }, 500);
      timers.push(() => clearInterval(interval));
    }

    return () => timers.forEach(clearTimeout);
  }, [loadingStep, phase, navigate]);

  const handleAccessSubmit = () => {
    if (accessCode === 'WRNVYWR33') {
      setError('');
      setPhase('accessLoading');
      setLoadingStep(1);
    } else {
      setError('❌ ACCESS DENIED :: Invalid Access Code');
    }
  };

  const handleSubscriptionSubmit = () => {
    if (subscriptionCode === '00000') {
      setError('');
      setPhase('subscriptionLoading');
      setLoadingStep(1);
    } else {
      setError('❌ INVALID SUBSCRIPTION :: Try again');
    }
  };

  const LoaderButton = () => (
    <button
      disabled
      type="button"
      className="mt-2 text-green-400 bg-black border border-green-500 font-mono font-medium rounded text-sm px-4 py-2 text-center inline-flex items-center animate-pulse"
    >
      <svg
        aria-hidden="true"
        role="status"
        className="inline w-4 h-4 mr-3 text-green-400 animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591..."
          fill="currentColor"
        />
      </svg>
      Executing protocol...
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Navbar */}
      <nav className="bg-black border-b border-green-600 p-4 flex justify-between items-center shadow-md">
        <div className="text-green-500 text-xl tracking-wider font-bold">[ SYSTEM ACCESS ]</div>
        <ul className="flex space-x-6 text-green-400 text-sm">
          <li className="hover:text-green-300 cursor-pointer">Home</li>
          <li className="hover:text-green-300 cursor-pointer">Settings</li>
        </ul>
      </nav>

      {/* Page Content */}
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-3xl md:text-4xl mb-10 animate-pulse tracking-widest text-center">
          [ REMOTE AUTH PANEL ]
        </h1>

        {/* Error */}
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        {/* Access Code Phase */}
        {phase === 'access' && (
          <div className="w-full max-w-md">
            <p className="mb-2"> Enter Access Code:</p>
            <input
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="Access Code"
              className="w-full p-2 bg-black border border-green-400 text-green-300 rounded mb-4 placeholder-green-600 outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleAccessSubmit}
              className="w-full bg-green-700 text-black py-2 rounded hover:bg-green-500 transition-all"
            >
              ENGAGE
            </button>
          </div>
        )}

        {/* Access Code Loading Phase */}
        {phase === 'accessLoading' && (
          <div className="text-lg text-center space-y-4 mt-6">
            {loadingStep >= 1 && <><p>Initializing secure sequence...</p><LoaderButton /></>}
            {loadingStep >= 2 && <><p>Decrypting route protocol...</p><LoaderButton /></>}
            {loadingStep >= 3 && <><p>Data stream syncing{dots}</p><LoaderButton /></>}
            {loadingStep >= 4 && <><p>🧠 Finalizing access level...</p><LoaderButton /></>}
          </div>
        )}

        {/* Subscription Phase */}
        {phase === 'subscription' && (
          <div className="w-full max-w-md mt-6">
            <p className="mb-2"> Enter Subscription Code:</p>
            <input
              type="text"
              value={subscriptionCode}
              onChange={(e) => setSubscriptionCode(e.target.value)}
              placeholder="Subscription Code"
              className="w-full p-2 bg-black border border-green-400 text-green-300 rounded mb-4 placeholder-green-600 outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSubscriptionSubmit}
              className="w-full bg-green-700 text-black py-2 rounded hover:bg-green-500 transition-all"
            >
              VERIFY
            </button>
          </div>
        )}

        {/* Subscription Loading Phase */}
        {phase === 'subscriptionLoading' && (
          <div className="text-lg text-center space-y-4 mt-6">
            {loadingStep >= 1 && <><p>Verifying subscription level...</p><LoaderButton /></>}
            {loadingStep >= 2 && <><p>Activating secure tunnel...</p><LoaderButton /></>}
            {loadingStep >= 3 && <><p>Routing to dashboard{dots}</p><LoaderButton /></>}
            {loadingStep >= 4 && <><p>🔐 Access granted. Proceeding...</p><LoaderButton /></>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Landingpage;

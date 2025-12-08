const Login = () => {
  const handleLogin = async () => {
    window.location.href = `http://localhost:3000/auth/google`;
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-lg! bg-white flex flex-col items-center justify-center py-16! gap-8 rounded-2xl! z-5! brand-border-glow ">
        <h2 className="text-black!">Login to your account</h2>
        <button className="login-btn py-4! px-12!" onClick={handleLogin}>
          <img src="/login-icons/google.png" alt="Google icon" className="w-8" />
          <p className="text-base! primary-font">Login with Google</p>
        </button>
      </div>
      <div className="glow-blur z-0! absolute top-30!"></div>
    </div>
  );
};

export default Login;

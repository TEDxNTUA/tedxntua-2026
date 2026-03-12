export default function CVSpacePage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-zinc-50 to-white">
      {/* Hero Section with Red Accent */}
      <div className="bg-black text-white py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
            Grab the opportunity with our <a href="/sponsors" className="sponsors-glow text-yellow-500 hover:text-yellow-400 transition-all duration-300 relative inline-block hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(234,179,8,0.6)] cursor-pointer">sponsors</a>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 font-semibold">
            You knew they look for talented people like you, right?
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Quiz Info Area */}
          <div className="mb-8 sm:mb-10 p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight">What you stand to benefit from answering the quiz below ... <br />(GIVEAWAY)</h2>
            <p className="text-gray-800 leading-relaxed text-base sm:text-lg font-bold">
              Explanation
            </p>
          </div>

          {/* Form Container - Centered */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <div className="w-full max-w-4xl">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[0_14px_45px_rgba(15,23,42,0.12)]">
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
                  <p className="text-sm sm:text-base text-gray-900 font-bold">Complete the form below</p>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Use a larger screen for maximum comfort, but mobile works great too.</p>
                </div>
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSe212V2ZNZPcbqEaAZr9xkH6iUg2DKSsCvg6CN3dGS6PtyzDg/viewform?usp=sharing&ouid=117413346945189617837&embedded=true"
                  className="block w-full h-[1180px] sm:h-[1050px] lg:h-[920px]"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  loading="lazy"
                  title="TEDxNTUA Giveaway Google Form"
                >
                  Loading...
                </iframe>
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white border-t border-gray-200 text-center">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSe212V2ZNZPcbqEaAZr9xkH6iUg2DKSsCvg6CN3dGS6PtyzDg/viewform?usp=sharing&ouid=117413346945189617837"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base font-bold text-gray-900 hover:text-red-600 transition-colors duration-200"
                  >
                    Form not loading? Open it in a new tab.
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center text-gray-600 text-sm sm:text-base font-semibold">
            <p>Thank you for this submission !!!</p>
          </div>
        </div>
      </div>
    </section>
  );
}

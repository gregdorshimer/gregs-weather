import './globals.css'

export const metadata = {
  title: "Greg's Weather",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Layout({children}) {
    return (
        <html lang="en">
            <body>
                <header className="bg-gray-800">
                    <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-3 gap-96">

                        <div className="text-lg font-semibold text-white">
                            Greg's Weather
                        </div>

                        <nav className="flex items-center gap-6 text-sm text-gray-200">

                            <a
                                href="http://gregdorshimer.com"
                                className="hover:text-white"
                                aria-label="National Weather Service"
                            >
                                gregdorshimer.com
                            </a>

                            <a
                                href="http://github.com/gregdorshimer/gregs-weather"
                                className="flex items-center gap-1 text-sm text-gray-200 hover:text-white"
                                aria-label="GitHub"
                            >
                                <span>GitHub</span>
                                <img
                                    src="/github-mark-white.svg" // public folder
                                    alt="GitHub logo"
                                    className="h-5 w-5"
                                />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/greg-dorshimer-249456a3/"
                                className="flex items-center gap-1 text-sm text-gray-200 hover:text-white"
                                aria-label="LinkedIn"
                            >
                                <span>LinkedIn</span>
                                <img
                                    src="/linkedin-white.png" // public folder
                                    alt="LinkedIn logo"
                                    className="h-5 w-5"
                                />
                            </a>
                        </nav>
                    </div>
                </header>

                {children}

            </body>
        </html>
    );
}
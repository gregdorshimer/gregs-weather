import "bootstrap/dist/css/bootstrap.min.css";

export default function WeatherLayout({ children}) {
    return (
        <>
            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand">Greg's Weather</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="navbar-nav me-auto mb-2 mb-lg-0">
                            <a className="nav-item nav-link active" aria-current="page" href="/">Home</a>
                            {/* <li className="nav-item dropdown">
                                <a className="nav-link active dropdown-toggle" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                    Apps
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="http://gregdorshimer.com/sudoku">Sudoku</a></li>
                                    <li><a className="dropdown-item" href="/">Weather</a></li>
                                </ul>
                            </li> */}
                            {/* <a className="nav-item nav-link active" href="https://github.com/gregdorshimer">GitHub <img width="16"
                                                                                                            height="16"
                                                                                                            src="{% static 'img/github-mark-white.png' %}" /></a>
                            <a className="nav-item nav-link active" href="https://www.linkedin.com/in/greg-dorshimer-249456a3/">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </nav> */}
            {children}
        </>
    );
}
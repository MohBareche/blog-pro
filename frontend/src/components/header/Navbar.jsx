const Navbar = ({ toggle, setToggle }) => {
  return (
    <nav
      style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%" }}
      className="navbar"
    >
      <ul className="nav-links">
        <li onClick={() => setToggle(false)} className="nav-link">
          <i className="bi bi-house">Home</i>
        </li>
        <li onClick={() => setToggle(false)} className="nav-link">
          <i className="bi bi-stickies">Posts</i>
        </li>
        <li onClick={() => setToggle(false)} className="nav-link">
          <i className="bi bi-journal-plus">Create</i>
        </li>
        <li onClick={() => setToggle(false)} className="nav-link">
          <i className="bi bi-person-check">Admin Dashboard</i>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

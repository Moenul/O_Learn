import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <>
            <div className="w-48 h-fit p-2 grid gap-2  text-slate-700 underline border">
                <Link to="/dashboard">Enrolled Courses</Link>
                <Link to="/dashboard/manage-profile">Manage Profile</Link>
            </div>
        </>
    );
};

export default Sidebar;

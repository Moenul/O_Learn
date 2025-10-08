import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <>
            <div className="w-56 p-2 h-auto text-slate-700 border">
                <ul className="space-y-2">
                    <Link to="/dashboard" className=" block">
                        <li className="px-2 py-2 bg-sky-200 text-nowrap">
                            Enrolled Courses
                        </li>
                    </Link>
                    <Link to="/dashboard/manage-profile" className=" block">
                        <li className="px-2 py-2  bg-sky-200 text-nowrap">
                            Manage Profile
                        </li>
                    </Link>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;

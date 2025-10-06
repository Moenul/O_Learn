import Navbar from "../../../components/layout/Navbar";
import Sidebar from "../../../components/layout/Sidebar";

const Profile = () => {
    return (
        <>
            <Navbar />
            <div className="px-4 py-4 pt-16 max-w-6xl mx-auto flex gap-2">
                <Sidebar />
                <section className="w-full min-h-dvh">
                    <h1>Manage Profile</h1>
                </section>
            </div>
        </>
    );
};

export default Profile;

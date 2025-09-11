import { useParams } from "react-router-dom";

const Course = () => {
    const { id } = useParams();

    return (
        <>
            <h1>Course Id: {id}</h1>
        </>
    );
};

export default Course;

import { useSelector, useDispatch } from "react-redux";
import {
    increment,
    decrement,
    reset,
    incrementByAmount,
} from "../redux/slices/counterSlice";
import { useState } from "react";

const Home = () => {
    const [selectedAmount, setSelectedAmount] = useState(3);

    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <>
            <h1>Home</h1>
            <div className="w-lg h-[400px] p-4 border bg-sky-50 mx-auto">
                <div className="w-full flex gap-2 justify-center">
                    <button
                        onClick={() => {
                            dispatch(increment());
                        }}
                    >
                        Increment
                    </button>
                    <div className="w-1/2 text-center">{count}</div>
                    <button
                        onClick={() => {
                            dispatch(decrement());
                        }}
                    >
                        Decrement
                    </button>
                </div>
                <div className="w-full flex gap-2 justify-between">
                    <button
                        onClick={() => {
                            dispatch(reset());
                        }}
                    >
                        Reset
                    </button>
                    <div className="flex">
                        <select
                            name="amount"
                            value={selectedAmount}
                            onChange={(e) =>
                                setSelectedAmount(Number(e.target.value))
                            }
                        >
                            {Array.from({ length: 6 }, (_, i) => (
                                <option key={i} value={i}>
                                    {i}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={() => {
                                dispatch(incrementByAmount(selectedAmount));
                            }}
                        >
                            incrementByAmount
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;

import { React, useEffect, useState } from "react";

import Api from "../../../Api/Endpoints";
import RecordCard from "../../../Components/Record/Card";
import { Link } from "react-router-dom";

export default function LastRecords({ activeAccount }) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        async function getLastRecords() {
            const data = await Api.getLastRecords(5, activeAccount);
            setData(data);
            setIsLoading(false);
        }
        getLastRecords();
    }, [activeAccount]);

    if (isLoading) {
        return <></>;
    }

    const account_id = activeAccount ?? "";

    return (
        <div>
            <div className="flex flex-col divide-y divide-gray-600/50 bg-gray-800 rounded p-px">
                {data.map((record, index) => {
                    return (
                        <div key={index}>
                            <RecordCard record={record} />
                        </div>
                    );
                })}
                <div className="px-5 py-3">
                    <Link to={`/record/list/${account_id}`}>
                        <div className="w-fit m-0 text-indigo-300 font-bold">
                            VER MAS
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
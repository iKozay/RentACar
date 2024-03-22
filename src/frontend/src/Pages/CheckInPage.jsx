import React, { useState } from "react";
import RentalAgreement from "../components/checkIn/RentalAgreement";
import ClientInfo from "../components/checkIn/ClientInfo";
import MakeDeposit from "../components/checkIn/MakeDeposit"

export default function CheckInPage() {
  const [page, setPage] = useState(0);

  const CheckInTitles = ["Information", "Rental Agreement", "Make Deposit"];

  const PageDisplay = () => {
    if (page === 0) {
      return <ClientInfo />;
    } else if (page === 1) {
      return <RentalAgreement />;
    } else {
      return <MakeDeposit />;
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-screen-lg">
      {/* Progress Bar */}
      <div className="w-full bg-white mx-auto mt-10">
        <div className="h-4 bg-gray-200">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${(page + 1) * (100 / CheckInTitles.length)}%` }}
          ></div>
        </div>
      </div>
      <div className="form-container bg-white rounded-lg shadow-lg p-6 mt-6">
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold">{CheckInTitles[page]}</h1>
        </div>
        <div className="body">{PageDisplay()}</div>
        <div className="footer mt-4 flex justify-between">
          <button
            className={`py-2 px-4 rounded ${
              page === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={page === 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}>
            Prev
          </button>
          <button
            className={`py-2 px-4 rounded ${
              page === CheckInTitles.length - 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-indigo-300 cursor-not-allowed"
            }`}
            onClick={() => {
              if (page === CheckInTitles.length - 1) {
                alert("Success!");
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}>
            {page === CheckInTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
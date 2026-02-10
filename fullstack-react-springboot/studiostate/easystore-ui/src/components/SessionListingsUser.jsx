import React, { useState, useMemo } from "react";
import SessionCardUser from "./SessionCardUser";
import Dropdown from "./Dropdown";
import SearchBox from "./SearchBox";

const sortList = ["All", "1 Days"];

export default function ({ sessions }) {
  const [searchText, setSearchText] = useState("");
  const [selectedSort, setSelectedSort] = useState("All");

  const filteredAndSortedSessions = useMemo(() => {
    if (!Array.isArray(sessions)) {
      return [];
    }
    //this filter intentionally doesn't do anything
    let filteredSessions = sessions.filter(
      (session) => session.passId === Number(searchText),
    );

    return selectedSort === "All"
      ? filteredSessions
      : filteredSessions
          .slice()
          .filter((session) => checkDate(session.serverStartTime, 1));
  }, [sessions, searchText, selectedSort]);

  function checkDate(dateToCheck, rangeInDays) {
    var today = new Date();
    var sessionDate = new Date(dateToCheck);
    const diffInMs = today.getTime() - sessionDate.getTime();
    return diffInMs / (1000 * 60 * 60 * 24) < rangeInDays;
  }

  function handleSearchChange(inputSearch) {
    setSearchText(inputSearch);
  }

  function handleSortChange(sortType) {
    setSelectedSort(sortType);
  }
  return (
    <div className="max-w-[1152px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12">
        <SearchBox
          label="Search PassID (12039843)"
          placeholder="Search PassIDs..."
          value={searchText}
          handleSearch={(value) => handleSearchChange(value)}
        />
        <Dropdown
          label="Select Time Range"
          options={sortList}
          value={selectedSort}
          handleSort={(value) => handleSortChange(value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
        {filteredAndSortedSessions.length > 0 ? (
          filteredAndSortedSessions.map((session) => (
            <SessionCardUser key={session.sessionId} session={session} />
          ))
        ) : (
          <p className="text-center font-primary font-bold text-lg text-primary">
            No sessions found
          </p>
        )}
      </div>
    </div>
  );
}

import React from "react";
import { useState } from "react";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import VisitorModal from "../components/VisitorModal";

const Visitors = () => {
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const visitors = [
    { name: "Ali", mobile: "12345", country: "Austria" },
    { name: "Rahim", mobile: "56789", country: "Germany" },
  ];

  return (
    <div>

      <Table
        columns={["Name", "Mobile", "Country"]}
        data={visitors}
        onDetailsClick={setSelectedVisitor}
      />

      <Pagination />

      {selectedVisitor && (
        <VisitorModal
          visitor={selectedVisitor}
          onClose={() => setSelectedVisitor(null)}
        />
      )}

    </div>
  );
};

export default Visitors;
import React from "react";
import Table from "../components/Table";

const Clients = () => {

  const clients = [
    { name: "Jahid", mobile: "22222", country: "Poland" },
    { name: "Kamal", mobile: "33333", country: "Portugal" },
  ];

  return (
    <div>
      <Table
        columns={["Name", "Mobile", "Country"]}
        data={clients}
      />
    </div>
  );
};

export default Clients;
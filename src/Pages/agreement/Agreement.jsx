import React, { useState } from "react";

const fields = [
  ["date", "DATE", "date"],
  ["clientName", "NAME OF CLIENT", "text"],
  ["phone", "PHONE NUMBER", "text"],
  ["email", "EMAIL ADDRESS", "email"],
  ["passportNo", "PASSPORT NO", "text"],
  ["qidNo", "QID NO", "text"],
  ["documentCountry", "DOCUMENT FOR COUNTRY", "text"],
  ["documentRefNo", "DOCUMENT REF NUMBER", "text"],
  ["visaType", "Visa type", "text"],
  ["totalFees", "Total fees", "text"],
  ["firstInstallment", "1st Installment", "text"],
  ["secondInstallment", "2nd Installment", "text"],
  ["thirdInstallment", "3rd Installment", "text"],
];

const initialForm = {
  date: "",
  clientName: "",
  phone: "+974 ",
  email: "N/A",
  passportNo: "",
  qidNo: "",
  documentCountry: "",
  documentRefNo: "",
  visaType: "",
  totalFees: "",
  firstInstallment: "",
  secondInstallment: "",
  thirdInstallment: "",
};

export default function Agreement() {
  const [form, setForm] = useState(initialForm);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const RedInput = ({ name, type = "text", placeholder = "" }) => (
    <input
      name={name}
      type={type}
      value={form[name]}
      onChange={update}
      placeholder={placeholder}
      className="w-full border-0 bg-transparent font-semibold text-red-600 outline-none placeholder:text-red-300"
    />
  );

  return (
    <main className="min-h-screen bg-gray-200 p-4 text-black">
      <div className="mx-auto max-w-[900px] bg-white p-8 shadow-lg print:shadow-none">
        <h1 className="mb-8 text-center text-xl font-bold uppercase">
          RETAINER SERVICE AGREEMENT
        </h1>

        <p className="mb-4">
          This agreement is made and entered into on the following date by and between:
        </p>

        <table className="mb-6 w-full border border-black text-sm">
          <tbody>
            {fields.slice(0, 8).map(([name, label, type]) => (
              <tr key={name} className="border border-black">
                <td className="w-1/3 border border-black p-2 font-bold">
                  {label}
                </td>
                <td className="border border-black p-2">
                  {name === "documentCountry" ? (
                    <span>
                      Prepare Documentation for{" "}
                      <RedInput name={name} type={type} />
                    </span>
                  ) : (
                    <RedInput name={name} type={type} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mb-4">
          Hereinafter referred to as the <b>"Client."</b>
        </p>

        <p className="mb-4">
          and World Multinational Immigration & Business Consultancy, a company
          established in Doha, Qatar, hereinafter referred to as the <b>"FIRM."</b>
        </p>

        <p className="mb-4">
          Whereas the Client hereby retains the services of the Firm for the purpose
          of receiving professional services with respect to the preparation and
          submission of his{" "}
          <span className="inline-block min-w-40 border-b border-red-500">
            <RedInput name="visaType" />
          </span>{" "}
          visa application consultancy service only on behalf of the applicant, and
          World Multinational Immigration & Business Consultancy hereby accepts such
          mandate.
        </p>

        <h2 className="mt-6 font-bold">1. Scope of Services and Firm Responsibilities:</h2>
        <p className="mt-2 text-sm leading-7">
          1.1 The Firm shall provide visa application consultancy and document
          preparation assistance only in accordance with the latest requirements of
          the relevant immigration authorities.
        </p>
        <p className="text-sm leading-7">
          1.2 The Firm’s services include reviewing documents, guiding the Client,
          interview guidance where applicable, appointment scheduling where permitted,
          monitoring application status and providing updates when available.
        </p>

        <h2 className="mt-6 font-bold">2. Client Responsibilities:</h2>
        <p className="mt-2 text-sm leading-7">
          The Client shall provide accurate, truthful and complete information and
          documents within the required timeframes and comply with all instructions
          related to visa processing and travel.
        </p>

        <h2 className="mt-6 font-bold">3. Payment Terms & Conditions:</h2>
        <p className="mt-2">
          3.1 In consideration for the above-mentioned services, the Client agrees to
          pay the Firm the sum of{" "}
          <span className="inline-block min-w-24 border-b border-red-500">
            <RedInput name="totalFees" />
          </span>{" "}
          QAR.
        </p>

        <table className="mt-4 w-full border border-black text-sm">
          <thead>
            <tr>
              <th className="border border-black p-2 text-left">
                Installment Payment
              </th>
              <th className="border border-black p-2 text-left">Fees</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-2">
                1st Installment - on contract Signing
              </td>
              <td className="border border-black p-2">
                <RedInput name="firstInstallment" /> QAR
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2">
                2nd Installment - upon receiving the documents
                <br />
                (within 5 days upon receiving a soft copy)
              </td>
              <td className="border border-black p-2">
                <RedInput name="secondInstallment" /> QAR
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2">
                3rd Installment - upon completion of the service (within 3 days)
              </td>
              <td className="border border-black p-2">
                <RedInput name="thirdInstallment" /> QAR
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-bold">
                Total Service Fees:
              </td>
              <td className="border border-black p-2 font-bold">
                <RedInput name="totalFees" /> QAR
              </td>
            </tr>
          </tbody>
        </table>

        <p className="mt-4 text-sm leading-7">
          3.3 The total amount quoted under this Agreement covers professional
          consultancy and application assistance services only. It does not include
          government fees, embassy fees, consular fees, medical, insurance, ticket,
          police clearance, courier, translation, or any third-party charges.
        </p>

        <h2 className="mt-6 font-bold">4. Service Termination, Cancellation & Refund Policy:</h2>
        <p className="mt-2 text-sm leading-7">
          All professional fees paid to the Firm are consideration for immigration
          and visa consultancy services, including consultation, eligibility
          assessment, document preparation, application coordination, submission
          support, and liaison assistance with relevant authorities.
        </p>

        <h2 className="mt-6 font-bold">5. Confidentiality:</h2>
        <p className="mt-2 text-sm leading-7">
          Both parties shall keep confidential all information, documents, data,
          personal information, and financial arrangements disclosed under this
          Agreement, except where disclosure is required by law or immigration
          authorities.
        </p>

        <h2 className="mt-6 font-bold">6. Term and Termination:</h2>
        <p className="mt-2 text-sm leading-7">
          This Agreement becomes effective on the Effective Date and remains valid
          until the completion of the processing file or until the contract expiry
          date.
        </p>

        <h2 className="mt-6 font-bold">7. Governing Law and Dispute Resolution:</h2>
        <p className="mt-2 text-sm leading-7">
          This Agreement shall be governed by and construed in accordance with the
          laws of the State of Qatar.
        </p>

        <h2 className="mt-6 font-bold">8. Limitation of Liability Clause:</h2>
        <p className="mt-2 text-sm leading-7">
          The Firm’s total liability, if any, arising out of or related to this
          Agreement shall be strictly limited to the amount of professional fees
          actually paid by the Client to the Firm.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-8 text-sm">
          <div>
            <h3 className="font-bold">CLIENT</h3>
            <p>Client Name: ________________________</p>
            <p className="mt-4">Date: ________________________</p>
            <p className="mt-4">
              Signing Person/Authorized Representative on behalf of a client:
            </p>
            <p className="mt-6">……………………………...</p>
            <p>QID: ________________________</p>
            <p className="mt-6">Signature: ________________________</p>
          </div>

          <div>
            <h3 className="font-bold">FIRM</h3>
            <p>Firm Name:</p>
            <p>World Multinational Immigration & Business Consultancy</p>
            <p className="mt-6">Date: …………………….</p>
            <p className="mt-6">Signature & Stamp: ……………………….</p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="mt-8 rounded-lg bg-black px-6 py-3 text-white print:hidden"
        >
          Print / Save PDF
        </button>
      </div>
    </main>
  );
}
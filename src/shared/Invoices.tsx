import { useState } from "react";

// Sample data for pagination
const TABLE_DATA = [
  {
    invoice: "#INVC0000003",
    campaign: "Future Solutions Ad",
    price: "$145.50",
    date: "12/22/2024",
    status: "Pending",
  },
  {
    invoice: "#INVC0000004",
    campaign: "Future Solutions Ad",
    price: "$143.50",
    date: "11/22/2024",
    status: "Pending",
  },
  {
    invoice: "#INVC0000005",
    campaign: "Future Solutions Ad",
    price: "$140.50",
    date: "10/22/2024",
    status: "Success",
  },
  {
    invoice: "#INVC0000005",
    campaign: "Future Solutions Ad",
    price: "$140.50",
    date: "10/22/2024",
    status: "Success",
  },
  {
    invoice: "#INVC0000005",
    campaign: "Future Solutions Ad",
    price: "$140.50",
    date: "10/22/2024",
    status: "Success",
  },
  {
    invoice: "#INVC0000006",
    campaign: "Future Solutions Ad",
    price: "$139.00",
    date: "9/22/2024",
    status: "Success",
  },
  // Add more data as needed...
];

const Invoices = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 4;
  const totalPages = Math.ceil(TABLE_DATA.length / invoicesPerPage);

  // Calculate the indexes of the first and last invoice on the current page
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = TABLE_DATA.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startInvoiceIndex = indexOfFirstInvoice + 1;
  const endInvoiceIndex = Math.min(indexOfLastInvoice, TABLE_DATA.length);

  return (
    <div className='p-5 mt-5 rounded-3xl shadow-sm w-full bg-white'>
      <div className='p-3'>
        <h2 className='text-black text-2xl mb-5'>Invoices</h2>
        <div className='rounded-t-lg border border-gray-200 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider'>
                    Invoice
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider'>
                    Campaign
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider'>
                    Price
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider'>
                    Date
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider'>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {currentInvoices.map((invoice, index) => (
                  <tr key={index}>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {invoice.invoice}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {invoice.campaign}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {invoice.price}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {invoice.date}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm'>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          invoice.status === "Success"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className='mt-4 flex justify-between items-center'>
          <div className='text-gray-500'>
            Showing {startInvoiceIndex} to {endInvoiceIndex} of{" "}
            {TABLE_DATA.length} invoices
          </div>
          <div className='flex items-center'>
            <button
              onClick={handlePrevPage}
              className='rounded-full p-2 px-4 mx-2 bg-white border border-gray-300'
              disabled={currentPage === 1}
            >
             <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.05"/>
              <path d="M17.9173 20.8337L12.084 15.0003L17.9173 9.16699" stroke="black" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            </button>
            <span className='flex space-x-2'>
              {[...Array(totalPages)].map((_, pageNum) => (
                <button
                  key={pageNum + 1}
                  onClick={() => handlePageChange(pageNum + 1)}
                  className={`rounded-full p-2 px-4 ${
                    currentPage === pageNum + 1
                      ? "bg-purple-600 text-white"
                      : "bg-white border border-gray-300"
                  }`}
                >
                  {pageNum + 1}
                </button>
              ))}
            </span>
            <button
              onClick={handleNextPage}
              className='p-2 px-4 mx-2'
              disabled={currentPage === totalPages}
            >
             <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.05"/>
            <path d="M12.084 9.16699L17.9173 15.0003L12.084 20.8337" stroke="black" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoices;

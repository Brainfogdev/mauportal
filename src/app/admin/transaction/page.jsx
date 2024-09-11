'use client';

import { NextUIProvider, useDisclosure } from '@nextui-org/react';
import { useState, useRef, useEffect } from 'react';

export default function Transaction() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const data = [
    {
      id: 1,
      periodFrom: '23-07-2024',
      periodTo: '23-07-2024',
      accountNumber: 'CASHACCOUNT123',
      currency: 'MUR',
      portfolio: 'PORTFOLIOID_123-1',
      portfolioName: 'PORTFOLIO AAA',
      openingBalance: '1,19,11,487.75',
      transactionDate: '23-07-2024',
      valueDate: '23-07-2024',
      transactionType: 'Account Transfer',
      description: 'FT1234512345 TRANSFER COMMENTS',
      amountDebited: '0',
      amountCredited: '11,47,450.00',
      closingBalance: '1,30,58,937.75',
      referenceNo: 'NUQI00000001',
    },
    {
      id: 2,
      periodFrom: '23-07-2024',
      periodTo: '23-07-2024',
      accountNumber: 'CASHACCOUNT124',
      currency: 'USD',
      portfolio: 'PORTFOLIOID_123-1',
      portfolioName: 'PORTFOLIO AAA',
      openingBalance: '1,19,11,487.75',
      transactionDate: '23-07-2024',
      valueDate: '23-07-2024',
      transactionType: 'Account Transfer',
      description: 'FT1234512346 OWN ACCOUNT TRANSFER',
      amountDebited: '-24,702.91',
      amountCredited: '0',
      closingBalance: '3,07,396.75',
      referenceNo: 'NUQI00000002',
    },
  ];
  const [filteredData, setFilteredData] = useState(data);

  const uploadCSVRef = useRef(null);
  const onOpenModal = (user) => {
    setSelectedUser(user);
    onOpenChange(true);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  const handleSort = (column) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[column] < b[column]) return sortOrder === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {}, []);

  return (
    <NextUIProvider>
      <div className="flex h-full">
        <div className="w-full rounded-3xl bg-gray-800 p-6 lg:w-8/12">
          <div className="mb-8 flex items-center justify-between text-white">
            <p className="text-2xl font-bold">Get Bank Transactions </p>
            <button
              type="button"
              onClick={() => {
                uploadCSVRef.current.click();
              }}
              className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2 ml-auto"
            >
              GET
            </button>
            <input ref={uploadCSVRef} className="hidden" type="file" accept=".json, .xls, .xlsx" />
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {/* <th scope="col" className="p-4 bg-gray-800">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th> */}
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointer"
                    onClick={() => handleSort('accountNumber')}
                  >
                    Account No.
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white w-36 text-center cursor-pointer whitespace-nowrap"
                    onClick={() => handleSort('transactionDate')}
                  >
                    Trans. Date
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointer"
                    onClick={() => handleSort('description')}
                  >
                    Description
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointer"
                    onClick={() => handleSort('referenceNo')}
                  >
                    Ref. ID
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointer  whitespace-nowrap"
                    onClick={() => handleSort('amountDebited')}
                  >
                    Amount Debited
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </th>

                  <th scope="col" className="px-6 py-3 bg-gray-800 text-white text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    {/* <td className="w-4 p-4 bg-gray-800">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-table-search-${user.id}`}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor={`checkbox-table-search-${user.id}`} className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td> */}
                    <th
                      scope="row"
                      className="bg-gray-800 flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <td className="px-4 py-8 bg-gray-800 text-white text-xs">
                        {user.accountNumber}
                      </td>
                    </th>

                    <td className="px-6 py-4 bg-gray-800 text-center text-xs">
                      {user.transactionDate}
                    </td>
                    <td className="px-6 py-4 bg-gray-800 text-center whitespace-nowrap">
                      {user.description}
                    </td>

                    <td className="px-6 py-4 bg-gray-800 text-center text-xs">
                      {user.referenceNo}
                    </td>
                    <td className="px-6 py-4 bg-gray-800 text-center text-xs">
                      {user.amountDebited}
                    </td>
                    {/* <td className="px-6 py-4 bg-gray-800 text-center">{user.amountCredited}</td> */}
                    <td className="px-6 py-4 bg-gray-800">
                      <button
                        className="border border-slate-500 text-white px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition duration-300"
                        onClick={() => handleViewUser(user)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <Modal
              id="hs-slide-down-animation-modal"
              className="bg-gray-800"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="text-white">User Info</ModalHeader>
                    <ModalBody>
                      <Usermodal user={selectedUser} onClose={onClose} />
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal> */}
          </div>
        </div>
        <div className=" flex flex-1 mt-8  grow lg:mt-0 lg:w-4/12 lg:pl-4">
          <div className="rounded-3xl bg-gray-800 px-6 pt-6 w-96">
            <div className="pb-6 text-2xl font-bold text-white">
              <p>Get Bank Transaction Details</p>
            </div>

            {selectedUser && (
              <div className=" mt-5 flex flex-col items-center pb-10 bg-gray-800">
                <div className="flex flex-row space-x-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Period From
                    </label>
                    <input
                      type="text"
                      value={selectedUser.periodFrom}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Period To
                    </label>
                    <input
                      type="text"
                      value={selectedUser.periodTo}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex flex-row space-x-4 mt-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Period From
                    </label>
                    <input
                      type="text"
                      value={selectedUser.periodFrom}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Period To
                    </label>
                    <input
                      type="text"
                      value={selectedUser.periodTo}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-4 mt-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Account no.
                    </label>
                    <input
                      type="text"
                      value={selectedUser.accountNumber}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Currency
                    </label>
                    <input
                      type="text"
                      value={selectedUser.currency}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-4 mt-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Portfolio
                    </label>
                    <input
                      type="text"
                      value={selectedUser.portfolio}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Portfolio Name
                    </label>
                    <input
                      type="text"
                      value={selectedUser.portfolioName}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-4 mt-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Opening Balance
                    </label>
                    <input
                      type="text"
                      value={selectedUser.openingBalance}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Transaction Date
                    </label>
                    <input
                      type="text"
                      value={selectedUser.transactionDate}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-4 mt-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Value Date
                    </label>
                    <input
                      type="text"
                      value={selectedUser.valueDate}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Transaction Type
                    </label>
                    <input
                      type="text"
                      value={selectedUser.transactionType}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-4 mt-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Description
                    </label>
                    <input
                      type="text"
                      value={selectedUser.description}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Amount Debited
                    </label>
                    <input
                      type="text"
                      value={selectedUser.amountDebited}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-4 mt-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Amount Credited
                    </label>
                    <input
                      type="text"
                      value={selectedUser.amountCredited}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Closing Balance
                    </label>
                    <input
                      type="text"
                      value={selectedUser.closingBalance}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-medium text-white mb-1 dark:text-white">
                    Reference ID
                  </label>
                  <input
                    type="text"
                    value={selectedUser.referenceNo}
                    className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                    readOnly
                  />
                </div>
                <div className="flex mt-4 md:mt-6 gap-5">
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Approved
                  </a>
                  <a
                    href="#"
                    className="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 hover:text-white focus:z-10 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 dark:bg-red-700 dark:text-white dark:border-red-700 dark:hover:bg-red-800"
                  >
                    Disapproved
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
}

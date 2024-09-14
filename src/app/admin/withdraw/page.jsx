'use client';
import {
  NextUIProvider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react';
import { useState, useRef } from 'react';
import Usermodal from '@/components/userinfo/usermodal';
import { FaEye } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

const Withdraw = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [csv, setCsv] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLargeModal, setIsLargeModal] = useState(false);

  const data = [
    {
      id: 1,
      periodFrom: '24-08-2024',
      periodTo: '24-08-2024',
      accountNumber: 'INVESTACCOUNT456',
      currency: 'EUR',
      portfolio: 'PORTFOLIOID_456-2',
      portfolioName: 'PORTFOLIO BBB',
      openingBalance: '2,50,00,000.00',
      transactionDate: '24-08-2024',
      valueDate: '24-08-2024',
      transactionType: 'Dividend Payment',
      description: 'DIV1234567890 DIVIDEND PAYMENT',
      amountDebited: '0',
      amountCredited: '20,00,000.00',
      closingBalance: '2,70,00,000.00',
      referenceNo: 'DIV00000002',
      status: 'Completed',
    },
    {
      id: 2,
      periodFrom: '25-08-2024',
      periodTo: '25-08-2024',
      accountNumber: 'INVESTACCOUNT456',
      currency: 'GBP',
      portfolio: 'PORTFOLIOID_456-2',
      portfolioName: 'PORTFOLIO BBB',
      openingBalance: '2,70,00,000.00',
      transactionDate: '25-08-2024',
      valueDate: '25-08-2024',
      transactionType: 'Withdrawal',
      description: 'WITHDRAWAL FOR INVESTMENT',
      amountDebited: '15,000.00',
      amountCredited: '0',
      closingBalance: '2,69,85,000.00',
      referenceNo: 'WD00000002',
      status: 'Pending',
    },
    {
      id: 3,
      periodFrom: '26-08-2024',
      periodTo: '26-08-2024',
      accountNumber: 'SAVINGSACCOUNT789',
      currency: 'JPY',
      portfolio: 'PORTFOLIOID_789-3',
      portfolioName: 'PORTFOLIO CCC',
      openingBalance: '1,00,00,000.00',
      transactionDate: '26-08-2024',
      valueDate: '26-08-2024',
      transactionType: 'Interest Credit',
      description: 'INTEREST PAYMENT AUGUST 2024',
      amountDebited: '0',
      amountCredited: '5,00,000.00',
      closingBalance: '1,05,00,000.00',
      referenceNo: 'INT00000003',
      status: 'Completed',
    },
    {
      id: 4,
      periodFrom: '27-08-2024',
      periodTo: '27-08-2024',
      accountNumber: 'SAVINGSACCOUNT789',
      currency: 'AUD',
      portfolio: 'PORTFOLIOID_789-3',
      portfolioName: 'PORTFOLIO CCC',
      openingBalance: '1,05,00,000.00',
      transactionDate: '27-08-2024',
      valueDate: '27-08-2024',
      transactionType: 'Deposit',
      description: 'NEW DEPOSIT AUGUST 2024',
      amountDebited: '0',
      amountCredited: '10,00,000.00',
      closingBalance: '1,15,00,000.00',
      referenceNo: 'DEP00000003',
      status: 'Pending',
    },
  ];

  const uploadCSVRef = useRef(null);
  const onOpenModal = (user) => {
    setSelectedUser(user);
    onOpenChange(true);
  };

  const [filteredData, setFilteredData] = useState(data);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    const filteredUsers = data.filter((user) => user.name.toLowerCase().includes(filterValue));
    setFilteredData(filteredUsers);
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
  return (
    <NextUIProvider>
      <div className="flex h-full">
        <div className="w-full rounded-3xl bg-gray-800 p-6 lg:w-8/12">
          <div className="mb-8 flex items-center justify-between text-white">
            <p className="text-2xl font-bold">Withdraw Status </p>
            <button
              type="button"
              //   onClick={() => {
              //     uploadCSVRef.current.click();
              //   }}
              className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2 ml-auto"
            >
              Withdraw
            </button>
            {/* <input ref={uploadCSVRef} className="hidden" type="file" /> */}
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointer"
                    onClick={() => handleSort(' accountNumber')}
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

                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointer  whitespace-nowrap"
                    onClick={() => handleSort('amountCredited')}
                  >
                    Amount Credited
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointer  whitespace-nowrap"
                    onClick={() => handleSort('status')}
                  >
                    Status
                    <span className="ml-2 cursor-pointer">{sortOrder === 'asc' ? '↑' : '↓'}</span>
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
                    <th
                      scope="row"
                      className="bg-gray-800 flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <td className="px-4 py-8 bg-gray-800 text-white">{user.accountNumber}</td>
                    </th>
                    <td className="px-6 py-4 bg-gray-800 text-center">{user.transactionDate}</td>
                    <td className="px-6 py-4 bg-gray-800 text-center whitespace-nowrap">
                      {user.description}
                    </td>

                    <td className="px-6 py-4 bg-gray-800 text-center">{user.referenceNo}</td>
                    <td className="px-6 py-4 bg-gray-800 text-center">{user.amountDebited}</td>
                    <td className="px-6 py-4 bg-gray-800 text-center">{user.amountCredited}</td>
                    <td
                      className={`px-6 py-4 bg-gray-800 text-center ${
                        user.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'
                      }`}
                    >
                      {user.status}
                    </td>
                    <td className="px-6 py-4 bg-gray-800">
                      <div className=" flex gap-4 border border-slate-500 text-white px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition duration-300">
                        <FaEye
                          onClick={() => handleViewUser(user)}
                          size={15}
                          className="text-white transition cursor-pointer duration-300"
                        />

                        <FaPen size={15} className="text-white transition duration-300" />
                        <FaTrash size={15} className="text-white transition duration-300" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className=" flex flex-1 mt-8  grow lg:mt-0 lg:w-4/12 lg:pl-4">
          <div className="rounded-3xl bg-gray-800 px-6 pt-6 w-96">
            <div className="pb-6 text-2xl font-bold text-white">
              <p>Withdraw</p>
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
                    className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Reject
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
};

export default Withdraw;

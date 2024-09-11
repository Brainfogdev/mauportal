'use client';

import { NextUIProvider, useDisclosure } from '@nextui-org/react';
import { useState, useRef, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { CiWarning } from 'react-icons/ci';
import Approve from '@/components/approvalmodal/approve';
import Success from '@/components/successmodal/success';
import axios from 'axios';

export default function Wallet() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [csv, setCsv] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([
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
      accountNumber: 'CASHACCOUNT123',
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
      referenceNo: 'NUQI00000001',
    },
  ]);
  const [loading, setLoading] = useState(false);

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

  const [isApproveModalOpen, setApproveModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const handleOpenApproveModal = () => setApproveModalOpen(true);
  const handleCloseApproveModal = () => setApproveModalOpen(false);

  const handleOpenSuccessModal = () => setSuccessModalOpen(true);
  const handleCloseSuccessModal = () => setSuccessModalOpen(false);

  async function updateUserWallet(id, amount) {
    const config = {
      method: 'put',
      url: `http://150.129.118.10:8080/user/wallet/mau`,
      data: {
        userId: id,
        amount: amount,
      },
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert('user kyc updated');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function getAllWalletRequest() {
    setLoading(true);
    const config = {
      method: 'get',
      url: 'http://150.129.118.10:5000/admin/eod-transactions',
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getAllWalletRequest();
  }, []);

  return (
    <NextUIProvider>
      <div className="flex h-full">
        <div className="w-full rounded-3xl bg-gray-800 p-6 lg:w-8/12">
          <div className="mb-8 flex items-center justify-between text-white">
            <p className="text-2xl font-bold">Approve Wallet Transactions</p>
            <button
              onClick={() => window.location.reload()}
              type="button"
              className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
            >
              Refresh
            </button>
            {/* <input ref={uploadCSVRef} className="hidden" type="file" accept=".json, .xls, .xlsx, .csv" /> */}
          </div>
          <div className="flex flex-wrap items-center justify-between pb-8"></div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointerback"
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
                    Amount Credited
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointer  whitespace-nowrap"
                    onClick={() => handleSort('status')}
                  >
                    Status
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
                    {/* <td className="px-6 py-4 bg-gray-800 text-center whitespace-nowrap">{user.description}</td> */}

                    <td className="px-6 py-4 bg-gray-800 text-center text-xs">
                      {user.referenceNo}
                    </td>
                    <td className="px-6 py-4 bg-gray-800 text-center text-xs">
                      {user.amountCredited}
                    </td>
                    <td className="px-6 py-4 bg-gray-800 text-center text-white text-xs">
                      {' '}
                      {user.status === 'approved' && <FaCheckCircle size={25} color="#99F7AB" />}
                      {user.status === 'pending' && <CiWarning size={25} color="yellow" />}
                    </td>

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
              <p>Wallet Transactions</p>
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
                    onClick={() => {
                      handleOpenApproveModal();
                    }}
                    className="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Approved
                  </a>
                  <Approve
                    data={selectedUser}
                    isOpen={isApproveModalOpen}
                    onClose={handleCloseApproveModal}
                  />
                  <a
                    onClick={() => {
                      handleOpenSuccessModal();
                    }}
                    className="cursor-pointer py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 hover:text-white focus:z-10 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 dark:bg-red-700 dark:text-white dark:border-red-700 dark:hover:bg-red-800"
                  >
                    Disapproved
                  </a>
                  <Success isOpen={isSuccessModalOpen} onClose={handleCloseSuccessModal} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
}

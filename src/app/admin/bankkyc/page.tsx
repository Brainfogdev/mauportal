import { NextUIProvider, useDisclosure } from '@nextui-org/react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Logoutmodal from '@/components/logout/logoutmodal';
import Approve from '@/components/approvalmodal/approve';
import Success from '@/components/successmodal/success';
import { FaCheckCircle, FaClock, FaTimesCircle, FaEye, FaPen, FaTrash } from 'react-icons/fa';

interface BankDetails {
  user_id: string;
  holder_name: string;
  is_bank_kyc_verified: boolean;
  username: string;
  issuedAt: string;
  waitingTime: string;
  account_number: string;
  ifsc_code: string;
  bank_name: string;
}

interface KYCRecord {
  id: string;
}

interface User {
  id: string;
  bankDetails: BankDetails[];
  kycRecords: KYCRecord[];
}

export default function KYC(props: { title: string }) {
  const { title } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [csv, setCsv] = useState<File | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const uploadCSVRef = useRef<HTMLInputElement>(null);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value.toLowerCase();
    const filteredUsers = data.filter((user) => user.bankDetails[0].holder_name.toLowerCase().includes(filterValue));
    setFilteredData(filteredUsers);
  };

  const handleSort = (column: keyof BankDetails) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[column] < b[column]) return sortOrder === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const allBankKyc = () => {
    setLoading(true);
    axios.get<User[]>('http://150.129.118.10:8080/user/bankkyc/all')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    allBankKyc();
  }, []);

  return (
    <NextUIProvider>
      <div className="flex h-full">
        <div className="w-full rounded-3xl bg-gray-800 p-6 lg:w-8/12">
          <div className="mb-8 flex items-center justify-between text-white">
            <p className="text-2xl font-bold">Bank KYC </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
            >
              Refresh
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-between pb-8"></div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className=" cursor-pointer px-6 py-3 bg-gray-800 text-white text-center cursor-pointerback whitespace-nowrap"
                    onClick={() => handleSort('user_id')}
                  >
                    Reference Id
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white w-36 text-center cursor-pointer whitespace-nowrap"
                    onClick={() => handleSort('user_id')}
                  >
                    KYC Id
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointer  whitespace-nowrap"
                    onClick={() => handleSort('holder_name')}
                  >
                    Username
                    <span className="ml-2 cursor-pointer">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointer  whitespace-nowrap"
                    onClick={() => handleSort('status')}
                  >
                    Status
                    <span className="ml-2 cursor-pointer">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointer  whitespace-nowrap"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user) => {
                  if (user && user.kycRecords && user.kycRecords.length === 0) {
                    return null;
                  }
                  return (
                    <tr
                      key={user.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="bg-gray-800 flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <td className="px-4 py-8 bg-gray-800 text-white text-xs">
                          {user.bankDetails[0].user_id}
                        </td>
                      </th>
                      <td className="px-6 py-4 bg-gray-800 text-center text-xs">
                        {user.bankDetails[0].user_id}
                      </td>

                      <td className="px-6 py-4 bg-gray-800 text-center text-xs">
                        {user.bankDetails[0].holder_name}
                      </td>
                      <td
                        className={`px-6 py-4 bg-gray-800 text-center text-xs ${
                          user.bankDetails[0].is_bank_kyc_verified
                            ? 'text-green-500'
                            : 'text-yellow-500'
                        }`}
                      >
                        {user.bankDetails[0].is_bank_kyc_verified ? 'Completed' : 'Pending'}
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
                  );
                })}
              </tbody>
              {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="relative bg-white p-16 rounded">
                    <button
                      className=" text-5xl absolute top-2 right-2 text-gray-700"
                      onClick={handleCloseImage}
                    >
                      ×
                    </button>
                    <img
                      src={{
                        uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
                      }}
                      alt="Selected"
                      className="max-w-full max-h-[70vh] object-contain"
                    />
                  </div>
                </div>
              )}
            </table>
          </div>
        </div>
        <div className=" flex flex-1 mt-8  grow lg:mt-0 lg:w-4/12 lg:pl-4">
          <div className="rounded-3xl bg-gray-800 px-6 pt-6 w-96">
            <div className="pb-6 text-2xl font-bold text-white">
              <p>Bank KYC Details </p>
            </div>

            {selectedUser && (
              <div className=" mt-5 flex flex-col items-center pb-10 bg-gray-800">
                <div className="flex flex-row space-x-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Username
                    </label>
                    <input
                      type="text"
                      value={selectedUser.bankDetails[0].username}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Issued At
                    </label>
                    <input
                      type="text"
                      value={selectedUser.bankDetails[0].issuedAt}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex flex-row space-x-4 mt-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Waiting Time
                    </label>
                    <input
                      type="text"
                      value={selectedUser.bankDetails[0].waitingTime}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Holder Name
                    </label>
                    <input
                      type="text"
                      value={selectedUser.bankDetails[0].holder_name}
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
                      value={selectedUser.bankDetails[0].account_number}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-white mb-1 dark:text-white">
                      Ifsc Code
                    </label>
                    <input
                      type="text"
                      value={selectedUser.bankDetails[0].ifsc_code}
                      className="mb-1 text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-4 mt-4 items-center">
                  <div className="flex flex-row items-center space-x-4">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-white mb-1 dark:text-white">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        value={selectedUser.bankDetails[0].bank_name}
                        className="text-xs font-medium text-white bg-gray-800 p-2 rounded-md outline-none border border-gray-600 dark:text-white"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <a
                  href="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full m-5 h-40 object-cover rounded-md cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                    alt="Bank Logo"
                    className="w-full h-40 object-cover rounded-md cursor-pointer"
                  />
                </a>
                <div className="flex mt-4 md:mt-6 gap-5">
                  <a
                    onClick={() => {
                      updateUserVerification(selectedUser.kycRecords[0].id, 'approved');
                    }}
                    className="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Approved
                  </a>
                  <Approve isOpen={isApproveModalOpen} onClose={handleCloseApproveModal} />
                  <a
                    onClick={() => {
                      updateUserVerification(selectedUser.kycRecords[0].id, 'rejected');
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

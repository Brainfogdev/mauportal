'use client';

import {
  NextUIProvider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,   
  useDisclosure,
} from '@nextui-org/react';
import { useState, useRef } from 'react';
import Usermodal from '@/components/userinfo/usermodal';

export default function CSV(props: { title: string }) {
  const { title } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [csv, setCsv] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

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
            <p className="text-2xl font-bold">Upload EOD File </p>
            <button
              type="button"
              onClick={() => {
                uploadCSVRef.current.click();
              }}
              className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2 ml-auto"
            >
              Upload
            </button>
            <input ref={uploadCSVRef} className="hidden" type="file" />
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
                    onClick={() => handleSort('name')}
                  >
                    Account No.
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white w-36 text-center cursor-pointer whitespace-nowrap"
                    onClick={() => handleSort('name')}
                  >
                    Trans. Date
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    Description
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </th>

                  
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    Ref. ID
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointer  whitespace-nowrap"
                    onClick={() => handleSort('name')}
                  >
                    Amount Debited
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointer  whitespace-nowrap"
                    onClick={() => handleSort('name')}
                  >
                    Amount Credited
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
                      <td className="px-4 py-8 bg-gray-800 text-white">{user.accountNumber}</td>
                    </th>
                    <td className="px-6 py-4 bg-gray-800 text-center">{user.transactionDate}</td>
                    <td className="px-6 py-4 bg-gray-800 text-center whitespace-nowrap">{user.description}</td>

                   
                    <td className="px-6 py-4 bg-gray-800 text-center">{user.referenceNo}</td>
                    <td className="px-6 py-4 bg-gray-800 text-center">{user.amountDebited}</td>
                    <td className="px-6 py-4 bg-gray-800 text-center">{user.amountCredited}</td>
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
            <Modal
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
            </Modal>
          </div>

          {title === 'Wallet' && (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          )}

          {/* <div className="flex flex-wrap">
        <div className="w-full md:w-4/12">
          <div className="p-2">
            <div className="rounded-3xl p-4" style={{ backgroundColor: '#fee4cb' }}>
              <div className="flex items-center">
                <span className="text-sm">December 10, 2020</span>
              </div>
              <div className="mb-4 mt-5 text-center">
                <p className="text-base font-bold opacity-70">Web Designing</p>
                <p className="mt-2 text-sm opacity-70">Prototyping</p>
              </div>
              <div>
                <p className="m-0 text-sm font-bold">Progress</p>
                <div className="mx-0 my-2 h-1 w-full overflow-hidden rounded-md bg-white">
                  <span className="block h-1 w-6/12 rounded-md bg-yellow-700" />
                </div>
                <p className="m-0 text-right text-sm font-bold">60%</p>
              </div>
              <div className="relative flex justify-between pt-4">
                <div className="flex items-center">
                  <img
                    className="h-5 w-5 overflow-hidden rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                    alt="participant1"
                  />
                  <img
                    className="h-5 w-5 overflow-hidden rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                    alt="participant2"
                  />
                  <button className="ml-3 flex h-5 w-5 items-center justify-center rounded-full border-none bg-white p-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div className="flex shrink-0 rounded-lg px-4 py-2 text-sm font-bold text-yellow-600">
                  2 Days Left
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/12">
          <div className="p-2">
            <div className="rounded-3xl bg-gray-300 p-4">
              <div className="flex items-center">
                <span className="text-sm">December 10, 2020</span>
              </div>
              <div className="mb-4 mt-5 text-center">
                <p className="text-base font-bold opacity-70">Web Designing</p>
                <p className="mt-2 text-sm opacity-70">Prototyping</p>
              </div>
              <div>
                <p className="m-0 text-sm font-bold">Progress</p>
                <div className="mx-0 my-2 h-1 w-full overflow-hidden rounded-md bg-white">
                  <span className="block h-1 w-5/12 rounded-md bg-indigo-700" />
                </div>
                <p className="m-0 text-right text-sm font-bold">50%</p>
              </div>
              <div className="relative flex justify-between pt-4">
                <div className="flex items-center">
                  <img
                    className="h-5 w-5 overflow-hidden rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                    alt="participant3"
                  />
                  <img
                    className="h-5 w-5 overflow-hidden rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                    alt="participant4"
                  />
                  <button className="ml-3 flex h-5 w-5 items-center justify-center rounded-full border-none bg-white p-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div className="flex shrink-0 rounded-lg px-4 py-2 text-sm font-bold text-indigo-700">
                  2 Days Left
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/12">
          <div className="p-2">
            <div className="rounded-3xl bg-green-200 p-4">
              <div className="flex items-center">
                <span className="text-sm">December 10, 2020</span>
              </div>
              <div className="mb-4 mt-5 text-center">
                <p className="text-base font-bold opacity-70">Web Designing</p>
                <p className="mt-2 text-sm opacity-70">Prototyping</p>
              </div>
              <div>
                <p className="m-0 text-sm font-bold">Progress</p>
                <div className="mx-0 my-2 h-1 w-full overflow-hidden rounded-md bg-white">
                  <span className="block h-1 w-7/12 rounded-md bg-green-700" />
                </div>
                <p className="m-0 text-right text-sm font-bold">70%</p>
              </div>
              <div className="relative flex justify-between pt-4">
                <div className="flex items-center">
                  <img
                    className="h-5 w-5 overflow-hidden rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                    alt="participant5"
                  />
                  <img
                    className="h-5 w-5 overflow-hidden rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                    alt="participant6"
                  />
                  <button className="ml-3 flex h-5 w-5 items-center justify-center rounded-full border-none bg-white p-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div className="flex shrink-0 rounded-lg px-4 py-2 text-sm font-bold text-green-700">
                  2 Days Left
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/12">
          <div className="p-2">
            <div className="rounded-3xl bg-blue-200 p-4">
              <div className="flex items-center">
                <span className="text-sm">December 10, 2020</span>
              </div>
              <div className="mb-4 mt-5 text-center">
                <p className="text-base font-bold opacity-70">Web Designing</p>
                <p className="mt-2 text-sm opacity-70">Prototyping</p>
              </div>
              <div>
                <p className="m-0 text-sm font-bold">Progress</p>
                <div className="mx-0 my-2 h-1 w-full overflow-hidden rounded-md bg-white">
                  <span className="block h-1 w-7/12 rounded-md bg-blue-700" />
                </div>
                <p className="m-0 text-right text-sm font-bold">70%</p>
              </div>
              <div className="relative flex justify-between pt-4">
                <div className="flex items-center">
                  <img
                    className="h-5 w-5 overflow-hidden rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                    alt="participant7"
                  />
                  <img
                    className="h-5 w-5 overflow-hidden rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                    alt="participant8"
                  />
                  <button className="ml-3 flex h-5 w-5 items-center justify-center rounded-full border-none bg-white p-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div className="flex shrink-0 rounded-lg px-4 py-2 text-sm font-bold text-blue-700">
                  2 Days Left
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/12">
          <div className="p-2">
            <div className="rounded-3xl bg-red-200 p-4">
              <div className="flex items-center">
                <span className="text-sm">December 10, 2020</span>
              </div>
              <div className="mb-4 mt-5 text-center">
                <p className="text-base font-bold opacity-70">Web Designing</p>
                <p className="mt-2 text-sm opacity-70">Prototyping</p>
              </div>
              <div>
                <p className="m-0 text-sm font-bold">Progress</p>
                <div className="mx-0 my-2 h-1 w-full overflow-hidden rounded-md bg-white">
                  <span className="block h-1 w-7/12 rounded-md bg-red-700" />
                </div>
                <p className="m-0 text-right text-sm font-bold">70%</p>
              </div>
              <div className="relative flex justify-between pt-4">
                <div className="flex items-center">
                  <img
                    className="h-5 w-5 overflow-hidden rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                    alt="participant9"
                  />
                  <img
                    className="h-5 w-5 overflow-hidden rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                    alt="participant10"
                  />
                  <button className="ml-3 flex h-5 w-5 items-center justify-center rounded-full border-none bg-white p-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div className="flex shrink-0 rounded-lg px-4 py-2 text-sm font-bold text-red-700">
                  2 Days Left
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/12">
          <div className="p-2">
            <div className="rounded-3xl bg-purple-200 p-4">
              <div className="flex items-center">
                <span className="text-sm">December 10, 2020</span>
              </div>
              <div className="mb-4 mt-5 text-center">
                <p className="text-base font-bold opacity-70">Web Designing</p>
                <p className="mt-2 text-sm opacity-70">Prototyping</p>
              </div>
              <div>
                <p className="m-0 text-sm font-bold">Progress</p>
                <div className="mx-0 my-2 h-1 w-full overflow-hidden rounded-md bg-white">
                  <span className="block h-1 w-7/12 rounded-md bg-purple-700" />
                </div>
                <p className="m-0 text-right text-sm font-bold">70%</p>
              </div>
              <div className="relative flex justify-between pt-4">
                <div className="flex items-center">
                  <img
                    className="h-5 w-5 overflow-hidden rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                    alt="participant11"
                  />
                  <img
                    className="h-5 w-5 overflow-hidden rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                    alt="participant12"
                  />
                  <button className="ml-3 flex h-5 w-5 items-center justify-center rounded-full border-none bg-white p-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div className="flex shrink-0 rounded-lg px-4 py-2 text-sm font-bold text-purple-700">
                  2 Days Left
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
        </div>
        <div className=" flex flex-1 mt-8  grow lg:mt-0 lg:w-4/12 lg:pl-4">
          <div className="rounded-3xl bg-gray-800 px-6 pt-6 w-96">
            <div className="pb-6 text-2xl font-bold text-white">
              <p>EOD Transaction Details</p>
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

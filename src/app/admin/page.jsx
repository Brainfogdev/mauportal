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

export default function HomePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [csv, setCsv] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const data = [
    {
      id: 1,
      name: 'Neil Sims',
      email: 'neil.sims@flowbite.com',
      position: 'React Developer',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Arbaaz Khan',
      email: 'neil.sims@flowbite.com',
      position: 'React Js Developer',
      status: 'Completed',
    },
    {
      id: 3,
      name: 'Kushal Bauskar',
      email: 'neil.sims@flowbite.com',
      position: 'FullStack Developer',
      status: 'Completed',
    },
    {
      id: 4,
      name: 'Prateek Barai',
      email: 'neil.sims@flowbite.com',
      position: 'FrontEnd Developer',
      status: 'Completed',
    },
    {
      id: 5,
      name: 'Suyash Tambe',
      email: 'neil.sims@flowbite.com',
      position: 'BackEnd Developer',
      status: 'Pending',
    },
    {
      id: 6,
      name: 'Hardik Tambe',
      email: 'neil.sims@flowbite.com',
      position: 'FrontEnd Developer',
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
            <p className="text-2xl font-bold">DashBoard</p>
            <p className="">December, 12</p>
          </div>
          <div className="flex flex-wrap items-center justify-between pb-8">
            {/* <div className="flex flex-wrap text-white">
            <div className="pr-10">
              <div className="text-2xl font-bold text-center">45</div>
              <div className="">Users</div>
            </div>
            <div className="pr-10">
              <div className="text-2xl font-bold text-center">24</div>
              <div className="">Wallet Approvals</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-center">62</div>
              <div className="">Transactions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-center ml-2">32</div>
              <div className="ml-9">Failed Transactions</div>
            </div>
          </div> */}
            {/* <button
            type="button"
            onClick={() => {
              uploadCSVRef.current.click();
            }}
            className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
          >
            Upload CSV
          </button> */}
            {/* <input ref={uploadCSVRef} className="hidden" type="file" /> */}
            {/* <div className="mt-4 flex items-center md:mt-0">
          <button className="bg-transparent text-white" title="List View">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
          <button className="ml-2 bg-gray-700 p-2 text-white" title="Grid View">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>
        </div> */}
          </div>

          {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4 bg-gray-800">
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
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    Name
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    Position
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-800 text-white text-center cursor-pointer"
                    onClick={() => handleSort('name')}
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
                    <td className="w-4 p-4 bg-gray-800">
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
                    </td>
                    <th
                      scope="row"
                      className="bg-gray-800 flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="ps-3 bg-gray-800">
                        <div className="text-base font-semibold text-white">{user.name}</div>
                        <div className="font-normal text-gray-500">{user.email}</div>
                      </div>
                    </th>
                    <td className="px-6 py-4 bg-gray-800">{user.position}</td>
                    <td className="px-6 py-4 bg-gray-800">
                      <div className="flex items-center bg-gray-800">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                        {user.status ? 'Completed' : 'Pending'}
                      </div>
                    </td>
                    <td className="px-6 py-4 bg-gray-800">
                      <button
                        className="border border-slate-500 text-white px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition duration-300"
                        onClick={() => handleViewUser(user)}
                      >
                        {title === 'Transactions' ? 'Transactions' : 'View User'}
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
          </div> */}

          {/* {title === 'Wallet' && (
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
          )} */}

          <div className="flex flex-wrap">
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
          </div>
        </div>
        <div className="mt-8 w-full lg:mt-0 lg:w-4/12 lg:pl-4">
          <div className="rounded-3xl bg-gray-800 px-6 pt-6">
            <div className="flex pb-6 text-2xl font-bold text-white">
              <p>Client Messages</p>
            </div>
            <div>
              {/* {data.map((message, index) => (
            <div key={index} className="flex w-full border-t border-gray-700 p-4 hover:bg-gray-700 2xl:items-start">
             
              <div className="w-full pl-4">
                <div className="flex w-full items-center justify-between">
                  <div className="font-medium text-white text-center w-full">{message.name}</div>
                  <div className="flex h-7 w-7 cursor-pointer items-center justify-center">
                    
                  </div>
                </div>
                <p className="my-2 text-sm text-gray-400 text-center">
                  {message.email}
                </p>
                <p className="text-center text-sm text-gray-400">{message.position}</p>
                
              </div>
            </div>
          ))} */}

              <div className="flex w-full border-t border-gray-700 p-4 hover:bg-gray-700 2xl:items-start">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                  alt="profile image"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="w-full pl-4">
                  <div className="flex w-full items-center justify-between">
                    <div className="font-medium text-white">Stephanie</div>
                    <div className="flex h-7 w-7 cursor-pointer items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                  </div>
                  <p className="my-2 text-sm text-gray-400">
                    I got your first assignment. It was quite good. 🥳 We can continue with the next
                    assignment.
                  </p>
                  <p className="text-right text-sm text-gray-400">Dec, 12</p>
                </div>
              </div>
              <div className="flex w-full border-t border-gray-700 p-4 hover:bg-gray-700 2xl:items-start">
                <img
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                  alt="profile image2"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="w-full pl-4">
                  <div className="flex w-full items-center justify-between">
                    <div className="font-medium text-white">Mark</div>
                    <div className="flex h-7 w-7 cursor-pointer items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                  </div>
                  <p className="my-2 text-sm text-gray-400">
                    Hey, can tell me about progress of project? I'm waiting for your response.
                  </p>
                  <p className="text-right text-sm text-gray-400">Dec, 12</p>
                </div>
              </div>
              <div className="flex w-full border-t border-gray-700 p-4 hover:bg-gray-700 2xl:items-start">
                <img
                  src="https://images.unsplash.com/photo-1543965170-4c01a586684e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDZ8fG1hbnxlbnwwfDB8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                  alt="profile image"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="w-full pl-4">
                  <div className="flex w-full items-center justify-between">
                    <div className="font-medium text-white">David</div>
                    <div className="flex h-7 w-7 cursor-pointer items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                  </div>
                  <p className="my-2 text-sm text-gray-400">
                    Hey, can tell me about progress of project? I'm waiting for your response.
                  </p>
                  <p className="text-right text-sm text-gray-400">Dec, 12</p>
                </div>
              </div>
              <div className="flex w-full border-t border-gray-700 p-4 hover:bg-gray-700 2xl:items-start">
                <img
                  src="https://images.unsplash.com/photo-1533993192821-2cce3a8267d1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWFuJTIwbW9kZXJufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                  alt="profile image3"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="w-full pl-4">
                  <div className="flex w-full items-center justify-between">
                    <div className="font-medium text-white">Mark</div>
                    <div className="flex h-7 w-7 cursor-pointer items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                  </div>
                  <p className="my-2 text-sm text-gray-400">
                    I am really impressed! Can't wait to see the final result.
                  </p>
                  <p className="text-right text-sm text-gray-400">Dec, 12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
}

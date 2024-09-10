'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e, setInput) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9.@]/g, '');
    setInput(filteredValue);
  };

  const validateInputs = () => {
    let formErrors = {};

    // if (!username) {
    //   formErrors.username = 'Username is required.';
    // } else if (!username.includes('@')) {
    //   formErrors.username = 'Username must contain @ character.';
    // }

    if (!password) {
      formErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters long.';
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      console.log('Form is valid. Proceed with login.');
    }
  };

  async function signin() {
    setLoading(true);
    const data = {
      username: username,
      password: password,
    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://150.129.118.10:5000/admin/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        router.push('/admin');
      })
      .catch((error) => {
        console.log(error);
        alert('username or password is wrong.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="relative w-80 rounded-lg bg-black p-8 text-gray-100 shadow-lg">
        <img src="/images/11.png" alt="Logo" className="absolute top-3 left-3 w-10 h-10" />
        <form className="mt-10" onSubmit={handleSubmit}>
          <div className="mt-1 text-sm leading-5">
            <label htmlFor="username" className="block text-gray-400 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder=""
              value={username}
              onChange={(e) => handleInputChange(e, setUsername)}
              className="w-full rounded-md border border-gray-700 outline-none bg-gray-900 p-3 text-gray-100 focus:border-purple-400"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>
          <div className="mt-4 text-sm leading-5 relative">
            <label htmlFor="password" className="block text-gray-400 mb-1">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder=""
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
              className="w-full rounded-md border border-gray-700 outline-none bg-gray-900 p-3 text-gray-100 focus:border-purple-400"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="text-white mt-5"
              />
            </button>
          </div>
          <button
            disabled={loading}
            onClick={signin}
            className="block w-full bg-purple-400 p-3 text-center text-gray-900 font-semibold rounded-md mt-10"
          >
            {loading ? <span className="animate-spin">Signing in...</span> : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

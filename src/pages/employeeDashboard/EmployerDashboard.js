import React from "react";
import { useSelector } from "react-redux";
import { MdEmail } from "react-icons/md";
import {
  BsFillBriefcaseFill,
  BsFillPersonFill,
  BsPeopleFill,
} from "react-icons/bs";
import { FaLayerGroup, FaTransgender } from "react-icons/fa";
import { SiAuth0 } from "react-icons/si";

const EmployerDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const {
    firstName,
    lastName,
    companyCategory,
    companyName,
    email,
    employeeRange,
    gender,
    roleInCompany,
  } = user;
  return (
    <div className="overflow-hidden bg-secondary/20 m-5  shadow-md rounded-md">
      <div className="flex flex-col sm:items-center pb-10">
        <div className="p-8">
          <h3 className="text-2xl font-medium leading-6 text-primary">
            Employer Information
          </h3>
          <p className="mt-1 text-md text-gray-600">
            Your are using an employer account
          </p>
        </div>
        <div className="sm:flex justify-evenly w-full px-6 sm:px-0">
          <div>
            <h4 className="text-lg font-medium text-primary">
              User Information
            </h4>
            <p className="mt-1 text-md text-gray-600">
              Your Personal Information
            </p>
            <div className="mt-4 space-y-4">
              <div className="flex">
                <div className="flex h-5 items-center">
                  <div className="flex h-5 items-center">
                    <BsFillPersonFill />
                  </div>
                </div>
                <div className="ml-3 text-md">
                  <h5 className="font-medium text-gray-700">Name</h5>
                  <p className="text-gray-500">{firstName + " " + lastName}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <div className="flex h-5 items-center">
                    <MdEmail />
                  </div>
                </div>
                <div className="ml-3 text-md">
                  <h5 className="font-medium text-gray-700">Email</h5>
                  <p className="text-gray-500">{email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <div className="flex h-5 items-center">
                    <FaTransgender />
                  </div>
                </div>
                <div className="ml-3 text-md">
                  <h5 className="font-medium text-gray-700">Gender</h5>
                  <p className="text-gray-500">{gender || "Not Given"}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium text-primary mt-6 sm:mt-0">
              Organization Information
            </h4>
            <p className="mt-1 text-md text-gray-600">
              Your Company Information
            </p>
            <div className="mt-4 space-y-4">
              <div className="flex">
                <div className="flex h-5 items-center">
                  <div className="flex h-5 items-center">
                    <BsFillBriefcaseFill />
                  </div>
                </div>
                <div className="ml-3 text-md">
                  <h5 className="font-medium text-gray-700">Company Name</h5>
                  <p className="text-gray-500">{companyName}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <div className="flex h-5 items-center">
                    <FaLayerGroup />
                  </div>
                </div>
                <div className="ml-3 text-md">
                  <h5 className="font-medium text-gray-700">
                    Company Category
                  </h5>
                  <p className="text-gray-500">{companyCategory}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <div className="flex h-5 items-center">
                    <BsPeopleFill />
                  </div>
                </div>
                <div className="ml-3 text-md">
                  <h5 className="font-medium text-gray-700">
                    Number of Employee
                  </h5>
                  <p className="text-gray-500">{employeeRange}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <div className="flex h-5 items-center">
                    <SiAuth0 />
                  </div>
                </div>
                <div className="ml-3 text-md">
                  <h5 className="font-medium text-gray-700">
                    Your Role In The Company
                  </h5>
                  <p className="text-gray-500">{roleInCompany}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;

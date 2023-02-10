import React from "react";
import { useSelector } from "react-redux";
import { MdEmail } from "react-icons/md";
import { BsFillPersonFill, BsMailbox2 } from "react-icons/bs";
import { FaCity, FaTransgender } from "react-icons/fa";
import { GrLocation, GrMapLocation } from "react-icons/gr";

const CandidateDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const {
    firstName,
    lastName,
    email,
    gender,
    address,
    postcode,
    city,
    country,
  } = user;
  return (
    <div className="overflow-hidden bg-secondary/20 m-5  shadow-md rounded-md">
      <div className="flex flex-col sm:items-center pb-10">
        <div className="p-8">
          <h3 className="text-2xl font-medium leading-6 text-primary">
            Candidate Information
          </h3>
          <p className="mt-1 text-md text-gray-600">
            Your are using an candidate account
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
              User Location
            </h4>
            <p className="mt-1 text-md text-gray-600">Your Current Location</p>
            <div className="mt-4 space-y-4">
              <div className="flex">
                <div className="flex h-5 items-center">
                  <div className="flex h-5 items-center">
                    <GrLocation />
                  </div>
                </div>
                <div className="ml-3 text-md">
                  <h5 className="font-medium text-gray-700">Your Address</h5>
                  <p className="text-gray-500">{address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <div className="flex h-5 items-center">
                    <BsMailbox2 />
                  </div>
                </div>
                <div className="ml-3 text-md">
                  <h5 className="font-medium text-gray-700">Post Code</h5>
                  <p className="text-gray-500">{postcode}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <div className="flex h-5 items-center">
                    <FaCity />
                  </div>
                </div>
                <div className="ml-3 text-md">
                  <h5 className="font-medium text-gray-700">Your City</h5>
                  <p className="text-gray-500">{city}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <div className="flex h-5 items-center">
                    <GrMapLocation />
                  </div>
                </div>
                <div className="ml-3 text-md">
                  <h5 className="font-medium text-gray-700">Your Country</h5>
                  <p className="text-gray-500">{country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;

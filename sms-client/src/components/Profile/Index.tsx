import React from "react";

const Profile = () => {
  return (
    <div className="profile_wrapper bg-gray-100 rounded-md mt-2 h-96 shadow-lg p-2 bg-image-moutain relative">
      <div className="absolute bottom-0 left-0 h-36 bg-gray-100 rounded-b-md w-full">
        <div className="ml-28 flex">
          <div className="-mt-16">
            <picture>
              <source
                media="(min-width:650px)"
                srcSet="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              />
              <img
                src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="banner image"
                height="200"
                width="150"
                className="rounded-full h-36 border-4 border-blue-50 pointer-events-none"
              />
            </picture>
          </div>
          <div className="ml-8">
            <h1 className="text-2xl font-extrabold text-gray-800">
              Arun Pratap Singh
            </h1>
            <p className="text-gray-500">
              Principal of Indian Public Inter College
            </p>
            <div className="mt-4">
              <span className="material-icons-outlined p-2 bg-gray-900 rounded-md text-white cursor-pointer">
                add
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

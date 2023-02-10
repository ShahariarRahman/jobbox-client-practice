import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useGetAppliedJobsQuery } from "../../features/job/jobApi";

const AppliedJobs = () => {
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAppliedJobsQuery(email);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-2">
      <h1 className="text-xl my-2 py-3 border-b">Applied jobs</h1>
      <div className="flex items-center space-x-4 py-3">
        <h2>Filtered By :</h2>
        <button className="btn">Pending</button>
        <button className="btn">Not selected</button>
        <button className="btn">closed</button>
        <button className="btn">In-touch</button>
      </div>
      <div className="grid grid-cols-2 gap-5 pb-5">
        {data?.data?.map((job) => (
          <JobCard key={job._id} jobData={job} />
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;

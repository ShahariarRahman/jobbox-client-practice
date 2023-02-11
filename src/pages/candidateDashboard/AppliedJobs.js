import React from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { toggleJobFilter } from "../../features/filter/filterSlice";
import { useGetAppliedJobsQuery } from "../../features/job/jobApi";

const AppliedJobs = () => {
  const {
    auth: {
      user: { email },
    },
    filter: { jobsFilteredBy },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAppliedJobsQuery(email);

  if (isLoading) {
    return <Loading />;
  }
  const activeClass = "bg-primary hover:!bg-primary !text-white";

  return (
    <div className="mx-2">
      <h1 className="text-xl my-2 py-3 border-b">Applied jobs</h1>
      <div className="flex items-center space-x-4 py-3">
        <h2>Filtered By :</h2>
        <button
          onClick={() => dispatch(toggleJobFilter("react-developer"))}
          className={`px-4 py-2 border border-primary text-primary rounded-full hover:bg-primary/80 hover:text-white ${
            jobsFilteredBy.includes("react-developer") && activeClass
          }`}
        >
          React Developer
        </button>
        <button
          onClick={() => dispatch(toggleJobFilter("mern-developer"))}
          className={`px-4 py-2 border border-primary text-primary rounded-full hover:bg-primary/80 hover:text-white ${
            jobsFilteredBy.includes("mern-developer") && activeClass
          }`}
        >
          MERN Developer
        </button>
        <button
          onClick={() => dispatch(toggleJobFilter("closed"))}
          className={`px-4 py-2 border border-primary text-primary rounded-full hover:bg-primary/80 hover:text-white ${
            jobsFilteredBy.includes("closed") && activeClass
          }`}
        >
          Closed
        </button>
      </div>
      <div className="grid grid-cols-2 gap-5 pb-5">
        {data?.data
          ?.filter((job) => {
            if (jobsFilteredBy.includes("closed")) {
              return job.status;
            } else {
              return job;
            }
          })
          ?.filter((job) => {
            if (jobsFilteredBy.includes("react-developer")) {
              return job.position.toLowerCase().includes("react");
            } else {
              return job;
            }
          })
          ?.filter((job) => {
            if (jobsFilteredBy.includes("mern-developer")) {
              return job.position.toLowerCase().includes("mern");
            } else {
              return job;
            }
          })
          .map((job) => (
            <JobCard key={job._id} jobData={job} />
          ))}
      </div>
    </div>
  );
};

export default AppliedJobs;

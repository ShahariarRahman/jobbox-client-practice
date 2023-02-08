import React, { useEffect, useState } from "react";
import meeting from "../assets/meeting.jpg";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import {
  useApplyJobMutation,
  useAskQuestionMutation,
  useJobByIdQuery,
  useReplyMutation,
} from "../features/job/jobApi";
import Loading from "../components/reusable/Loading";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { IoIosPeople } from "react-icons/io";

const JobDetails = () => {
  const [reply, setReply] = useState("");
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { data, isLoading } = useJobByIdQuery(id, { pollingInterval: 10000 });
  const [applyJob, { isSuccess }] = useApplyJobMutation();
  const [sendQuestion] = useAskQuestionMutation();
  const [sendReply] = useReplyMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Job apply successful", { id: "applyJob" });
    }
  }, [isSuccess]);

  const {
    companyName,
    position,
    location,
    experience,
    workLevel,
    employmentType,
    salaryRange,
    skills,
    requirements,
    responsibilities,
    overview,
    queries,
    _id,
    applicants,
  } = data?.data || {};

  if (isLoading) {
    return <Loading />;
  }
  const handleApply = () => {
    if (user.role === "employer") {
      toast.error("You need an candidate account to apply.", {
        id: "applyJob",
      });
      return;
    }
    if (user.role === "") {
      navigate("/register");
      return;
    }
    const data = { userId: user._id, jobId: _id, email: user.email };
    applyJob(data);
  };

  const handleQuestion = ({ question }) => {
    const data = {
      jobId: _id,
      userId: user._id,
      email: user.email,
      question,
    };
    sendQuestion(data);
  };
  const handleReply = (id) => {
    const data = {
      reply,
      userId: id,
    };
    sendReply(data);
  };
  return (
    <div className="pt-14 grid grid-cols-12 gap-5">
      <div className="col-span-9 mb-10">
        <div className="h-80 rounded-xl overflow-hidden">
          <img className="h-full w-full object-cover" src={meeting} alt="" />
        </div>
        <div className="space-y-5">
          <div className="flex justify-between items-center mt-5">
            <h1 className="text-xl font-semibold text-primary">{position}</h1>
            {user.role !== "employer" &&
              (applicants?.find((applicant) => applicant.id === user._id) ? (
                <button disabled className="btn">
                  Applied
                </button>
              ) : (
                <button onClick={handleApply} className="btn">
                  Apply
                </button>
              ))}
            {user.role === "employer" &&
              (applicants?.find((applicant) => applicant.id === user._id) ? (
                <button disabled className="btn">
                  Application Closed
                </button>
              ) : (
                <>
                  <div className="relative">
                    <p className="absolute rounded-full -top-3 -right-1 bg-secondary border border-primary w-7 h-7 text-black grid place-content-center text-xs font-medium duration-200">
                      3
                    </p>
                    <button className="btn flex">
                      <IoIosPeople className="text-2xl" />
                      <span className="ml-1">See all applicants</span>
                    </button>
                  </div>
                  <button className="btn">Close Application</button>
                </>
              ))}
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Overview</h1>
            <p>{overview}</p>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Skills</h1>
            <ul>
              {skills?.map((skill, i) => (
                <li key={i} className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Requirements
            </h1>
            <ul>
              {requirements?.map((skill, i) => (
                <li key={i} className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Responsibilities
            </h1>
            <ul>
              {responsibilities?.map((skill, i) => (
                <li key={i} className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="my-5" />
        <div>
          <div>
            <h1 className="text-xl font-semibold text-primary mb-5">
              General Q&A
            </h1>
            <div className="text-primary my-2">
              {queries?.map(({ question, email, reply, id }, i) => (
                <div key={i}>
                  <small>{email}</small>
                  <p className="text-lg font-medium">{question}</p>
                  {reply?.map((item, i) => (
                    <p
                      key={i}
                      className="flex items-center gap-2 relative left-5"
                    >
                      <BsArrowReturnRight /> {item}
                    </p>
                  ))}
                  {user.role === "employer" && (
                    <div className="flex gap-3 my-5">
                      <input
                        onBlur={(e) => setReply(e.target.value)}
                        placeholder="Reply"
                        type="text"
                        className="w-full"
                      />
                      <button
                        onClick={() => handleReply(id)}
                        className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                        type="submit"
                      >
                        <BsArrowRightShort size={30} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {user.role === "candidate" && (
              <form onSubmit={handleSubmit(handleQuestion)}>
                <div className="flex gap-3 my-5">
                  <input
                    {...register("question")}
                    placeholder="Ask a question..."
                    type="text"
                    className="w-full"
                  />
                  <button
                    className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                    type="submit"
                  >
                    <BsArrowRightShort size={30} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="rounded-xl bg-primary/10 p-5 text-primary space-y-5">
          <div>
            <p>Experience</p>
            <h1 className="font-semibold text-lg">{experience}</h1>
          </div>
          <div>
            <p>Work Level</p>
            <h1 className="font-semibold text-lg">{workLevel}</h1>
          </div>
          <div>
            <p>Employment Type</p>
            <h1 className="font-semibold text-lg">{employmentType}</h1>
          </div>
          <div>
            <p>Salary Range</p>
            <h1 className="font-semibold text-lg">{salaryRange}</h1>
          </div>
          <div>
            <p>Location</p>
            <h1 className="font-semibold text-lg">{location}</h1>
          </div>
        </div>
        <div className="mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5">
          <div>
            <h1 className="font-semibold text-lg">{companyName}</h1>
          </div>
          <div>
            <p>Company Size</p>
            <h1 className="font-semibold text-lg">Above 100</h1>
          </div>
          <div>
            <p>Founded</p>
            <h1 className="font-semibold text-lg">2001</h1>
          </div>
          <div>
            <p>Email</p>
            <h1 className="font-semibold text-lg">company.email@name.com</h1>
          </div>
          <div>
            <p>Company Location</p>
            <h1 className="font-semibold text-lg">Los Angeles</h1>
          </div>
          <div>
            <p>Website</p>
            <a className="font-semibold text-lg" href="/">
              https://website.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

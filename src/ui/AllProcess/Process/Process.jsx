import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { DeleteProcessAC } from "../../../redux/reducer";
import Job from "./Job/Job";

const Process = (props) => {
  const [jobShow, setJobShow] = useState(false);
  const dispatch = useDispatch();

  const onDeleteProcess = () => {
    dispatch(DeleteProcessAC(props.id));
  };

  const processStatus = () => {
    let jobs = props.jobs;
    let allStatus = [];
    for (let i = 0; i < jobs.length; i++) {
      allStatus = [...allStatus, jobs[i].status];
    }

    const success = allStatus.every((el) => {
      return el === "successed";
    });
    const fail = allStatus.every((el) => {
      return el === "failed";
    });

    success
      ? alert("status successed")
      : fail
      ? alert("status failed")
      : alert("process in progress");
  };

  return (
    <ProcessWrapper>
      <ProcessBlock>
        <ProcessBtnDelete onClick={onDeleteProcess}>x</ProcessBtnDelete>
        <div>
          Process : <b>{props.name}</b>
        </div>
        <div>id: {props.id}</div>
        <div>startTime: {props.startTime}</div>
        <div>jobsCount: {props.jobsCount}</div>
        <ProcessBtn onClick={() => setJobShow((state) => !state)}>
          show jobs
        </ProcessBtn>
        <ProcessBtn onClick={processStatus}>status</ProcessBtn>
      </ProcessBlock>
      <JobWrapper>{jobShow && <Job job={props.jobs} />}</JobWrapper>
    </ProcessWrapper>
  );
};

export default Process;

const ProcessWrapper = styled.div`
  display: flex;
  margin: 14px;
`;
const JobWrapper = styled.div`
  display: flex;
  margin-left: 10px;
`;
const ProcessBlock = styled.div`
  padding: 18px 10px 10px 10px;
  border: 2px solid #eee;
  border-radius: 6px;
  min-width: max-content;
  position: relative;
`;
const ProcessBtn = styled.button`
  background-color: inherit;
  color: #fff;
  outline: none;
  min-width: 60px;
  border: 2px solid #31353a;
  border-radius: 6px;
  margin: 5px;
  :hover {
    background-color: #31353a;
  }
`;
const ProcessBtnDelete = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: inherit;
  color: #31353a;
  outline: none;
  border: 2px solid #31353a;
  border-radius: 6px;
  margin: 5px;
  cursor: pointer;
  :hover {
    background-color: #31353a;
    color: #fff;
  }
`;

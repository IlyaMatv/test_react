import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AddNewProcessTC } from "../../redux/reducer";
import Job from "./Process/Job/Job";
import Process from "./Process/Process";

const AllProcess = (props) => {
  const dispatch = useDispatch();
  const processes = useSelector((state) => state.allProcess);
  const [inpuFiltertValue, setInputFilterValue] = useState("");
  const [inpuSearchtValue, setInputSearchFilterValue] = useState("");
  const [foundJob, setFoundJob] = useState({});

  const onProcessAdd = () => {
    const id = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    dispatch(AddNewProcessTC(id));
  };

  const onFilterInputChange = (e) => {
    e.target.checked
      ? setInputFilterValue(e.target.value)
      : setInputFilterValue("");
  };

  const onSearchInputChange = (e) => {
    setInputSearchFilterValue(e.target.value);
  };
  const searchInputFn = () => {
    let searchValue = {};
    for (let i = 0; i < processes.length; i++) {
      for (let j = 0; j < processes[i].jobsCount; j++) {
        if (inpuSearchtValue === processes[i].jobs[j].name) {
          searchValue = processes[i].jobs[j];
        }
      }
      setInputSearchFilterValue("");
      setFoundJob(searchValue);
    }
  };

  if (inpuFiltertValue === "name") {
    processes.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  } else if (inpuFiltertValue === "startTime") {
    processes.sort((a, b) => {
      return a.startTime.replace(/\D+/g, "") - b.startTime.replace(/\D+/g, "");
    });
  } else {
    processes.sort((a, b) => {
      return a[inpuFiltertValue] - b[inpuFiltertValue];
    });
  }

  useEffect(() => {
    localStorage.setItem("prc", JSON.stringify(processes));
  }, [processes]);

  return (
    <ProcessWrap>
      <ProcessHeaderWrap>
        {/* add procces */}
        <AddProcessBtn onClick={onProcessAdd}>add process</AddProcessBtn>
        <SearchWrap>
          <div>
            id:
            <SearchInput
              type="radio"
              value="id"
              name="searchInp"
              onChange={onFilterInputChange}
            />
          </div>
          <div>
            name:
            <SearchInput
              type="radio"
              value="name"
              name="searchInp"
              onChange={onFilterInputChange}
            />
          </div>
          <div>
            startTime:
            <SearchInput
              type="radio"
              value="startTime"
              name="searchInp"
              onChange={onFilterInputChange}
            />
          </div>
          <div>
            jobsCount:
            <SearchInput
              type="radio"
              value="jobsCount"
              name="searchInp"
              onChange={onFilterInputChange}
            />
          </div>
        </SearchWrap>
        {/* job search */}
        <JobSearch>
          Job search:
          <input
            type="text"
            value={inpuSearchtValue}
            onChange={onSearchInputChange}
          />
          <button onClick={searchInputFn}>find</button>
          <div>{foundJob && <Job job={[foundJob]} />}</div>
        </JobSearch>
        {/* job search */}
      </ProcessHeaderWrap>
      <div>
        {processes.map((el) => (
          <Process
            key={el.id}
            id={el.id}
            name={el.name}
            startTime={el.startTime}
            jobsCount={el.jobsCount}
            jobs={el.jobs}
          />
        ))}
      </div>
    </ProcessWrap>
  );
};

export default AllProcess;

const ProcessWrap = styled.div`
  margin-top: 40px;
  min-height: 200px;
  max-width: max-content;
`;
const AddProcessBtn = styled.button`
  background-color: inherit;
  color: #fff;
  outline: none;
  min-width: 60px;
  min-height: 30px;
  border: 2px solid #31353a;
  border-radius: 6px;
  :hover {
    background-color: #31353a;
  }
`;
const ProcessHeaderWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const SearchWrap = styled.div`
  margin-left: 20px;
  min-width: 100px;
  border: 2px solid #31353a;
  border-radius: 6px;
  padding: 10px;
  color: #fff;
  position: relative;
`;
const SearchInput = styled.input`
  position: absolute;
  right: 0;
`;

const JobSearch = styled.div`
  margin-left: 20px;
  font-size: 20px;
  color: #fff;
`;

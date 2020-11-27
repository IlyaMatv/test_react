import React from "react";
import styled from "styled-components";

const Job = (props) => {
  const JobWrapper = styled.div`
    margin: 14px;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 10px;
    max-width: max-content;
  `;

  return (
    <>
      {props.job.map((el) => (
        <JobWrapper key={`${el.id}`}>
          <div>
            Name: <b>{el.name}</b>
          </div>
          <div>id: {el.id}</div>
          {/* <div>processId: {el.processId}</div> */}
          <div>
            status:{" "}
            <span
              style={{
                color: `${
                  el.status === "running"
                    ? "orange"
                    : el.status === "successed"
                    ? "green"
                    : "red"
                }`,
              }}
            >
              {el.status}
            </span>
          </div>
        </JobWrapper>
      ))}
    </>
  );
};

export default Job;

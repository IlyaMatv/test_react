import randomWords  from "random-words";


const initialState = {
  allProcess: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PROCESS":
      return {
        ...state,
        allProcess: [...state.allProcess, action.newProcess],
      };
    case "ADD_JOB":
      return {
        ...state,
        allProcess: state.allProcess.map((el) => {
          if (el.id === action.job.processId) {
            return { ...el, jobs: [...el.jobs, action.job] };
          } else {
            return { ...el, jobs: [...el.jobs] };
          }
        }),
      };
    case "DELETE_PROCESS":
      return {
        ...state,
        allProcess: [...state.allProcess.filter((el) => el.id !== action.id)],
      };
    default:
      return state;
  }
};

//action creators

export const SetNewProcessAC = (newProcess) => ({
  type: "ADD_PROCESS",
  newProcess,
});

export const SetJobsAC = (job) => ({
  type: "ADD_JOB",
  job,
});

export const DeleteProcessAC = (id) => ({
  type: "DELETE_PROCESS",
  id,
});

//thunk creators

export const AddNewProcessTC = (processId) => (dispatch) => {
  let randomJobsNum = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  const fullTime = (time) => ( time.toString().length < 2 ? `0${time}` : time )
  let date = new Date()
  const newProcess = {
    id: processId,
    name: randomWords(),
    startTime: `${fullTime(date.getHours())}:${fullTime(date.getMinutes())}:${fullTime(date.getSeconds())}`,
    jobsCount: randomJobsNum,
    jobs: [],
  };
  dispatch(SetNewProcessAC(newProcess));
  for (let i = 0; i < randomJobsNum; i++) {
    const newJob = {
      id: `${Math.floor(Math.random() * (1000 - 1 + 1)) + 1}`,
      processId: processId,
      name: randomWords(),
      status: ['running', 'successed', 'failed'][Math.floor(Math.random() * (2 + 1))],
    };
    dispatch(SetJobsAC(newJob));
  }
};

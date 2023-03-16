import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLevel } from "../../api/levelAPI";

function useLevelById(id) {
  const [students, setStudents] = useState([]);
  const [rollNumber, setRollNumber] = useState(0);

  const levels = useQuery(["level", id], () => getLevel(id), {
    enabled: !!id,
    onSuccess: (level) => {
      // console.log(level);
      setStudents(level?.students);
      setRollNumber(level?.students?.length);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    levelLoading: levels.isFetching,
    students,
    rollNumber,
    refetch: levels.refetch,
  };
}

export default useLevelById;

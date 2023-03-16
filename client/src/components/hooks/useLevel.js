import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllLevels } from "../../api/levelAPI";

function useLevel() {
  const session = JSON.parse(localStorage.getItem("@school_session"));

  const [levelsOption, setLevelOptions] = useState([]);

  const levels = useQuery(
    ["levels"],
    () => getAllLevels(session.sessionId, session.termId),
    {
      enabled: !!session.sessionId,
      onSuccess: (levels) => {
        if (levels?.length !== 0) {
          const modifiedLevels = levels.map(({ _id, level, students }) => {
            return {
              _id,
              type: `${level?.name}${level?.type}`,
              noOfStudents: students?.length,
            };
          });

          setLevelOptions(modifiedLevels);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return {
    levelLoading: levels.isLoading,
    levelRefetch: levels.refetch,
    levelsOption,
  };
}

export default useLevel;

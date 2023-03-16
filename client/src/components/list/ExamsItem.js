const ExamsItem = ({ item }) => {
  return (
    <>
      <tr>
        <td
          width="25%"
          style={{
            textAlign: "left",
            paddingLeft: "2px",
            fontSize: "13px",
            fontWeight: "bolder",
          }}
        >
          {item.subject}
        </td>
        <td width="18%" style={{ fontSize: "13px" }}>
          {item.classScore}
        </td>
        <td width="18%" style={{ fontSize: "13px" }}>
          {item.examsScore}
        </td>
        <td
          width="15%"
          style={{ color: "red", fontSize: "13px", fontWeight: "bold" }}
        >
          {item.totalScore}
        </td>
        {/* <td width="10%" style={{ color: "green",fontSize:'13px', fontWeight: "bold" }}>
          {item.grade}
        </td> */}
        <td width="10%" style={{ fontSize: "13px" }}>{item.grade}</td>
        <td
          width="14%"
          style={{ color: "green", fontSize: "13px", fontWeight: "bold" }}
        >
          {item.remarks}
        </td>
      </tr>
    </>
  );
};

export default ExamsItem;

const ReportItem = ({ title, text }) => {
  return (
    <tr>
      <td
        style={{
          fontWeight: "bold",
          fontSize: "13px",
          paddingRight: "5px",
          textTransform: "capitalize",
        }}
      >
        {title}:
      </td>
      <td style={{ fontSize: "13px", textTransform: "capitalize" }}> {text}</td>
    </tr>
  );
};

export default ReportItem;

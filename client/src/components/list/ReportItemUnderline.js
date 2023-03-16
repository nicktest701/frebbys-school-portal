const ReportItemUnderline = ({ title, text }) => {
  return (
    <tr>
      <td style={{ fontWeight: "bold", fontSize: "13px", paddingRight: "5px" }}>
        {title}:
      </td>
      <td
        style={{
          borderBottom: "1px #000 dotted",
          fontSize: "13px",
        }}
      >
        {text}
      </td>
    </tr>
  );
};

export default ReportItemUnderline;

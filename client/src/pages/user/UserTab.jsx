import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { getAllUsers } from "../../api/userAPI";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import { USERS_COLUMNS } from "../../mockup/columns/sessionColumns";
import UserAdd from "./UserAdd";
import UserEdit from "./UserEdit";
import UserView from "./UserView";

function UserTab() {
  const {
    // schoolSessionState: { userViewData },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const [openAddUser, setOpenAddUser] = useState(false);

  const handleOpenViewUser = (rowData) => {
    schoolSessionDispatch({
      type: "viewUser",
      payload: { open: true, data: rowData },
    });
  };

  const users = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  return (
    <>
      <CustomizedMaterialTable
        isLoading={users.isFetching}
        title="Users Information"
        search={true}
        columns={USERS_COLUMNS}
        data={users.data !== undefined ? users.data : []}
        actions={[]}
        showAddButton
        addButtonText="New User"
        onAddButtonClicked={() => setOpenAddUser(true)}
        onRowClick={handleOpenViewUser}
      />
      <UserView />
      <UserAdd open={openAddUser} setOpen={setOpenAddUser} />
      <UserEdit />
    </>
  );
}

export default UserTab;

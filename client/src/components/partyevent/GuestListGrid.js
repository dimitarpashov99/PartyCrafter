import { DataGrid } from "@mui/x-data-grid";
import { TextField, Typography } from "@mui/material";
export default function GuestList(props) {
    const eventData = props.eventData;
    const guests = props.guestList;
    const tableAssign = eventData.preferences.assignGuestTables;
    const tableCount = eventData.tableCount;
    const gridView = props.page === "CreateEvent";
    const handleTableChange = props.handleTableChange;
    const tableChange = (ev, params) => {
        var newGuestList = guests.map((guest) => {
            if (guest.id === params.row.id) {
                return {
                    ...guest,
                    table: ev.target.value,
                };
            }
            return guest;
        });
        handleTableChange(newGuestList);
    };
    return (
        guests && (
            <DataGrid
                pageSize={20}
                rowsPerPageOptions={[20]}
                rows={guests}
                columns={[
                    {
                        field: "name",
                        headerName: "Guest Name",
                        flex: 1,
                        disableColumnMenu: true,
                    },
                    {
                        field: "email",
                        headerName: "Guest Email",
                        flex: 1,
                        disableColumnMenu: true,
                        sortable: false,
                    },
                    {
                        field: "phone",
                        headerName: "Guest Phone",
                        flex: 1,
                        disableColumnMenu: true,
                        sortable: false,
                    },
                    {
                        field: "table",
                        headerName: "Table",
                        flex: 1,
                        hide: !tableAssign,
                        renderCell: (params) => {
                            if (gridView) {
                                return (
                                    <TextField
                                        type="number"
                                        variant="filled"
                                        value={params.row.table}
                                        inputProps={{
                                            min: "1",
                                            max: tableCount,
                                            style: {
                                                paddingTop: 6,
                                            },
                                        }}
                                        onChange={(ev) => {tableChange(ev, params)}}
                                    />
                                );
                            } else {
                                return (
                                    <Typography variant="body1">
                                        {params.row.table}
                                    </Typography>
                                );
                            }
                        },
                        disableColumnMenu: true,
                        disableExport: true,
                        disableReorder: true,
                        sortable: false,
                        sizable: false,
                    },
                ]}
            />
        )
    );
}

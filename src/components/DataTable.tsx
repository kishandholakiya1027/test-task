import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface IDataTable {
  rows: AppInfo[],
  columns: GridColDef[]
}

function generateRandom() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

export default function DataTable({ rows, columns }: IDataTable) {
  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid
        getRowId={(row) => generateRandom()}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        checkboxSelection
      />
    </div>
  );
}

export const userColumns = [
    { field: "_id", headerName: "ID", width: 160 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.imagePath} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "country",
      headerName: "Country",
      width: 100,
    },
    {
      field:"address",
      headerName:"Address",
      width:100
    }
  ];
  
  export const productColumns = [
    { field: "_id", headerName: "ID", width: 160 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.imagePath} alt="avatar" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 230,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "sizes",
      headerName: "Sizes",
      width: 100,
    },
  ];
  
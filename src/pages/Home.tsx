import { ReactElement, FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useData } from "../hooks/useData";
import DataTable from "../components/DataTable";
import Select from "react-select";


const Home: FC<any> = (): ReactElement => {

  const {
    columns,
    raw,
    applications,
    resources,
    getRaw,
    getApplications,
    getResources,
  } = useData();

  const [rawData, setrawData] = useState<any[]>([]);
  const [selected, setselected] = useState({
    app: [] as String[],
    resource: [] as String[],
    filtered: [] as any[],
    selectApp: undefined as any,
    selectResource: undefined as any
  })
  // const [selectedApp, setselectedApp] = useState({
  //   data: [] as String[],
  //   filtered: [] as any[],
  //   select2: undefined as any
  // })

  // const [selectedResources, setselectedResources] = useState({
  //   data: [] as String[],
  //   filtered: [] as any[],
  //   select2: undefined as any
  // })

  useEffect(() => {
    getApplications();
    getResources();
    getRaw();
  }, [])

  useEffect(() => {
    if (applications.length) {
      // setselectedApp((pre) => ({ ...pre, data: applications }))
      setselected((pre) => ({ ...pre, app: applications }))
    }
  }, [applications])

  useEffect(() => {
    if (resources.length) {
      // setselectedResources((pre) => ({ ...pre, data: resources }))
      setselected((pre) => ({ ...pre, resource: resources }))
    }
  }, [resources])

  useEffect(() => {
    if (raw.length) {
      // if (selectedApp.filtered.length === 0 && selectedResources.filtered.length === 0) {
      //   setrawData(raw)
      // } else {
      //   const arr = raw.filter((r) => selectedApp.filtered[0]?.value?.map((v: any) => v.value).includes(r.Tags["app-name"])
      //     || selectedResources.filtered[0]?.value?.map((v: any) => v.value).includes(r.ServiceName))

      //   setrawData(arr)
      // }
      if (selected.filtered.length === 0) {
        setrawData(raw)
      } else {
        console.log('selected.filtered', selected.filtered);

        const arr = raw.filter((r) => selected.filtered.filter((f) => f.id === 'appName')[0]?.value?.map((v: any) => v.value).includes(r.Tags["app-name"])
          || selected.filtered.filter((f) => f.id === 'resource')[0]?.value?.map((v: any) => v.value).includes(r.ServiceName))

        setrawData(arr)
      }
    }
  }, [raw, JSON.stringify(selected.filtered)])

  const onFilteredChangeCustom = (value: any, accessor: any) => {
    let filtered = selected.filtered;

    // let filtered = accessor === 'appName' ? selectedApp.filtered : selectedResources.filtered;
    let insertNewFilter = 1;

    if (filtered.length) {
      filtered.forEach((filter, i) => {
        if (filter["id"] === accessor) {
          if (value === "" || !value.length) filtered.splice(i, 1);
          else filter["value"] = value;

          insertNewFilter = 0;
        }
      });
    }

    if (insertNewFilter) {
      filtered.push({ id: accessor, value: value });
    }
    setselected((pre) => ({ ...pre, filtered: filtered }))

    // accessor === 'appName' ? setselectedApp((pre) => ({ ...pre, filtered: filtered })) : setselectedResources((pre) => ({ ...pre, filtered: filtered }));
  };


  return (
    <Box sx={{
      flexGrow: 1,
      backgroundColor: 'whitesmoke',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Box sx={{ marginX: 1 }}>
        <Box display='flex' sx={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            Applications :{" "}
            <div style={{ width: "98%", marginBottom: "20px" }}>
              <Select
                onChange={entry => {
                  setselected((pre) => ({ ...pre, selectApp: entry }));
                  onFilteredChangeCustom(
                    entry?.map((o: any) => {
                      return o;
                    }),
                    "appName"
                  );
                }}
                value={selected.selectApp}
                isMulti
                options={selected.app.map((o, i) => {
                  return { id: i, value: o, label: o };
                })}
              />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            Resources :{" "}
            <div style={{ width: "100%", marginBottom: "20px" }}>
              <Select
                onChange={entry => {
                  setselected((pre) => ({ ...pre, selectResource: entry }));
                  onFilteredChangeCustom(
                    entry?.map((o: any) => {
                      return o;
                    }),
                    "resource"
                  );
                }}
                value={selected.selectResource}
                isMulti
                options={selected.resource.map((o, i) => {
                  return { id: i, value: o, label: o };
                })}
              />
            </div>
          </div>
        </Box>
        <DataTable rows={rawData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Home;